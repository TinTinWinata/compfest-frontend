import { useEffect, useState } from 'react';

export default function ProgressBar({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const [progress, setProgress] = useState<number>(0);
  const calculateProgress = () =>
    setProgress(() => {
      const value = Math.ceil((from / to) * 100);
      return value;
    });
  useEffect(() => calculateProgress(), [from, to]);
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-7 ">
        <div
          style={{ width: `${progress}%` }}
          className={`transition-all  bg-blue-600 h-7 rounded-full`}
        ></div>
      </div>
      <p className="mb-1 text-md text-gray-500 text-center mt-3 text-sm sm:text-lg">{`Question ${from} / ${to}`}</p>
    </>
  );
}
