import React from "react";
import SEO from "../common/seo";
import ForgotPassword from "../components/forgot-password";
import Wrapper from "../layout/wrapper";

const ForgotPasswordPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Forgot Password | Lexicrone Finance"} />
      <ForgotPassword />
    </Wrapper>
  );
};

export default ForgotPasswordPage;
