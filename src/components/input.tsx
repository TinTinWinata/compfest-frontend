import { createRef, useState } from 'react';
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
  const [labelUp, setLabelUp] = useState<boolean>(false);
  const inputRef = createRef<HTMLInputElement>();
  const tooglePassword = () => {
    if (filterType === 'password') {
      setFilterType('text');
    } else {
      setFilterType('password');
    }
  };

  const handleFocus = () => {
    setLabelUp(true);
  };
  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      setLabelUp(true);
    } else {
      setLabelUp(false);
    }
  };

  return (
    <div className="w-full h-10 relative px-3 py-6 border border-border border-opacity-20 rounded-md">
      <div className="absolute left-4 text-gray-400 top-[50%] translate-y-[-50%]">
        {icon && icon}
      </div>
      {type === 'password' && (
        <div className="absolute z-0 right-2 text-black top-[50%] translate-y-[-50%]">
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
      <div
        className={
          'absolute  transition-all text-sm translate-y-[-50%] text-gray-400 ' +
          (labelUp
            ? ' left-[11%] top-0 bg-white px-1 text-xs '
            : ' left-[11%] top-[50%] ')
        }
      >
        {label}
      </div>
      <input
      autoComplete=''
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        type={filterType}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`placeholder-gray-400 bg-transparent text-gray-500 z-1 absolute top-[50%] left-[13%] translate-y-[-50%] text-md w-[80%] focus:none focus:outline-none  rounded`}
        name={name}
      ></input>
    </div>
  );
}
