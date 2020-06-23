import React, { useState, useReducer } from "react";
import axios from "axios";

const Login = () => {
  // handling multiple inputs for functional components w/ useReducer
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post("/api/user/login", userInput);
    // destructure the token from res.data.token
    const {
      data: { token },
    } = res;
    // save the token in local storage . . . we'd typically store this in redux
    localStorage.setItem("authorization", token);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action="POST">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={handleChange} value={userInput.email} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={handleChange} value={userInput.password} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

// 19:50
