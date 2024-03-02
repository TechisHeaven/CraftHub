import { BiLock } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[calc(100vh-16px)] flex items-center justify-center overflow-hidden">
      <img
        src="bg-header.svg"
        alt="bg-header"
        draggable="false"
        className="absolute z-0 object-cover w-full h-full"
      />
      <img
        src="render-header.webp"
        alt="hero-image"
        className="z-20 w-64 mr-10 hidden md:block"
      />
      <div className="z-20 m-2 bg-backgroundSecondary max-w-[400px] w-full rounded-md shadow-md p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <h5 className="text-sm text-gray-500 capitalize my-2">
            dont have any account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </h5>
        </div>
        <form action="" className="flex items-center flex-col gap-4 p-2">
          <div className="flex items-center gap-2 w-full p-1 px-2 border text-gray-500 border-gray-600/20 rounded-sm">
            <MdOutlineMailOutline />
            <input
              type="email"
              placeholder="email address"
              spellCheck="false"
              name="email"
              id="email"
              className="w-full outline-none text-gray-200 bg-background bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 w-full p-1 px-2 border text-gray-500 border-gray-600/20 rounded-sm">
            <BiLock />
            <input
              type="password"
              placeholder="password"
              spellCheck="false"
              name="email"
              id="email"
              className="w-full outline-none text-gray-200 bg-background bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-primary w-full p-2 hover:bg-primarySecondary transition-colors text-sm rounded-md"
          >
            Login
          </button>
          <hr className="h-2 w-full border-gray-800" />
          <div className="providers flex w-full gap-2">
            <button
              type="button"
              className="p-2 w-full bg-gray-700/50 shadow-sm border border-gray-600/20 flex rounded-md justify-center"
            >
              <img src="/google.png" className=" aspect-square w-5" alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
