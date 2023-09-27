import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DISEASE_LIST, IDiseaseForm } from '../settings/disease-setting';
import Modal from './modal';

export default function DiseaseModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [annLink, setAnnLink] = useState<string>('');
  const navigate = useNavigate();

  const getCurrentUrl = () => {
    const url = window.location.href;
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return '/' + lastPart;
  };

  const checkIsThereAnyAnnDisease = () => {
    const link = getCurrentUrl();
    const disease = DISEASE_LIST.find((disease: IDiseaseForm) => {
      return disease.link === link + '-ann';
    });
    if (disease) {
      setOpen(true);
      setAnnLink(disease.link);
    }
  };
  const handleClickAnn = () => {
    setOpen(false);
    navigate(annLink);
  };

  useEffect(() => {
    checkIsThereAnyAnnDisease();
  }, []);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className=" text-gray-600 center gap-8 p-3">
        <div
          onClick={() => setOpen(false)}
          className="cursor-pointer flex p-3 hover:bg-blue-50 transition-all rounded-md flex-col"
        >
          <p className="text-center text-lg sm:text-xl font-semibold">
            Use Default
          </p>
          <img
            className="h-20 sm:h-32 mb-1 mt-3"
            src="/assets/prediction-2.png"
          />
          <p className="text-center text-sm sm:text-base  pt-3">
            more accurates, binary result
          </p>
        </div>
        <div
          onClick={handleClickAnn}
          className="cursor-pointer flex p-3 hover:bg-blue-50 transition-all rounded-md flex-col"
        >
          <p className="text-center text-lg sm:text-xl font-semibold">
            Use ANN
          </p>
          <img className="h-20 sm:h-32 mb-1 mt-3" src="/assets/ann.png" />
          <p className="text-center text-sm sm:text-base pt-3">
            less accurates, percentage result
          </p>
        </div>
      </div>
    </Modal>
  );
}
