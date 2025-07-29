// components/ProWidgetWrapper.tsx
'use client'
import React from 'react';
import { LockIcon } from './icons';

interface ProWidgetWrapperProps {
    children: React.ReactNode;
    isPro: boolean;
    onUpgradeClick: () => void;
    widgetTitle: string; // New prop for the widget title
}

const ProWidgetWrapper: React.FC<ProWidgetWrapperProps> = ({ children, isPro, onUpgradeClick, widgetTitle }) => {
    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div
            className="relative rounded-2xl shadow-lg h-64 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
            onClick={onUpgradeClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onUpgradeClick() }}
        >
            {/* Blurred and desaturated original widget */}
            <div className="absolute inset-0 blur-sm grayscale select-none -m-2 pointer-events-none">
                {children}
            </div>

            {/* Darkened overlay with upgrade prompt */}
            <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-900/70 flex items-center justify-center transition-colors duration-300 group-hover:bg-slate-300/60 dark:group-hover:bg-slate-900/80">
                <div className="text-center p-5 bg-[var(--card-bg-color)]/90 backdrop-blur-sm rounded-xl shadow-xl border border-black/10">
                    <LockIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500 animate-bounce" />

                    {/* Explicitly state it's PRO */}
                    <h4 className="text-lg font-bold text-yellow-500 mb-1">PRO Feature</h4>

                    {/* Formulate title using the new widgetTitle prop */}
                    {widgetTitle && (
                        <p className="text-lg font-bold text-white mb-2 truncate" title={`Unlock ${widgetTitle}`}>
                            Unlock {widgetTitle}
                        </p>
                    )}

                    <p className="text-sm text-white group-hover:underline">Click to upgrade</p>
                 </div>
            </div>
        </div>
    );
};

export default ProWidgetWrapper;