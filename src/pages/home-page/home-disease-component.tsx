import { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface IDisease {
  name: string;
  asset?: string;
  selected: number;
  index: number;
}

export default function DiseaseComponent({
  name,
  asset,
  selected,
  index,
}: IDisease) {
  const [hover, setHover] = useState<boolean>(false);
  const isFocusButNotThis = () => selected >= 0 && selected !== index;
  return (
    <Link
      to={'/' + name.toLowerCase()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full cursor-pointer"
    >
      <div
        className={`absolute  top-0 left-0 w-full h-full transition-all duration-500 rounded-lg ${
          isFocusButNotThis() ? 'bg-gray-900' : 'bg-gray-500'
        } opacity-30`}
      ></div>
      <div className="abs-center w-full h-full overflow-hidden">
        <div
          className={`absolute left-[50%] transition-all duration-300 translate-x-[-50%] ${
            !hover ? 'top-[130%]' : 'top-[50%]'
          } translate-y-[-50%] z-30`}
        >
          <div className="center gap-2">
            <FaCirclePlay className="w-10 h-10 text-white " />
            <div className="text-white text-3xl font-bold">Start</div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url("${asset}")` }}
        className="border bg-cover border-primary rounded-lg border-opacity-30 w-full h-full  "
      ></div>
      <div className="text-center text-gray-50 font-bold text-xl mt-2 pb-2">
        {name}
      </div>
    </Link>
  );
}
