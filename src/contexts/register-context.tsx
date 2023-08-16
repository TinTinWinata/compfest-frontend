import { ChangeEvent, createContext, useContext, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';
import Input from '../components/input';
import Modal from '../components/modal';
import { IRegisterPayload } from '../interfaces/register-payload';
import { toastError } from '../settings/toast-setting';
import { useUserAuth } from './user-context';

interface IRegisterContext {
  openRegister: () => void;
}

const registerContext = createContext({} as IRegisterContext);

type ContentLayout = {
  children: JSX.Element;
};

export function RegisterProvider({ children }: ContentLayout) {
  const [open, setOpen] = useState<boolean>(false);
  const { register } = useUserAuth();

  const openRegister = () => {
    setOpen(true);
  };

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    console.log('test');
    e.preventDefault();
    const { email, name, password, confirm } = e.target;
    if (password.value !== confirm.value) {
      toastError('Password and confirm password is not the same value.');
    }
    const payload: IRegisterPayload = {
      email: email.value,
      password: password.value,
    };
    register(payload);
  };

  const data = { openRegister };

  return (
    <registerContext.Provider value={data}>
      <Modal
        onSubmit={handleOnSubmit}
        title="Welcome to DiagnoAI"
        caption="Future of Personalized Health"
        open={open}
        button="Register"
        setOpen={setOpen}
      >
        <div className="flex flex-col gap-3">
          <Input icon={<GoPeople />} label="Email Address" name="email" />
          <Input icon={<GoPeople />} label="Name" name="name" />
          <Input
            type="password"
            icon={<AiOutlineLock />}
            label="Password"
            name="password"
          />
          <Input
            icon={<AiOutlineLock />}
            label="Confirm Password"
            name="confirm"
            type="password"
          />
        </div>
      </Modal>
      {children}
    </registerContext.Provider>
  );
}

export function useRegister() {
  return useContext(registerContext);
}
