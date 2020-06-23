import React from "react";

const Home = () => {
  const logout = () => {
    localStorage.removeItem("authorization");
  };
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
