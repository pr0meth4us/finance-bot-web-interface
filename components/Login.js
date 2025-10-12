'use client';
import { useEffect, useState } from 'react';

const Login = ({ onAuthSuccess }) => {
    const [error, setError] = useState('');

    useEffect(() => {
        // Define the callback function that Telegram will call
        window.onTelegramAuth = async (user) => {
            try {
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

                // If backend verification is successful, call the parent callback
                onAuthSuccess();
            } catch (err) {
                console.error('Verification error:', err);
                setError('Login failed. Please try again.');
            }
        };

        // Create and append the Telegram script to the document
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        // The 'data-request-access' attribute has been removed.

        document.getElementById('telegram-login-container').appendChild(script);

        return () => {
            // Clean up script on component unmount
            const container = document.getElementById('telegram-login-container');
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [onAuthSuccess]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-2">Finance Dashboard</h1>
                <p className="text-gray-400 mb-6">Please log in to continue</p>
                <div id="telegram-login-container"></div>
                {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Login;