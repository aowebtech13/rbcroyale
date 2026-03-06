import React from 'react';
import SEO from '../common/seo';
import Wrapper from '../layout/wrapper';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import Breadcrumb from '../common/breadcrumbs/breadcrumb';
import PolicyArea from '../components/policy/policy-area';

const PrivacyPolicy = () => {
    const content = (
        <>
            <p className="mb-20">At Rcb Royale Bank, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us.</p>
            
            <h4 className="text-slate-900 font-black mt-30 mb-15">1. Information Collection</h4>
            <p className="mb-20">We collect information that you provide directly to us when you create an account, make an investment, or communicate with our support team. This may include your name, email address, phone number, and financial details.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">2. Use of Information</h4>
            <p className="mb-20">The information we collect is used to provide and improve our services, process your transactions, communicate with you about your account, and ensure compliance with legal requirements.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">3. Data Security</h4>
            <p className="mb-20">We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">4. Sharing of Information</h4>
            <p className="mb-20">We do not sell or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">5. Your Rights</h4>
            <p className="mb-20">You have the right to access, correct, or delete your personal information. If you have any questions or concerns about your data, please contact our support team.</p>
        </>
    );

    return (
        <Wrapper>
            <SEO pageTitle={"Privacy Policy | Rcb Royale Bank"} />
            <HeaderSix style_2={true} />
            <main>
                <Breadcrumb title_top="Privacy Policy" title_bottom="Legal Information" />
                <PolicyArea title="Privacy Policy" content={content} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default PrivacyPolicy;
