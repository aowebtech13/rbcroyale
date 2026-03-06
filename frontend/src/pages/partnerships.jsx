import React from "react";
import SEO from "../common/seo";
import PartnershipArea from "../components/partnerships/partnership-area";
import Header from "../layout/headers/header";
import Footer from "../layout/footers/footer";
import Wrapper from "../layout/wrapper";

const Partnerships = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Partnerships | Rcb Royale Bank"} />
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix">
            <PartnershipArea />
          </main>
          <Footer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Partnerships;
