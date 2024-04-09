// GradientWrapper.jsx
import React from "react";
import { Suspense } from "react";
import Loading from "./Loading"; // Adjust the path as necessary
const Gradient = React.lazy(() => import("./Gradient.jsx")); // Adjust the path as necessary

const GradientWrapper = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Gradient />
      {children}
    </Suspense>
  );
};

export default GradientWrapper;
