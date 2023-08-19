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
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProps } from '../interfaces/children-interface';
import { ILoginPayload } from '../interfaces/login-payload';
import { IRegisterPayload } from '../interfaces/register-payload';
import {
  toastError,
  toastFirebaseError,
  toastSuccess,
} from '../settings/toast-setting';

interface IUserContext {
  login: (payload: ILoginPayload) => void;
  user: User | null;
  register: (payload: IRegisterPayload) => void;
  logout: () => Promise<void>;
  loginGoogle: () => Promise<void>;
}

const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildrenProps) {
  const secret = import.meta.env.VITE_SECRET;
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    listen();
  }, []);
  const listen = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
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

  async function register(payload: IRegisterPayload) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      if (credential) {
        const user = credential.user;
        await updateProfile(user, { displayName: payload.name });
      }
    } catch (err: any) {
      const { code, message } = err;
      toastError(code + ' ' + message);
    }
  }

  const data = { login, user, register, logout, loginGoogle };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
