import React from 'react';
import RegisterForm from '@/src/forms/register-form';
import AppleIcon from '@/src/svg/apple-icon'; 
import GoogleIcon from '@/src/svg/google-icon';
import Image from 'next/image';
import Link from 'next/link';

// account images
import account_img_1 from "@/public/assets/img/account/account-bg.png"
import account_img_2 from "@/public/assets/img/account/acc-main.png"
import account_img_3 from "@/public/assets/img/account/ac-author.png"
import account_img_4 from "@/public/assets/img/account/ac-shape-1.png"
import account_img_5 from "@/public/assets/img/account/ac-shape-2.png"

const account_shape = [
    {
        id: 1,
        cls: "bg",
        img: account_img_1 
    },
    {
        id: 2,
        cls: "main-img",
        img: account_img_2 
    },
    {
        id: 3,
        cls: "author",
        img: account_img_3 
    },
    {
        id: 4,
        cls: "shape-1",
        img: account_img_4
    },
    {
        id: 5,
        cls: "shape-2",
        img: account_img_5
    },
];

const RegisterArea = () => {
    return (
        <>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <div className="signin-banner-area signin-banner-main-wrap d-flex align-items-center">
                            <div className="signin-banner-left-box d-none d-lg-block p-relative" style={{ backgroundColor: '#F1EFF4', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <div className="tp-account-thumb-wrapper p-relative text-center">
                                    {account_shape.map((item, i) => (
                                        <div key={i} className={`tp-account-${item.cls}`}>
                                            <Image src={item.img} alt="theme-pure" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="signin-banner-from d-flex justify-content-center align-items-center" style={{ flex: '1' }}>
                                <div className="signin-banner-from-wrap">
                                    <div className="signin-banner-title-box">
                                        <h4 className="signin-banner-from-title">Register A Partner Account</h4>
                                    </div>
                                   
                                    <div className="signin-banner-from-box">
                                        <h5 className="signin-banner-from-subtitle">Please Read all terms and conditions</h5>
                                        <RegisterForm />  
                                    </div>
                                    <div className="signin-banner-from-register mt-20">
                                        <Link href="/sign-in">
                                            Already have an account? <span>Sign In here</span>
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

export default RegisterArea;