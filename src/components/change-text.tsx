import { createRef, useEffect } from 'react';
import Typed from 'typed.js';
import '../css/change-text.css';

interface IChangeTextProps {
  texts: string[];
}

export default function ChangeText({ texts }: IChangeTextProps) {
  const el = createRef<HTMLDivElement>();

  useEffect(() => {
    const type = initiateType();
    return () => {
      type.destroy();
    };
  }, []);

  const initiateType = () => {
    return new Typed(el.current, {
      strings: texts,
      typeSpeed: 90,
      loop: true,
      backDelay: 3000,
    });
  };

  return (
    <div className=" font-bold flex my-8 text-[40px] sm:text-[50px]">
      <div ref={el} className="">
        Healthy
      </div>
    </div>
  );
}
