export default function Footer() {
  return (
    <div className="h-[100px]  center ">
      <div className="flex flex-col w-[80%]   ">
        <div className="flex flex-col gap-2"></div>
        <hr></hr>
        <div className="mx-3 flex justify-between my-5 text-gray-400 text-sm">
          <div className="flex flex-col justify-center ">
            <img className="w-32" src="/assets/logo-text.png" />
            <p className="mt-1">Privacy Policy Terms and conditions</p>
          </div>
          <div className="center">
            <p>DiagnoAI Team ©</p>
          </div>
        </div>
      </div></div>
  );
}
