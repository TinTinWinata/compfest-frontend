import { ChangeEvent } from 'react';
import { FaMailBulk } from 'react-icons/fa';
import Input from '../../components/input';
import { useRegister } from '../../contexts/register-context';

export default function HomeJoin() {
  const { openRegister } = useRegister();
  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = e.target;
    if (email) openRegister(email.value);
  };
  return (
    <div className="p-20 background-gray-500 h-[300px] center gap-12">
      <div className="">
        <div className="text-primary font-semibold">THE SOONER THE BETTER</div>
        <div className="font-medium text-gray-800 text-[30px]">
          Make your first Diagnosis AI today.
        </div>
      </div>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-2 justify-center w-[400px]"
      >
        <Input label="Email" name="email" icon={<FaMailBulk />}></Input>
        <button className="px-10 py-3 bg-primary text-white rounded-md font-semibold">
          Create Account
        </button>
      </form>
    </div>
  );
}
