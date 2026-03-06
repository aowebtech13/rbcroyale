import React from 'react';
import SEO from '../common/seo';
import Wrapper from '../layout/wrapper';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';

import PolicyArea from '../components/policy/policy-area';

const TermsConditions = () => {
    const content = (
        <>
            <p className="mb-20">Last Updated: February 26, 2026</p>
            <p className="mb-20">Welcome to Lexicrone. These Terms and Conditions govern your access to and use of the Lexicrone account management platform. By creating an account or using this website, you agree to comply with the terms stated below.</p>
            
            <h4 className="text-slate-900 font-black mt-30 mb-15">1. Platform Purpose</h4>
            <p className="mb-20">Lexicrone provides an online account management system for registered traders and investment participants. The platform allows users to:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Create and manage trader accounts</li>
                <li>Fund investment accounts</li>
                <li>Monitor account activity and balances</li>
                <li>Receive trading updates and reports</li>
            </ul>
            <p className="mb-20">Lexicrone does not guarantee trading profits or fixed returns.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">2. Eligibility</h4>
            <p className="mb-20">By registering on Lexicrone, you confirm that:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>You are at least 18 years old.</li>
                <li>The information you provide is accurate and complete.</li>
                <li>You are legally allowed to participate in investment activities under your local laws.</li>
            </ul>
            <p className="mb-20">Lexicrone reserves the right to refuse or terminate accounts that provide false information.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">3. Account Registration</h4>
            <p className="mb-20">Users must provide:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Full name</li>
                <li>Valid phone number</li>
                <li>Active email address</li>
            </ul>
            <p className="mb-20">You are responsible for maintaining the confidentiality of your login details.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">4. Account Activation Fee</h4>
            <p className="mb-20">A one-time $25 activation fee is deducted from your first funding amount. This fee covers:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Account onboarding</li>
                <li>System setup</li>
                <li>Administrative management</li>
            </ul>
            <p className="mb-20">The activation fee is non-refundable once account setup has been completed.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">5. Funding and Transactions</h4>
            <p className="mb-20">Users may fund their accounts using approved payment methods. All transactions recorded on the platform are considered valid unless proven otherwise. Processing times may vary depending on payment providers. Lexicrone is not responsible for delays caused by third-party payment systems.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">6. Risk Disclosure</h4>
            <p className="mb-20">Trading and investment activities involve financial risk. By using Lexicrone, you acknowledge that:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Profits are not guaranteed.</li>
                <li>Market performance may result in losses.</li>
                <li>Past results do not predict future outcomes.</li>
            </ul>
            <p className="mb-20">You agree that all investment decisions are made at your own discretion.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">7. User Responsibilities</h4>
            <p className="mb-20">You agree not to:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Provide false or misleading information</li>
                <li>Attempt unauthorized access to the platform</li>
                <li>Use the platform for illegal activities</li>
                <li>Interfere with system security or operations</li>
            </ul>
            <p className="mb-20">Violation may result in account suspension or termination.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">8. Account Suspension or Termination</h4>
            <p className="mb-20">Lexicrone may suspend or close accounts if: Terms are violated, Fraudulent activity is suspected, Required verification is not completed. Balances may be reviewed before account closure.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">9. Privacy</h4>
            <p className="mb-20">Your personal information is collected only for account management, communication, and security purposes. Lexicrone does not sell user data to third parties.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">10. Limitation of Liability</h4>
            <p className="mb-20">Lexicrone shall not be held liable for: Trading losses, Market fluctuations, Service interruptions beyond reasonable control, Third-party payment or technical failures.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">11. Changes to Terms</h4>
            <p className="mb-20">Lexicrone may update these Terms and Conditions at any time. Continued use of the platform after updates means you accept the revised terms.</p>

            <h4 className="text-slate-900 font-black mt-30 mb-15">12. Contact Information</h4>
            <p className="mb-20">For questions or support, contact:</p>
            <ul className="mb-20 list-disc ml-20">
                <li>Email: support@lexicrone.com</li>
                <li>Platform: Lexicrone Support Portal</li>
            </ul>
        </>
    );

    return (
        <Wrapper>
            <SEO pageTitle={"Terms & Conditions | Lexicrone Finance"} />
            <HeaderSix style_2={true} />
            <main>
             
                <PolicyArea title="Terms & Conditions" content={content} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default TermsConditions;
