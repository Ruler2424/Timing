import React from 'react';

interface SubscriptionModalProps {
    onClose: () => void;
    onUpgrade: () => void;
}

function FeatureListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <span>{children}</span>
        </li>
    );
}

function SubscriptionModal({ onClose, onUpgrade }: SubscriptionModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full m-4 relative text-slate-800">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h2 className="text-3xl font-bold text-center mb-2">Go Pro</h2>
                <p className="text-center text-slate-500 mb-6">Unlock all features and enhance your productivity.</p>
                
                <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-lg">Pro plan includes:</h3>
                    <ul className="space-y-2 text-slate-600">
                        <FeatureListItem>Ad-free experience</FeatureListItem>
                        <FeatureListItem>Additional themes (Dark, Blue, etc.)</FeatureListItem>
                        <FeatureListItem>Export statistics (CSV, PDF)</FeatureListItem>
                        <FeatureListItem>Custom sound packs</FeatureListItem>
                        <FeatureListItem>Priority support</FeatureListItem>
                    </ul>
                </div>
                
                <div className="text-center">
                    <button 
                        onClick={onUpgrade}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
                    >
                        Upgrade Now - $4.99/month
                    </button>
                    <p className="text-xs text-slate-400 mt-2">You can cancel anytime.</p>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionModal;