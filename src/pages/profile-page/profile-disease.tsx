import { useUserAuth } from '../../contexts/user-context';
import { ITest } from '../../interfaces/user-firestore-interface';
import ProfileDiseaseComponent from './profile-disease-component';

export default function ProfileDisease() {
  const { firestore } = useUserAuth();

  return (
    <div className="pb-10 shadow-sm flex flex-col gap-2">
      <h1 className="text-2xl text-gray-600 mb-2 font-semibold">
        Disease Lists
      </h1>
      {firestore?.tests.map((test: ITest, index: number) => (
        <ProfileDiseaseComponent test={test} key={index} />
      ))}
    </div>
  );
}
