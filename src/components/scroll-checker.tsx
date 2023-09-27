import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function ScrollChecker() {
  const [show, setShow] = useState<boolean>(false);
  const [isScroll, setScroll] = useState<boolean>(false);

  const handleScroll = (e: Event) => {
    setScroll(true);
    setShow(false);
  };

  const triggerCheck = () => {
    setTimeout(() => {
      if (!isScroll) setShow(true);
    }, 2000);
  };

  useEffect(() => {
    triggerCheck();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getOpacity = () => (show ? 'opacity-60' : 'opacity-0');

  return (
    <div className={`z-0 fixed bottom-[-40px] w-full ${getOpacity()}`}>
      <div className="flex w-full   justify-around">
        {!isMobile && (
          <Player
            className="sm:block hidden w-40 h-40"
            src="/assets/down.json"
            autoplay
            loop
          ></Player>
        )}
        <Player
          className="w-40 bg-blue-500 h-40"
          src="/assets/down.json"
          autoplay
          loop
        ></Player>
      </div>
    </div>
  );
}
