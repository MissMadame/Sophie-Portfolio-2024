import React from "react";

function Loading() {
  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen font-BugrinoRegular">
      <img src="/loading.gif" alt="Loading" />
      <p>LOADING</p>
    </div>
  );
}

export default Loading;
