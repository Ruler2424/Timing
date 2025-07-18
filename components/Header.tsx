import React, { useState } from 'react';
import { LogoIcon } from './icons.tsx';
import { useAuth } from '../hooks/useAuth.ts';

interface HeaderProps {
    onUpgradeClick: () => void;
}

const Header = ({ onUpgradeClick }: HeaderProps) => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <LogoIcon className="text-[var(--text-color)]" />
                    <span className="text-xl font-bold text-[var(--text-color)]">TimeCraft</span>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="font-medium border-b-2 border-[var(--text-color)] pb-1" style={{ color: 'var(--text-color)' }}>Home</a>
                        <a href="#" className="text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors">Settings</a>
                        <a href="#" className="text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors">Help</a>
                    </nav>
                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.role === 'free' ? (
                                <button
                                    onClick={onUpgradeClick}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                                >
                                    Upgrade
                                </button>
                            ) : (
                                <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full">PRO</span>
                            )}
                            <div className="relative">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 focus:outline-none" aria-haspopup="true" aria-expanded={isMenuOpen} aria-label="User menu">
                                    <img 
                                        src={user.firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firebaseUser.displayName || 'U')}&background=random&color=fff`} 
                                        alt="User avatar" 
                                        className="w-8 h-8 rounded-full bg-slate-400" 
                                     />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-[var(--card-bg-color)] border border-slate-200 dark:border-slate-600 rounded-md shadow-lg py-1 z-50" role="menu">
                                        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-600">
                                            <p className="text-sm font-semibold text-[var(--text-color)] truncate" title={user.firebaseUser.displayName || 'User'}>{user.firebaseUser.displayName || 'User'}</p>
                                            <p className="text-xs text-[var(--text-muted-color)] truncate" title={user.firebaseUser.email || ''}>{user.firebaseUser.email}</p>
                                        </div>
                                        <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-[var(--text-muted-color)] hover:bg-slate-100 dark:hover:bg-slate-600" role="menuitem">
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
