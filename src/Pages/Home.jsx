import React, { Suspense } from "react";

const Mountain = React.lazy(() => import("../Components/Mountain.jsx"));

function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Mountain />
      </Suspense>
    </div>
  );
}

export default Home;
