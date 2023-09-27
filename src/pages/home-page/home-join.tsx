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
    <div className="p-20 sm:mb-0 mb-10 background-gray-500 h-[300px] flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-12">
      <div className="">
        <div className="text-primary font-semibold text-sm sm:text-base">
          THE SOONER THE BETTER
        </div>
        <div className="font-medium text-gray-800 text-[15px] sm:text-[30px]">
          Make your first Diagnosis AI today.
        </div>
      </div>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-2 justify-center sm:w-[400px]"
      >
        <Input label="Email" name="email" icon={<FaMailBulk />}></Input>
        <button className="px-1 text-sm sm:text-base sm:px-10 py-3 bg-primary text-white rounded-md font-semibold">
          Create Account
        </button>
      </form>
    </div>
  );
}
