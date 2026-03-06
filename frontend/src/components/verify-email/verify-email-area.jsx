import React, { useEffect, useState } from "react";
import VerifyEmailForm from "@/src/forms/verify-email-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// account images
import account_img_1 from "@/public/assets/img/account/account-bg.png";
import account_img_2 from "@/public/assets/img/account/acc-main.png";
import account_img_3 from "@/public/assets/img/account/ac-author.png";
import account_img_4 from "@/public/assets/img/account/ac-shape-1.png";
import account_img_5 from "@/public/assets/img/account/ac-shape-2.png";

const account_shape = [
  {
    id: 1,
    cls: "bg",
    img: account_img_1,
  },
  {
    id: 2,
    cls: "main-img",
    img: account_img_2,
  },
  {
    id: 3,
    cls: "author",
    img: account_img_3,
  },
  {
    id: 4,
    cls: "shape-1",
    img: account_img_4,
  },
  {
    id: 5,
    cls: "shape-2",
    img: account_img_5,
  },
];

const VerifyEmailArea = () => {
  const router = useRouter();
  const { email } = router.query;
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    } else {
      // Fallback: try to get email from local storage or session if needed
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email) {
          setUserEmail(user.email);
        }
      }
    }
  }, [email]);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className="signin-banner-area signin-banner-main-wrap d-flex align-items-center">
              <div
                className="signin-banner-left-box d-none d-lg-block p-relative"
                style={{
                  backgroundColor: "#F1EFF4",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div className="tp-account-thumb-wrapper p-relative text-center">
                  {account_shape.map((item, i) => (
                    <div key={i} className={`tp-account-${item.cls}`}>
                      <Image src={item.img} alt="theme-pure" />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="signin-banner-from d-flex justify-content-center align-items-center"
                style={{ flex: "1" }}
              >
                <div className="signin-banner-from-wrap">
                  <div className="signin-banner-title-box">
                    <h4 className="signin-banner-from-title">
                      Verify Your Email Address
                    </h4>
                  </div>

                  <div className="signin-banner-from-box">
                    <p className="signin-banner-from-subtitle">
                      We've sent a 6-digit verification code to <strong>{userEmail}</strong>. Please enter the code below to complete your registration.
                    </p>
                    <VerifyEmailForm email={userEmail} />
                  </div>
                  <div className="signin-banner-from-register mt-20">
                    <Link href="/sign-in">
                      Back to <span>Sign In</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailArea;
