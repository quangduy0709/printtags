import { useRouter } from "next/router";
import React from "react";
import SignLayout from "../../components/Layout/SignLayout";
import Verification from "../../containers/Verification";

const Verifications = () => {
  const router = useRouter();
  const query = router.query;
  if (query.id) {
    return <Verification token={query.id} />;
  }
};
Verifications.layout = SignLayout;

export default Verifications;
