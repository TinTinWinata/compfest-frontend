import { FirebaseError } from 'firebase/app';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
}

const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildrenProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    listen();
  }, []);
  const listen = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // navigate('/home');
        setUser(user);
      } else {
        // navigate('/login');
      }
    });
  };

  async function login(payload: ILoginPayload) {
    try {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      toastSuccess('Succesfully logged in!');
      navigate('/home');
    } catch (err: any) {
      if (err instanceof FirebaseError) {
        toastFirebaseError(err);
      }
    }
  }

  async function logout() {
    try {
      await signOut(auth);
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

  const data = { login, user, register, logout };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
