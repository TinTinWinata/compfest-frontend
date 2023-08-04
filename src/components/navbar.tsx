import { BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] h-fit top-10 w-[60%]    ">
      <div className="absolute  w-[100%] h-10  left-0 z-0 rounded-xl  bg-primary top-[-13px]"></div>
      <div className="py-3 px-16 absolute  w-full h-fit left-0 z-0 rounded-xl bg-white custom-shadow flex justify-between items-center ">
        <div className="mx-2 font-bold">Diagno AI</div>
        <Link className="mx-2 font-semibold" to="/detail">
          Desease
        </Link>
        <div className="gap-2 py-1 px-3 border border-gray-600 cursor-pointer transition-all rounded-full text-semibold flex">
          <p>Login</p>
          <div className="center">
            <BsPeople />
          </div>
        </div>
      </div>
    </div>
  );
}
