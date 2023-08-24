import { FaHeart } from 'react-icons/fa';
import { useUserAuth } from '../../contexts/user-context';
import { ITest } from '../../interfaces/user-firestore-interface';

export default function ProfileDisease() {
  const { firestore } = useUserAuth();

  return (
    <div className="">
      {firestore?.tests.map((test: ITest, index: number) => (
        <div className="border rounded-md  text-gray-500">
          <div className="center gap-2 ">
            <div className="p-3">{test.name}</div>
            <div className="">
              <FaHeart />
            </div>
          </div>
          <div className="center">
            <hr className="w-[90%]" />
          </div>
          <p className="p-3 flex flex-col">
            {Object.entries(test.answers).map(([key, value]) => (
              <div className="flex gap-2" key={key}>
                <div className="">{key} : </div>
                <div className="">{value}</div>
              </div>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
