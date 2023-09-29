import { IMenu } from '../interfaces/menu-interface';

import { BiDonateBlood } from 'react-icons/bi';
import { BsHeartPulse } from 'react-icons/bs';
import { PiHandHeartDuotone } from 'react-icons/pi';
import { RiMentalHealthLine } from 'react-icons/ri';

export const MENU_LIST: IMenu[] = [
  {
    link: '/diabetes',
    name: 'Diabetes',
    icon: <BiDonateBlood className="w-7 h-7" />,
  },
  {
    link: '/cardiovascular',
    name: 'Cardiovascular',
    icon: <BsHeartPulse className="w-7 h-7" />,
  },
  {
    link: '/stroke',
    name: 'Stroke',
    icon: <PiHandHeartDuotone className="w-7 h-7" />,
  },
  {
    link: '/mental-health',
    name: 'Mental Health',
    icon: <RiMentalHealthLine className="w-7 h-7" />,
  },
];
