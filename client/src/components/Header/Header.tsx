import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center p-2 px-4 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">CraftHub</h1>
        <ul className="flex items-center flex-row  gap-4 mx-4">
          <Link to="/">Home</Link>
          <Link to="/pricing" className="flex flex-row gap-2 items-center">
            Pricing
            <FaAngleDown />
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/login" className="p-2">
          Login
        </Link>
        <Link
          to="/register"
          className="p-2 bg-primary rounded-lg shadow-md px-4"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Header;
