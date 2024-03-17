import { BiPlayCircle, BiPlus, BiStop, BiStopCircle } from "react-icons/bi";
import ServerList from "../../components/ServerList/ServerList";
import { useState } from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import Plan from "../../components/Plan/Plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServerSchema } from "../../lib/server.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServerService } from "../../service/server.service";
import { useNavigate } from "react-router-dom";

import { ServerData } from "../../types/main.types";

const Create = () => {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    serverName: "",
  });
  type Inputs = z.infer<typeof ServerSchema>;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ServerSchema),
  });

  const handleCreate = async () => {
    const { serverName } = FormData;

    try {
      await ServerService.CreateServer(
        serverName,
        (response: {
          success: boolean;
          status: number;
          message: string;
          server: ServerData;
        }) => {
          if (response.status === 201 || response.status === 200) {
            navigate(`/server/${response.server.serverID}`);
          }
        }
      );
    } catch (err: any) {
      setError("serverName", {
        type: "manual",
        message: err.message,
      });
    }
  };

  function handleFormData(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="flex items-center justify-center my-20 flex-col gap-4">
      <div className="create">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary flex items-center gap-2 hover:bg-primarySecondary transition-colors px-4 p-2 rounded-md shadow-md"
        >
          Create Server
          <BiPlus />
        </button>
      </div>
      <ServerList />
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col gap-4 justify-between">
          <Plan />
          <form
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="serverName">Server Name</label>
              <input
                {...register("serverName")}
                id="serverName"
                onChange={handleFormData}
                autoFocus
                type="text"
                className="bg-transparent focus:outline-none focus:border-blue-500 border rounded-md p-2"
                placeholder="Server Name..."
              />
              {errors.serverName?.message && (
                <span className="error italic text-xs capitalize font-normal text-red-500">
                  - {errors.serverName.message}.
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 ">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary h-10 flex items-center hover:bg-primarySecondary rounded-md shadow-md transition-colors px-4 p-2"
              >
                {isSubmitting ? <Loading /> : "Create Server"}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default Create;

export const Loading = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};
