import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProps } from '../interfaces/children-interface';
import { ILoginPayload } from '../interfaces/login-payload';
import { IRegisterPayload } from '../interfaces/register-payload';
import { toastError } from '../settings/toast-setting';

interface IUserContext {
  login: (payload: ILoginPayload) => void;
  user: any;
  register: (payload: IRegisterPayload) => void;
}

const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildrenProps) {
  const [user, setUser] = useState<User>();
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
      const cred = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      // cred.user.updateProfile()
      console.log('cred from login : ', cred);
    } catch (err: any) {}
    navigate('/home');
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

  const data = { login, user, register };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
