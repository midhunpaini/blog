import React, { useContext, useState } from 'react';
import { registerUser } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../context/userContext';
import { submitLogin } from '../helper';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await registerUser(name,email,password)
    if (data) {
      if (data.email) {
        toast.error(data.email[0])
      } else {
        toast.error(data.password[0])
      }
    } else {
      toast.success("Signed up successfully");
      submitLogin(email, password);
      setUser(name);
      setTimeout(() => {
        navigate('/')
      }, 6000);
      setName('');
    setEmail('');
    setPassword('');
    
    }
  };

  return (
    <div className="container mx-auto mt-8 border p-4 max-w-md rounded-md  shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
