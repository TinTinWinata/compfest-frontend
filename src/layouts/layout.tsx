import Navbar from '../components/navbar';

type ContentLayout = {
  children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  return (
    <div className="w-full h-full relative">
      {/* Navigation Bar VVV */}
      <Navbar></Navbar>

      {/* ---------------------------------- */}

      {/* All Content will be inside this div (chidren) VVV */}

      <div className="center w-full h-full">{children}</div>

      {/* ----------------------------------- */}
    </div>
  );
}
