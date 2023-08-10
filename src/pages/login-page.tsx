import { GoPeople } from 'react-icons/go';
import Input from '../components/input';

export default function LoginPage() {
  return (
    <div className="flex">
      <div className="">
        <div className=""></div>
        <div className="">Diagno AI</div>
        <Input name="email" icon={<GoPeople />} label="Email Address" />
      </div>
      <div className=""></div>
    </div>
  );
}
