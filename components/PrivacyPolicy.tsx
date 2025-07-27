// PrivacyPolicy.tsx (now located at the project root)

import React from 'react';
// import Header from './src/components/Header'; // REMOVE
// import Footer from './src/components/Footer'; // REMOVE
// import { Helmet } from 'react-helmet-async'; // REMOVE Helmet import

function PrivacyPolicy() {
    const pageTitle = "Privacy Policy - TimeCraft"; // This title is now primarily for browser tab, etc.
    const pageDescription = "Understand how TimeCraft collects, uses, and protects your data. Read our comprehensive Privacy Policy.";
    const lastUpdatedDate = "2024-07-28"; // Placeholder, update this value
    const contactEmail = "support@timecraft.com"; // Placeholder, update this value

    return (
        <>
            {/* <Helmet> REMOVE
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href="https://timing-five.vercel.app/privacy" />
            </Helmet> */}
            <div className="flex flex-col"> {/* min-h-screen is handled by layout, flex flex-col is still relevant */}
                {/* Header component is rendered in app/layout.tsx */}

                <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 prose">
                    <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]">{pageTitle.replace(' - TimeCraft', '')}</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">1. Introduction</h2>
                        <p>Your privacy is important to us. This Privacy Policy explains how Timing-Five collects, uses, discloses, and safeguards your information when you visit our website, https://timing-five.vercel.app/, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Website").</p>
                        {/* Define "We," "You," "Data," etc. */}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">2. Information We Collect</h2>
                        <h3 className="text-xl font-medium mb-3 text-[var(--text-color)]">a. Personally Identifiable Information</h3>
                        <p>We may collect your name, email address, profile picture, and other similar information that you voluntarily provide to us when you register with the site or when you choose to participate in activities such as online Q&A or newsletter subscriptions.</p>
                        {/* Specify exactly what PII you collect, e.g., from Google Sign-In */}
                        <h3 className="text-xl font-medium mb-3 text-[var(--text-color)]">b. Non-Personally Identifiable Information</h3>
                        <p>We may automatically collect certain information when you use the Website, such as your IP address, browser type, operating system, device information, pages visited, and usage patterns. This may be collected through cookies and similar technologies.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">3. How We Use Your Information</h2>
                        <p>We use the information collected to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Provide, operate, and maintain our Website.</li>
                            <li>Improve, personalize, and expand our Website.</li>
                            <li>Understand and analyze how you use our Website.</li>
                            <li>Develop new products, services, features, and functionality.</li>
                            <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the Website, and for marketing and promotional purposes.</li>
                            <li>Process your transactions.</li>
                            <li>Detect and prevent fraud.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">4. Cookies and Tracking Technologies</h2>
                        <p>We may use cookies, web beacons, and other tracking technologies to collect information about your browsing activity. You can manage your cookie preferences through your browser settings.</p>
                        {/* Explain what cookies you use and why */}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">5. Data Security</h2>
                        <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">6. Third-Party Services</h2>
                        <p>We may use third-party services that have their own privacy policies, such as Google Analytics for usage tracking or Firebase for authentication.</p>
                        {/* Mention Firebase Auth and Google Analytics if used */}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">7. Your Data Protection Rights</h2>
                        <p>Depending on your location, you may have rights regarding your personal data, such as the right to access, correct, or delete your information. Contact us to exercise these rights.</p>
                        {/* Detail rights based on GDPR, CCPA, etc., if applicable */}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">8. Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        {/* How you will notify users */}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">9. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at {contactEmail}.</p>
                    </section>

                    <p className="text-sm text-slate-500 italic">Last Updated: {lastUpdatedDate}</p>

                </main>
                {/* Footer component is rendered in app/layout.tsx */}
            </div>
        </>
    );
}

export default PrivacyPolicy;