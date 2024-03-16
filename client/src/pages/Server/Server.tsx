import { useParams } from "react-router-dom";

const Server = () => {
  const { id } = useParams();
  return <div>Server - ID: {id}</div>;
};

export default Server;
