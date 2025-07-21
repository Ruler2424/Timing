
import React from 'react';
import Header from './components/Header'; // Assuming Header is in ../components
import Footer from './components/Footer'; // Assuming Footer is in ../components

function TermsOfUse() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 prose"> {/* 'prose' class from Tailwind CSS for styling text */}
                <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]">Terms of Use</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">1. Introduction</h2>
                    <p>Welcome to Timing-Five! These Terms of Use govern your access to and use of our website, applications, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not access or use the Services.</p>
                    {/* Add more introductory text, define "Services," etc. */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">2. Acceptance of Terms</h2>
                    <p>By accessing or using the Services, you affirm that you are of legal age to enter into these Terms, or you have reviewed these Terms with your parent or guardian and they agree to be bound by these Terms.</p>
                    {/* Details about agreement, age requirements */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">3. Use of Services</h2>
                    <h3 className="text-xl font-medium mb-3 text-[var(--text-color)]">a. User Accounts</h3>
                    <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                    <h3 className="text-xl font-medium mb-3 text-[var(--text-color)]">b. Permitted Uses</h3>
                    <p>You may use the Services for your personal, non-commercial purposes. You agree not to misuse the Services or assist others in misusing them.</p>
                    <h3 className="text-xl font-medium mb-3 text-[var(--text-color)]">c. Prohibited Conduct</h3>
                    <p>Include a list of prohibited actions (e.g., illegal activities, harassment, infringing intellectual property, attempting to hack, etc.).</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">4. Intellectual Property</h2>
                    <p>All content, features, and functionality available through the Services, including text, graphics, logos, icons, images, and software, are the exclusive property of Timing-Five and are protected by intellectual property laws.</p>
                    {/* Details about ownership, trademarks, copyrights */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">5. User-Generated Content</h2>
                    <p>If your service allows users to submit content, you need a section on ownership, licenses granted, and acceptable content.</p>
                    {/* If not applicable, you can omit this or state it */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">6. Modifications to Services and Terms</h2>
                    <p>We reserve the right to modify or discontinue the Services, or any part thereof, without notice. We also reserve the right to amend these Terms at any time.</p>
                    {/* How you will notify users of changes */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">7. Disclaimers and Limitation of Liability</h2>
                    <p>The Services are provided "as is" and "as available" without any warranties. Timing-Five shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                    {/* Crucial legal disclaimers */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">8. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., the State of California, without regard to its conflict of law provisions].</p>
                    {/* Specify your governing law */}
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">9. Contact Information</h2>
                    <p>If you have any questions about these Terms, please contact us at [Your Email Address or Contact Link].</p>
                </section>

                <p className="text-sm text-slate-500 italic">Last Updated: [Date]</p>
                {/* Update the date */}

            </main>
        </div>
    );
}

export default TermsOfUse;