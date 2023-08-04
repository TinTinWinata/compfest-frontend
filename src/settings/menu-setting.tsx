import { IMenu } from '../interfaces/menu-interface';

import { BiDonateBlood } from 'react-icons/bi';
import { BsHeartPulse } from 'react-icons/bs';
import { PiHandHeartDuotone } from 'react-icons/pi';

export const MENU_LIST: IMenu[] = [
  {
    link: '/diabetes',
    name: 'Diabetes',
    icon: <BiDonateBlood className="w-7 h-7" />,
  },
  {
    link: '/coroner',
    name: 'Coroner',
    icon: <BsHeartPulse className="w-7 h-7" />,
  },
  {
    link: '/stroke',
    name: 'Stroke',
    icon: <PiHandHeartDuotone className="w-7 h-7" />,
  },
];
