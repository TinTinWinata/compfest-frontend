import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { DISEASE_LIST, IDiseaseForm } from '../settings/disease-setting';

export default function DiseaseListPage() {
  return (
    <div>
      <Navbar />
      <div data-aos="fade-up" className="center">
        <div className="w-[60%] mt-32 max-w-screen-xl flex flex-col  border border-gray-500  border-opacity-10 rounded-md p-6">
          <h1 className="font-semibold text-2xl text-center mb-7">
            Disease Lists
          </h1>
          {DISEASE_LIST.map((disease: IDiseaseForm) => (
            <div
              className=" py-5 px-3 flex justify-between font-semibold text-gray-500 w-full  border-t border-gray-300 border-opacity-30"
              key={disease.link}
            >
              <div className="center">
                <p className=" ">{disease.name}</p>
              </div>
              <Link
                to={disease.link}
                className="h-full px-5 py-2 rounded-full center font-semibold bg-primary text-white transition-all hover:bg-primaryHover "
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
