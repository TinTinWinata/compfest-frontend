import Marquee from 'react-fast-marquee';

export default function HomeMarquee() {
  return (
    <div className="w-full  center h-fit">
      <div className="  w-[70%] rounded-3xl">
        <Marquee
          speed={30}
          gradient={true}
          // gradientColor={[27, 104, 175]}
          gradientWidth={200}
          className="rounded-3xl"
        >
          <h3 className="py-2 px-3 text-gray-400 text-[40px] font-bold">
            A future where diseases are detected before they conquer.
          </h3>
        </Marquee>
      </div>
    </div>
  );
}
