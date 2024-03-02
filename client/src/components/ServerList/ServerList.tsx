import { BiPlayCircle, BiStopCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const ServerList = () => {
  const online = true;
  return (
    <div className="list mt-4 max-w-[400px] flex flex-col gap-4 w-full">
      {Array.from({ length: 3 }, (_, i) => {
        return (
          <Link
            to={`/server/${i + 1}`}
            key={i}
            className="server relative p-6 flex items-center justify-between font-semibold bg-gray-800 border-gray-400 w-full rounded-sm border"
          >
            {online ? (
              <span className="absolute left-0 top-0 h-full w-2 bg-red-500" />
            ) : (
              <span className="absolute left-0 top-0 h-full w-2 bg-green-500" />
            )}
            <div className="info ">
              <h5 className="capitalize">john Wick Server</h5>
              <p className="text-gray-500 text-sm">Vanilla 1.20</p>
            </div>
            {online ? (
              <BiStopCircle className="text-red-500 text-4xl" />
            ) : (
              <BiPlayCircle className="text-green-500 text-4xl" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ServerList;
