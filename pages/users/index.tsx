import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Users from "../../containers/Users";

const User = () => {
  return <Users />;
};
User.layout = MainLayout;

export default User;
