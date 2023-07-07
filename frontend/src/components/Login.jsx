import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitLogin } from "../helper";
import UserContext from "../context/userContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await submitLogin(email, password);
    console.log((data.message))
    if (data.message==='failed') {
      toast.error(data.data.detail);
    } else {
      toast.success("Logged successfully");
      setUser(data?.data?.name);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.data.jwt);
      navigate('/')
    }
  };

  return (
    <div className="container mx-auto mt-8 border p-4 max-w-md rounded-md  shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <Link to="/register">
        <p className="mt-4 text-gray-600">
          Not registered? <button className="text-blue-500">Register</button>
        </p>
      </Link>
    </div>
  );
};

export default Login;
