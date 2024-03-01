import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center gap-4 p-2 px-4">
      <h1 className="text-2xl">CraftHub</h1>
      <ul className="flex items-center flex-row  gap-2">
        <li>Home</li>
        <li className="flex flex-row gap-2 items-center">
          Pricing
          <FaAngleDown />
        </li>
      </ul>

      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Get Started</Link>
      </div>
    </div>
  );
};

export default Header;
