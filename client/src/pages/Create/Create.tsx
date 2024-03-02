import { BiPlayCircle, BiPlus, BiStop, BiStopCircle } from "react-icons/bi";
import ServerList from "../../components/ServerList/ServerList";

const Create = () => {
  return (
    <div className="flex items-center justify-center my-20 flex-col gap-4">
      <div className="create">
        <button className="bg-primary flex items-center gap-2 hover:bg-primarySecondary transition-colors px-4 p-2 rounded-md shadow-md">
          Create Server
          <BiPlus />
        </button>
      </div>
      <ServerList />
    </div>
  );
};

export default Create;
