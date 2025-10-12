'use client';

import { useState, useEffect } from 'react';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for session on component mount
        const session = localStorage.getItem('finance-bot-auth');
        if (session) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleAuthSuccess = () => {
        localStorage.setItem('finance-bot-auth', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('finance-bot-auth');
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </main>
        );
    }

    return isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
    ) : (
        <Login onAuthSuccess={handleAuthSuccess} />
    );
}