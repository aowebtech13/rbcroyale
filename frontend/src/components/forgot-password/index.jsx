import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import ForgotPasswordArea from "./forgot-password-area";

const ForgotPassword = () => {
  return (
    <>
      <HeaderSix />
      <ForgotPasswordArea />
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default ForgotPassword;
