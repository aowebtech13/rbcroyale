import React from "react";
import EmailIcon from "../svg/email";

const HeroForm = () => {
  return (
    <>
      <form action="https://formspree.io/f/xojnzovn" method="POST">
        <div className="p-relative">
          <input type="number" name="phone" placeholder=" Enter Phone Number" required />
          {/* email icon */}
          <EmailIcon />
        </div>
        <button type="submit" className="tp-btn tp-btn-hover alt-color-black">
          <span>Talk to an Agent</span>
          <b></b>
        </button>
      </form>
    </>
  );
};

export default HeroForm;
