import { useUserAuth } from '../../contexts/user-context';
import { ITest } from '../../interfaces/user-firestore-interface';
import ProfileDiseaseComponent from './profile-disease-component';

export default function ProfileDisease() {
  const { firestore } = useUserAuth();

  return (
    <div className="shadow-sm flex flex-col gap-2">
      {firestore?.tests.map((test: ITest, index: number) => (
        <ProfileDiseaseComponent test={test} key={index} />
      ))}
    </div>
  );
}
