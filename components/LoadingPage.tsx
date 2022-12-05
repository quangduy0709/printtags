import React from "react";
import Loading from "./Printgrows/Loading/Loading";

const LoadingPage = () => {
  return (
    <div className="h-screen  fixed inset-0 z-[9999]">
      <Loading />
    </div>
  );
};

export default LoadingPage;
