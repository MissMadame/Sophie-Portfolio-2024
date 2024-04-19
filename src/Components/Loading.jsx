import React from "react";

function Loading() {
  return (
    <div className="bg-white text-black flex flex-col items-center justify-center h-screen font-BugrinoRegular">
      <img src="/loading.gif" alt="Loading" className="w-32 h-auto" />
      <p className="text-lg">LOADING</p>
    </div>
  );
}
export default Loading;
