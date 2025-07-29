'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../lib/firebase';
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    User as FirebaseUser,
} from "firebase/auth";

type UserRole = 'free' | 'pro';

export interface AuthUser {
    firebaseUser: FirebaseUser;
    role: UserRole;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                // User is signed in. Check for a persisted role in localStorage.
                const storedRole = localStorage.getItem(`userRole_${firebaseUser.uid}`) as UserRole;
                const role = storedRole || 'free';
                setUser({ firebaseUser, role });
            } else {
                // User is signed out.
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // onAuthStateChanged will handle setting the user state.
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            // onAuthStateChanged will set the user to null.
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const upgradeToPro = () => {
        if (user) {
            const proUser: AuthUser = { ...user, role: 'pro' };
            // Persist the pro role in localStorage against the user's UID.
            localStorage.setItem(`userRole_${user.firebaseUser.uid}`, 'pro');
            setUser(proUser);
        } else {
            // This case should ideally not be hit if the UI prompts to sign in first.
            console.log("User must be signed in to upgrade.");
        }
    };

    const value = { user, loading, signInWithGoogle, signOut, upgradeToPro };

    return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
