import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
interface IInputProps {
  label: string;
  name: string;
  disabled?: boolean;
  type?: string;
  icon?: JSX.Element;
  defaultValue?: string;
}

export default function Input({
  defaultValue,
  label,
  name,
  disabled = false,
  type,
  icon,
}: IInputProps) {
  const [filterType, setFilterType] = useState(type);

  const tooglePassword = () => {
    if (filterType === 'password') {
      setFilterType('text');
    } else {
      setFilterType('password');
    }

    console.log(filterType);
  };

  return (
    <div className="w-full h-10 relative px-3 py-6 border border-border border-opacity-20 rounded-md">
      <div className="absolute left-4 text-gray-400 top-[50%] translate-y-[-50%]">
        {icon && icon}
      </div>
      {type === 'password' && (
        <div className="absolute right-2 text-black top-[50%] translate-y-[-50%] z-20">
          {filterType === 'password' ? (
            <AiFillEye
              onClick={tooglePassword}
              size={20}
              className="text-primary cursor-pointer"
            />
          ) : (
            <AiFillEyeInvisible
              onClick={tooglePassword}
              size={20}
              className="text-primary cursor-pointer"
            />
          )}
        </div>
      )}
      <input
        type={filterType}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`placeholder-gray-400 text-gray-500 absolute top-[50%] left-[13%] translate-y-[-50%] text-md w-[85%] focus:none focus:outline-none  rounded`}
        name={name}
        placeholder={label}
      ></input>
    </div>
  );
}
