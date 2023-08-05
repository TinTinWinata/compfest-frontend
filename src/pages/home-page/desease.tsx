interface IDeseaseProps {
  name: string;
}

export default function Desease({ name }: IDeseaseProps) {
  return (
    <div className="w-full cursor-pointer">
      <div className="border border-primary rounded-lg border-opacity-30 w-full h-full bg-white "></div>
      <div className="text-center text-gray-500 font-semibold mt-1">{name}</div>
    </div>
  );
}
