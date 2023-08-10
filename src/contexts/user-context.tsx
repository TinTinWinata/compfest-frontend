import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProps } from '../interfaces/children-interface';
import { ILoginPayload } from '../interfaces/login-payload';

interface IUserContext {
  login: (payload: ILoginPayload) => void;
  user: any;
}

const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildrenProps) {
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();

  function login(payload: ILoginPayload) {
    setUser(true);
    navigate('/home');
  }

  // You can pass all user data in here V (Global Data)
  const data = { login, user };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
