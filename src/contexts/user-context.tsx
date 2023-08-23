import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProps } from '../interfaces/children-interface';
import { ILoginPayload } from '../interfaces/login-payload';
import { IRegisterPayload } from '../interfaces/register-payload';
import { IUserFirestore } from '../interfaces/user-firestore-interface';
import { db } from '../settings/firebase-setting';
import {
  toastError,
  toastFirebaseError,
  toastSuccess,
} from '../settings/toast-setting';

interface IUserContext {
  login: (payload: ILoginPayload) => void;
  user: User | null;
  register: (payload: IRegisterPayload) => Promise<boolean>;
  logout: () => Promise<void>;
  loginGoogle: () => Promise<void>;
}

const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildrenProps) {
  const secret = import.meta.env.VITE_SECRET;
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const [firestore, setFirestore] = useState<IUserFirestore | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    listen();
  }, []);
  const listen = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        loadFirestore(user.uid);
      }
    });
  };

  async function login(payload: ILoginPayload) {
    try {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      toastSuccess('Succesfully logged in!');
      navigate('/home');
    } catch (err: any) {
      toastError('Wrong credentials!');
    }
  }

  async function loginGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate('/login');
        toastSuccess(`Welcome ${user.displayName}! to DiagnoAI`);
      })
      .catch((error) => {
        toastError('Failed to login with google');
      });
  }

  async function logout() {
    try {
      setUser(null);
      await signOut(auth);
      navigate('/login');
      toastSuccess('Successfully logged out');
    } catch (err) {
      if (err instanceof FirebaseError) {
        toastFirebaseError(err);
      }
    }
  }

  function loadFirestore(id: string) {
    try {
      onSnapshot(doc(db, 'users', id), (doc) => {
        const data = doc.data() as IUserFirestore;
        console.log('data : ', data);
        setFirestore(data);
      });
    } catch (err) {}
  }

  async function register(payload: IRegisterPayload): Promise<boolean> {
    try {
      console.log('test');
      const credential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      if (credential) {
        const user = credential.user;
        setDoc(doc(db, 'users', user.uid), {
          tests: [],
        });
        await updateProfile(user, { displayName: payload.name });
        return true;
      }
      return false;
    } catch (err: any) {
      const { code, message } = err;
      toastError(code + ' ' + message);
      return false;
    }
  }

  const data = { login, user, register, logout, loginGoogle };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
