import { BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import DeseaseMenu from './desease-menu';

export default function Navbar() {
  return (
    <div className="absolute z-10 left-[50%] translate-x-[-50%] h-fit top-10 max-w-screen-xl w-[60%]">
      <div className="absolute  w-[100%] h-10  left-0 z-0 rounded-xl  bg-primary top-[-13px]"></div>
      <div className="py-3 px-16 absolute  w-full h-fit left-0 z-0 rounded-xl bg-white custom-shadow flex justify-between items-center ">
        <div className="mx-2 font-bold">Diagno AI</div>
        <DeseaseMenu />
        <Link
          to="/login"
          className="gap-2 py-1 px-5 border border-gray-400 cursor-pointer transition-all rounded-full text-semibold flex"
        >
          <p>Login</p>
          <div className="center">
            <BsPeople />
          </div>
        </Link>
      </div>
    </div>
  );
}
