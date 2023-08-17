import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CiLogout } from 'react-icons/ci';
import Navbar from '../components/navbar/navbar';
import { useUserAuth } from '../contexts/user-context';

export default function ProfilePage() {
  const { user, logout } = useUserAuth();
  const handleLogout = () => logout();
  return (
    <>
      <Navbar />
      <div className="center">
        <div className="w-[60%] mt-32 max-w-screen-xl">
          <div className="w-full h-full border rounded-xl border-gray-400 border-opacity-30 p-3 flex  ">
            <div className="flex  p-8">
              <img
                className="w-24 rounded-full"
                src="/assets/profile.png"
                alt=""
              />
              <div className="w-full grow ml-3 mr-20 flex flex-col">
                <h1 className="font-semibold text-[30px] text-gray-500">
                  Justine Winata
                </h1>
                <p className="text-gray-500 text-opacity-60">
                  tintin6892@gmail.com
                </p>
              </div>
            </div>
            <div className="border-l border-r my-5 border-gray-300 px-20 flex flex-col justify-center items-center">
              <div className="text-gray-400 font-semibold  text-lg">
                Test Taked
              </div>
              <div className="font-semibold text-gray-600 text-opacity-80 text-[45px]">
                939
              </div>
            </div>
            <div className="center ml-20">
              <CircularProgressbar
                className="w-28 h-28"
                value={10}
                text={`${10}%`}
              />
            </div>
          </div>
          <div
            onClick={handleLogout}
            className="flex gap-2 cursor-pointer p-3 justify-end text-gray-500 hover:text-primary transition-all"
          >
            <p className="">Logout</p>
            <div className="center">
              <CiLogout className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
