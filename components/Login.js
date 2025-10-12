'use client';
import { useEffect, useState } from 'react';

const Login = ({ onAuthSuccess }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Define the callback function that Telegram will call
        window.onTelegramAuth = async (user) => {
            try {
                setIsLoading(true);
                setError('');

                console.log('Telegram auth callback received:', user);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-telegram`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    }
                );

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Authentication failed');
                }

                const data = await res.json();
                console.log('Backend verification successful:', data);

                // If backend verification is successful, call the parent callback
                onAuthSuccess();
            } catch (err) {
                console.error('Verification error:', err);
                setError(`Login failed: ${err.message}. Please try again.`);
            } finally {
                setIsLoading(false);
            }
        };

        // Create and append the Telegram script to the document
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        // The problematic 'data-request-access' attribute has been removed.

        const container = document.getElementById('telegram-login-container');
        if (container) {
            container.appendChild(script);
        }

        // Add error handler for script loading
        script.onerror = () => {
            setError('Failed to load Telegram widget. Please refresh the page.');
        };

        return () => {
            // Clean up script on component unmount
            delete window.onTelegramAuth;
            const container = document.getElementById('telegram-login-container');
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [onAuthSuccess]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-3xl font-bold mb-2">Finance Dashboard</h1>
                <p className="text-gray-400 mb-6">Please log in with Telegram to continue</p>

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : (
                    <div id="telegram-login-container" className="flex justify-center"></div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <div className="mt-6 text-xs text-gray-500 space-y-2">
                    <p>Make sure you have Telegram installed and are logged in.</p>
                    <p>Click the button above to authenticate via Telegram.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;