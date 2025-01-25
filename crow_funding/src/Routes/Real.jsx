import React, { useRef,useState } from "react";
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import  axios from 'axios'
import {toast} from 'react-toastify';

const VerificationForm = () => {
  const navigate = useNavigate()
  const email = useSelector((state)=> state.user.email)
  const inputsRef = useRef([]);
  const handleInput = (e, index) => {
    const input = e.target;
    const nextInput = inputsRef.current[index + 1];

    if (nextInput && input.value) {
      nextInput.focus();
      if (nextInput.value) {
        nextInput.select();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    pasteData.split("").forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char;
      }
    });
    const lastFilledInput = inputsRef.current.find(
      (input, index) => pasteData[index] && !inputsRef.current[index + 1]
    );
    if (lastFilledInput) {
      lastFilledInput.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.target.value) {
      e.target.value = "";
      return;
    }
    const previousInput = inputsRef.current[index - 1];
    if (previousInput) previousInput.focus();
  };

  const handleArrow = (e, index) => {
    if (e.key === "ArrowLeft") {
      const previousInput = inputsRef.current[index - 1];
      if (previousInput) previousInput.focus();
    } else if (e.key === "ArrowRight") {
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };
  const handleClick = async () =>{
      console.log('it diid it ')
      const enteredCode = inputsRef.current
      .map((input) => input?.value || "")
      .join("");
      console.log(enteredCode)
      const  res = await axios.post('http://localhost:8080/auth/verifyCode',{email,enteredCode})
      console.log(res)
      const {error,success} = res.data
      if(error){
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }else{
        navigate('/Choices')
      }

      

  }

  return (
    <div className="bg-red-50 min-h-screen flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-md"
        onPaste={handlePaste}
      >
        <h4 className="text-center text-lg font-semibold mb-4">
          Enter your code
        </h4>
        <div className="flex space-x-2 mb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <input
              key={index}
              type="tel"
              maxLength="1"
              pattern="[0-9]"
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ref={(el) => (inputsRef.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") handleBackspace(e, index);
                else if (e.key === "ArrowLeft" || e.key === "ArrowRight")
                  handleArrow(e, index);
              }}
              onFocus={(e) => setTimeout(() => e.target.select(), 0)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Verify Account
        </button>
      </form>
    </div>
  );
};

export default VerificationForm;
