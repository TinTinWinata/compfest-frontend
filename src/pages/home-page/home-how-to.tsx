const INSTRUCTION_LIST = ['Start Form', 'Answer Form', 'Get Result'];
import { useState } from 'react';

export default function HomeHowTo() {
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="pb-20 gradient-circle-blue w-full h-[1000px] center">
      <div className="w-[1000px]">
        <div className="text-primary font-semibold">How It Works</div>
        <div className="font-medium text-gray-800 text-[30px]">
          Diagnosis Easily with DiagnoAI.
        </div>
        <div className="w-full  my-6 bg-white border rounded-md flex justify-evenly">
          {INSTRUCTION_LIST.map((instruction: string, index: number) => {
            const isSelected = index === selected;
            const onClick = () => setSelected(index);
            return (
              <div
                onClick={onClick}
                key={index}
                className={`${
                  isSelected ? ' text-primary bg-blue-50 rounded-md my-1' : ''
                } cursor-pointer center gap-2 p-3 font-semibold`}
              >
                <div className="">{index + 1}</div>
                <div className="">{instruction}</div>
              </div>
            );
          })}
        </div>
        <div className="">
          {INSTRUCTION_LIST.map((instruction, index: number) => {
            const isSelected = index === selected;
            return (
              <div
                className={`glow-blue rounded-md border p ${
                  isSelected ? 'block' : 'hidden'
                }`}
                key={index}
              >
                <img
                  className=" rounded-md"
                  src={`/assets/step-${index + 1}.png`}
                  alt=""
                />
              </div>
            );
            // return <div className="h-[500px]" />;
          })}
        </div>
        <div className="center mt-5 gap-3">
          {INSTRUCTION_LIST.map((instruction, index: number) => {
            const isSelected = index === selected;
            const onClick = () => setSelected(index);
            return (
              <div
                key={index}
                onClick={onClick}
                className={`cursor-pointer bg-primary w-3 h-3 rounded-full ${
                  isSelected ? 'opacity-100' : 'opacity-50'
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
