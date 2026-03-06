import React from "react";
import SEO from "../common/seo";
import Header from "../layout/headers/header-6";
import Footer from "../layout/footers/footer";
import OpenAccountArea from "../components/homes/home-2/open-account-area";
import Wrapper from "../layout/wrapper";

const Welcome = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Welcome to Lexicrone | Start Your Investment Journey"} />
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix">
            <OpenAccountArea />
          </main>
      
        </div>
      </div>
    </Wrapper>
  );
};

export default Welcome;
