// TermsOfUse.tsx (now located at the project root)

import React from 'react';
// import Header from './src/components/Header'; // REMOVE
// import Footer from './src/components/Footer'; // REMOVE
// import { Helmet } from 'react-helmet-async'; // REMOVE Helmet import

function TermsOfUse() {
    const pageTitle = "Terms of Use - TimeCraft";
    const pageDescription = "Read the Terms of Use for TimeCraft, governing your access and use of our time management tools.";
    const lastUpdatedDate = "2024-07-28";
    const contactEmail = "support@timecraft.com";

    return (
        <>
            {/* <Helmet> REMOVE
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href="https://timing-five.vercel.app/terms" />
            </Helmet> */}
            <div className="flex flex-col text-[var(--text-color)]"> {/* min-h-screen handled by layout */}
                {/* Header component is rendered in app/layout.tsx */}

                <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 prose">
                    <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]">{pageTitle.replace(' - TimeCraft', '')}</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">1. Acceptance of Terms</h2>
                        <p className="text-[var(--text-color)]">
                            Welcome to Timing-Five. These Terms of Use ("Terms") govern your access to and use of the Timing-Five website,
                            https://timing-five.vercel.app/ (the "Website"), and any related services, features, or content. By accessing or
                            using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms,
                            you must not access or use the Website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">2. Use of the Website</h2>
                        <p className="text-[var(--text-color)]">
                            You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-[var(--text-color)]">
                            <li>Use the Website in any way that violates any applicable federal, state, local, or international law or regulation.</li>
                            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by us, may harm Timing-Five or users of the Website.</li>
                            <li>Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website.</li>
                            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
                            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">3. Intellectual Property</h2>
                        <p className='text-[var(--text-color)]'>
                            The Website and its original content, features, and functionality are and will remain the exclusive property of Timing-Five and its licensors. The Website is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Timing-Five.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">4. User Accounts</h2>
                        <p className='text-[var(--text-color)]'>
                            If you create an account on the Website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">5. Links to Other Websites</h2>
                        <p className='text-[var(--text-color)]'>
                            Our Website may contain links to third-party web sites or services that are not owned or controlled by Timing-Five.
                        </p>
                        <p className='text-[var(--text-color)]'>
                            Timing-Five has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Timing-Five shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                        </p>
                        <p className='text-[var(--text-color)]'>
                            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">6. Disclaimer of Warranties</h2>
                        <p className='text-[var(--text-color)]'>
                            The Website is provided "as is" and "as available" without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                        </p>
                        <p className='text-[var(--text-color)]'>
                            Timing-Five does not warrant that the Website will be uninterrupted, error-free, or that any defects will be corrected. Timing-Five does not warrant that the Website or the server that makes it available are free of viruses or other harmful components.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">7. Limitation of Liability</h2>
                        <p className='text-[var(--text-color)]'>
                            In no event shall Timing-Five, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Website; (ii) any conduct or content of any third party on the Website; (iii) any content obtained from the Website; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">8. Governing Law</h2>
                        <p className='text-[var(--text-color)]'>
                            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Timing-Five is based, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">9. Changes to Terms</h2>
                        <p className='text-[var(--text-color)]'>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                        <p className='text-[var(--text-color)]'>
                            By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">10. Contact Us</h2>
                        <p className='text-[var(--text-color)]'>
                            If you have any questions about these Terms, please contact us at {contactEmail}.
                        </p>
                    </section>

                    <p className="text-sm text-slate-500 italic">Last Updated: {lastUpdatedDate}</p>

                </main>

                {/* Footer component is rendered in app/layout.tsx */}
            </div>
        </>
    );
}

export default TermsOfUse;