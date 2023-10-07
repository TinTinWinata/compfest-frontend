import { useState } from 'react';
import { Link } from 'react-router-dom';
import DiseaseComponent from './home-disease-component';

const DISEASE_LIST = [
  {
    name: 'Diabetes',
    asset: '/assets/diabetes.jpg',
  },
  {
    name: 'Cardiovascular',
    asset: '/assets/cardiovaskular.webp',
  },
  {
    name: 'Stroke',
    asset: '/assets/stroke.jpg',
  },
  {
    name: 'Mental Health',
    asset: '/assets/mental-health.jpg',
  },
];

export default function HomeDeseaseWrapper() {
  const [selected, setSelected] = useState<number>(-1);

  return (
    <div className="p-10 bg-backgroundGray pb-10 w-full min-h-[700px] sm:min-h-[900px]  flex justify-center items-center">
      <div className="w-full flex flex-col items-center max-w-[900px]">
        <div className="w-full flex justify-between">
          <div className="text-white">
            <h1 className="uppercase font-bold tracking-wider">Diseases</h1>
            <h1 className="text-sm sm:text-lg  sm:leading-[50px] sm:text-[40px] font-semibold w-3/4">
              Get Started to Diagnosis Before Late!
            </h1>
          </div>
          <div className="center">
            <Link
              to="/disease-list"
              className="h-fit px-4 py-2 sm:px-8 sm:py-3 text-sm font-semibold rounded-md bg-gray-100 transition-all hover:bg-gray-300"
            >
              See All Diseases
            </Link>
          </div>
        </div>
        <div className="mt-10 sm:mt-0 rounded-xl grid grid-cols-2 w-full h-[400px] sm:h-[550px] gap-x-10 gap-y-10 sm:gap-y-20 m-5">
          {DISEASE_LIST.map((disease, index: number) => (
            <div
              onMouseEnter={() => setSelected(index)}
              onMouseLeave={() => setSelected(-1)}
              key={index}
            >
              <DiseaseComponent
                index={index}
                selected={selected}
                name={disease.name}
                asset={disease.asset}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
