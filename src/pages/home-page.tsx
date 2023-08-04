import ChangeText from '../components/change-text';

export default function Home() {
  return (
    <div className="w-[80%] h-[100%] center">
      <div className="flex flex-col items-center text-center">
        <div className="text-primary font-bold text-[60px]">
          Best AI Writer for Creating
        </div>
        <ChangeText texts={['Healthy.', 'Lifestyle.', 'Environment.']} />
        <p className="text-gray-400  text-md font-semibold my-8">
          A Safer Tomorrow Starts Today! <br />
          Utilize AI to Detect Desease and Embracing a Healthier Lifestyle
        </p>
        <button className="px-16 py-4 font-semibold text-xl rounded-full bg-primary text-white">
          Skin Cancer
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Test is conducted free of charge,
        </p>
      </div>
    </div>
  );
}
