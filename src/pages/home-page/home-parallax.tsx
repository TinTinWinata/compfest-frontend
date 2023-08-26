import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { RefObject, createRef, useEffect, useState } from 'react';
import ScrollMagic from 'scrollmagic';
import animationData from '../../../public/assets/parallax.json';

interface IHomeParallaxProps {
  firstRef: RefObject<HTMLDivElement>;
}

export default function HomeParallax({ firstRef }: IHomeParallaxProps) {
  const INTRO_DURATION = 3000;
  const WHITE_SCREEN_GAP = 1000;
  const TEXT_SHOW_IN_PROGRESS = 65;
  const introRef = createRef<HTMLDivElement>();
  const lottieRef = createRef<LottieRefCurrentProps>();
  const [textClass, setTextClass] = useState<string>('opacity-0');

  const getTotalFrames = (animationData: any) => {
    return Math.floor(animationData.op);
  };

  const checkText = (percentage: number) => {
    // !Debugging Purpose

    if (percentage > 100) {
      setTextClass('opacity-0');
    } else if (percentage > TEXT_SHOW_IN_PROGRESS) {
      setTextClass('opacity-100');
    } else {
      setTextClass('opacity-0');
    }
  };

  const handleFrameChange = (
    animationData: any,
    position: number,
    lottieRef: RefObject<LottieRefCurrentProps>,
    debug: boolean = false
  ) => {
    if (lottieRef.current) {
      lottieRef.current.stop();

      const percentage = Math.floor((position / INTRO_DURATION) * 100);

      // Checking Percentage Text
      checkText(percentage);

      const totalFrames = getTotalFrames(animationData);
      const frameNumber: number = Math.floor((percentage / 100) * totalFrames);
      // !Debugging Purpose
      if (debug)
        console.log(
          `percentage : ${percentage} | totalFrame : ${totalFrames} | frameNumber : ${frameNumber}`
        );

      frameNumber < totalFrames
        ? lottieRef.current.playSegments([frameNumber, animationData.op], true)
        : lottieRef.current.playSegments([totalFrames, animationData.op], true);

      lottieRef.current.stop();
    }
  };

  useEffect(() => {
    const controller: ScrollMagic.Controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      duration: INTRO_DURATION,
      triggerElement: introRef.current,
      triggerHook: 0,
    });

    let accelAmount = 0.05;
    let scrollPos = 0;
    let delay = 0;

    if (introRef && introRef.current) {
      scene.addTo(controller).setPin(introRef.current);
    }
    scene.on('update', (e: any) => {
      // !Debugging Purpose

      if (firstRef.current)
        scrollPos =
          e.scrollPos - firstRef.current.offsetHeight - WHITE_SCREEN_GAP;
      else scrollPos = e.scrollPos;
    });

    const intervalId = setInterval(() => {
      delay += (scrollPos - delay) * accelAmount;
      handleFrameChange(animationData, delay, lottieRef);
    }, 1);

    return () => {
      clearInterval(intervalId);
      controller.destroy(true);
    };
  }, []);

  return (
    <div ref={introRef} className="relative center w-full h-screen  ">
      <Lottie
        className="abs-center z-20 w-[300px] md:w-[600px]"
        autoplay={false}
        lottieRef={lottieRef}
        animationData={animationData}
      />
      <div
        className={
          ' absolute  z-30 md:top-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all ' +
          textClass
        }
      >
        <div className="center">
          <p
            className={
              'mt-6 sm:text-xl md:text-xl lg:text-2xl text-center w-full font-thin  tracking-widest transition-all ' +
              textClass
            }
          >
            "An ounce of prevention is worth a pound of cure."
            <span className="ml-3 font-serif text-blue-500  transition-all">
              <br /> - Benjamin Franklin
            </span>
          </p>
        </div>
        <div className="center mt-5">
          <button className="focus:outline-none px-16 py-4 font-semibold text-xl rounded-full bg-primary text-white">
            Detect Parkinson
          </button>
        </div>
      </div>
      <div
        className={
          ' absolute top-[30%] z-30 md:top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all ' +
          textClass
        }
      >
        <h1 className="text-center text-gray-700 text-2xl md:text-7xl font-semibold">
          DiagnoAI
        </h1>
      </div>
    </div>
  );
}
