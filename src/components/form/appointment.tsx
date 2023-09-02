export interface IAppointmentProps {
  name: string;
  link: string;
  icon?: string;
}

export default function Appointment({ name, link, icon }: IAppointmentProps) {
  return (
    <a
      data-aos="fade-up"
      target="_blank"
      href={link}
      className="p-3 rounded-lg hover:bg-blue-50 bg-white transition-all flex flex-col gap-1 border border-gray-300 border-opacity-30"
    >
      <div className="flex gap-2">
        <div className="center">
          <div className="text-left font-semibold text-gray-800">{name}</div>
        </div>
        <div className="center  ">
          <img className="w-4 h-4" src={icon} />
        </div>
      </div>
      <div className="text-gray-500">Konsultasi dokter </div>
    </a>
  );
}
