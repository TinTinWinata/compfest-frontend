type ContentLayout = {
  children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  return (
    <div className="bg-background  relative ">
      {/* Navigation Bar VVV */}

      {/* ---------------------------------- */}

      {/* All Content will be inside this div (chidren) VVV */}
      <div className="">
        <div className=" ">{children}</div>
      </div>

      {/* ----------------------------------- */}
    </div>
  );
}
