import { GoogleAuthProvider } from 'firebase/auth';
import { ChangeEvent, useEffect } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../components/google-button';
import Input from '../components/input';
import { useRegister } from '../contexts/register-context';
import { useUserAuth } from '../contexts/user-context';
import { ILoginPayload } from '../interfaces/login-payload';

export default function LoginPage() {
  const { openRegister } = useRegister();
  const { login, loginGoogle } = useUserAuth();
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.target;
    const payload: ILoginPayload = {
      email: email.value,
      password: password.value,
    };
    login(payload);
  };
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);
  const handleLoginWithGoogle = () => {
    loginGoogle();
  };
  const handleRegister = () => {
    openRegister();
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <form onSubmit={handleOnSubmit} className="center w-[900px] ">
        <div className="px-16 w-full flex gap-2 flex-col justify-center items-center">
          <img className="w-32 h-32" src="/assets/doctor.png" />
          <div className="mt-3 mb-12 text-[35px] text-gray-600 font-semibold uppercase">
            Diagno AI
          </div>
          <GoogleButton handler={loginGoogle} />
          <Input
            name="email"
            icon={<GoPeople className="w-5 h-5" />}
            label="Email Address"
          />
          <Input
            type="password"
            name="password"
            icon={<AiOutlineLock className="w-5 h-5" />}
            label="Password"
          />
          <div className="my-16 flex justify-between w-full">
            <button className="focus:outline-none px-20 py-3 transition-all rounded-full hover:bg-primaryHover bg-primary text-white text-xl font-semibold">
              Login
            </button>
            <div
              onClick={handleRegister}
              className="text-gray-400 center font-normal cursor-pointer hover:underline"
            >
              Register Account ?
            </div>
          </div>
        </div>
      </form>
      <div className="lg:block hidden bg-blue-100 w-full"></div>
    </div>
  );
}
