import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { DISEASE_LIST, IDiseaseForm } from '../settings/disease-setting';

export default function DiseaseListPage() {
  return (
    <div>
      <Navbar />
      <div data-aos="fade-up" className="center">
        <div className="sm:w-[60%] w-[80%] mt-32 mb-10 max-w-screen-xl flex flex-col shadow-sm  border border-gray-500  border-opacity-0 sm:border-opacity-20 rounded-md p-6">
          {!isMobile && (
            <h1 className="font-semibold text-2xl text-center mb-7">
              Disease Lists
            </h1>
          )}
          {DISEASE_LIST.map((disease: IDiseaseForm) => (
            <div
              className="sm:gap-0 gap-3 flex-row py-5 px-3 flex  justify-between font-semibold text-gray-500 w-full border-t border-gray-300 border-opacity-100 sm:border-opacity-20"
              key={disease.link}
            >
              <div className="center ">
                <p className="sm:text-base text-sm">{disease.name}</p>
              </div>
              <Link
                to={disease.link}
                className="h-full px-3 w-fit sm:px-5 py-2 rounded-md sm:rounded-full center font-semibold bg-primary text-white transition-all hover:bg-primaryHover "
              >
                Take Test
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
