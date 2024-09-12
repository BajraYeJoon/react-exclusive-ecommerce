import { FaTwitter, FaLinkedin } from "react-icons/fa";

export function TeamsDisplay({ employees }: any) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
      {employees.map((employee: any) => (
        <div key={employee.id} className="flex items-center justify-center">
          <div className="flex flex-col items-start gap-5">
            <img
              alt={employee.name}
              loading="lazy"
              decoding="async"
              className="mt-5 h-44 object-contain"
              src={employee.image}
            />
            <div className="max-3xl:gap-2 flex flex-col items-start gap-4">
              <div className="max-3xl:gap-1 flex flex-col items-start gap-2 capitalize">
                <p className="max-3xl:text-base text-xl max-2xl:text-sm">
                  {employee.name}
                </p>
                <p className="text-sm md:text-base">{employee.position}</p>
              </div>
              <div className="flex items-center gap-5">
                {employee.twitter && (
                  <a
                    href={employee.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={20} />
                  </a>
                )}
                {employee.linkedin && (
                  <a
                    href={employee.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
