import React from "react";
import SignLayout from "../../components/Layout/SignLayout";
import Login from "../../containers/Login";

const index = () => {
  return <Login />;
};
index.layout = SignLayout;

export default index;
