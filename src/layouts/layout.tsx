type ContentLayout = {
  children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  return (
    <div className="w-full h-full relative">
      {/* Navigation Bar VVV */}

      {/* ---------------------------------- */}

      {/* All Content will be inside this div (chidren) VVV */}
      <div className="center w-full h-full ">
        <div className="w-full h-full max-w-screen-xl">{children}</div>
      </div>

      {/* ----------------------------------- */}
    </div>
  );
}
