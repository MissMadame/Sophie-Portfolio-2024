// Home.js
import React, { Suspense } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
const Gradient = React.lazy(() => import("../Components/Gradient.jsx"));

function Home() {
  return (
    <div className="bg-black">
      <div className="relative w-full h-1/2-screen flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex-grow-0 z-0">
            <Gradient />
          </div>
        </Suspense>
        <Header />
        <div className="flex-grow z-50">
          <Label />
        </div>
      </div>
    </div>
  );
}

export default Home;
