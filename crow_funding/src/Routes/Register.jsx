import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/slices/userSlice";
import givinghands from "../assets/giving_hands.jpg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Signup = async () => {
    console.log("Signup function triggered");
    try {
      console.log("Sending signup request...");
      const res = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });
      const token = res.data.token
      dispatch(login({ name, email,token }))
      navigate("/VerifyEmail");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <div className="bg-red-50 min-h-screen flex flex-col items-center justify-center">
      <div className="p-8">
        <h1 className="text-3xl font-bold">Sign Up</h1>
      </div>
      <div className="items-center justify-center m-10">
        <div className="w-32 h-32 overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover"
            src={givinghands}
            alt="Giving Hands"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <input
          className="p-4 m-2 border border-gray-300 rounded"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-4 m-2 border border-gray-300 rounded"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-4 m-2 border border-gray-300 rounded"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={Signup} className="py-2 px-16 m-8 bg-red-600 text-white rounded-lg hover:bg-red-700"> Sign Up</button>
       
      
      <Link className="m-4" to="/login">
        <p className="m-4 text-indigo-600 hover:underline">
          Have an account already?
        </p>
      </Link>
    </div>
  );
};

export default Register;
