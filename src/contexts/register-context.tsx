import { createContext, useContext, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';
import Input from '../components/input';
import Modal from '../components/modal';

interface IRegisterContext {
  openRegister: () => void;
}

const registerContext = createContext({} as IRegisterContext);

type ContentLayout = {
  children: JSX.Element;
};

export function RegisterProvider({ children }: ContentLayout) {
  const [open, setOpen] = useState<boolean>(false);

  const openRegister = () => {
    setOpen(true);
  };

  const data = { openRegister };

  return (
    <registerContext.Provider value={data}>
      <Modal
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
