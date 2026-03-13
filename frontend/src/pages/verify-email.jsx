import React from "react";
import SEO from "../common/seo";
import VerifyEmailArea from "../components/verify-email/verify-email-area";
import Wrapper from "../layout/wrapper";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"rbcbank - Email Verification"} />
      <VerifyEmailArea />
    </Wrapper>
  );
};

export default index;
