import React from "react";
import Cube from "../Components/Cube.jsx";

function Home() {
  return (
    <div>
      <h1 className="bg-green-300 border-green-600 border-b p-4 m-4 rounded">
        {" "}
        I am Alice lol{" "}
      </h1>
      <Cube />
    </div>
  );
}
export default Home;
