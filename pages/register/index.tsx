import React from "react";
import SignLayout from "../../components/Layout/SignLayout";
import Register from "../../containers/Register";

const index = () => {
  return <Register />;
};
index.layout = SignLayout;

export default index;
