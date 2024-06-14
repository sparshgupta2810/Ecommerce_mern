import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context)
  console.log('SummaryApi:', SummaryApi); 

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/');
        fetchUserDetails()
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Failed to log in. Please try again.");
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="h-[90%] w-full md:w-3/4 m-4">
          <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
            <h1 className="font-semibold text-3xl text-gray-700 m-2">Log In</h1>
          </div>
          <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
            </div>
            <div className="flex bg-gray-100 rounded-lg focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-52 lg:w-[340px]"
              />
              <div className='cursor-pointer text-xl px-5 py-2' onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex space-x-2 -ml-28 md:-ml-40 lg:-ml-52">
              <input className="" type="checkbox" id="checkbox" name="checkbox" />
              <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">
                Remember Me
              </h3>
            </div>
          </div>
          <div className="text-center mt-7">
            <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600 font-medium">
              Login
            </button>
          </div>
          <div className="text-center my-6 flex flex-col">
            <Link to={"/forgotpassword"}>
              <div className="text-sm font-medium text-gray-400 hover:text-violet-500 m-1">
                Forgot Password?
              </div>
            </Link>
            <Link to={"/SignUp"}>
              <div className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
                Not a User? Create New Account
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;



