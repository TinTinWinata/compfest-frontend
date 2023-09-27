import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnHoverOutside } from '../../hooks/useHoverOutside';
import { IMenu } from '../../interfaces/menu-interface';
import { MENU_LIST } from '../../settings/menu-setting';

export default function DeseaseMenu() {
  const ref = createRef<HTMLDivElement>();
  const [hover, setHover] = useState<boolean>(false);
  const closeHoverMenu = () => {
    setHover(false);
  };

  useOnHoverOutside(ref, closeHoverMenu); // Call the hook
  return (
    <div ref={ref} className="mx-2  font-semibold cursor-pointer relative">
      <Link to="/disease-list" className="" onMouseOver={() => setHover(true)}>
        Disease
      </Link>

      {hover && (
        <div
          className={`
        font-normal  w-72 transition-all    bottom-[-0px] translate-y-[100%] absolute left-[50%] translate-x-[-50%]`}
        >
          <div className="w-full mt-4 bg-white custom-shadow rounded-md">
            {MENU_LIST.map((menu: IMenu, index: number) => (
              <Link
                to={menu.link}
                key={index}
                className="text-gray-800 flex font-semibold px-4   hover:bg-blue-50 py-5 0 transition-all rounded-md"
              >
                <div className="flex flex-col w-[200px]">
                  <div className="">{menu.name}</div>
                  <div className="text-gray-400 text-sm">
                    Test {menu.name} for free
                  </div>
                </div>
                <div className="center bg-red">{menu.icon}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
