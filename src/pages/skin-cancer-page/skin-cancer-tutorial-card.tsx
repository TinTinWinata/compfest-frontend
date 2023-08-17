import { Player } from '@lottiefiles/react-lottie-player';

interface ISkinCancerTutorialCardProps {
  animName: string;
  title: string;
  extraClass?: string;
  first: boolean;
}

export default function SkinCancerTutorialCard({
  animName,
  title,
  extraClass,
  first,
}: ISkinCancerTutorialCardProps) {
  return (
    <div
      className={`${
        first ? 'border-opacity-50' : 'border-opacity-0'
      } border rounded-xl  border-gray-50 p-6  w-[200px]`}
    >
      <h1 className="mb-10 text-base">{title}</h1>
      <div className={` h-[100px] relative`}>
        <div
          className={`${extraClass} absolute   w-[150px] left-[50%]  min-translate`}
        >
          <Player autoplay loop src={`/assets/${animName}.json`} />
        </div>
      </div>
    </div>
  );
}
