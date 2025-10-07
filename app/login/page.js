"use client";
import { useRouter } from "next/navigation";
import TelegramLoginButton from "react-telegram-login";
import { handleTelegramResponse } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const onAuth = async (user) => {
    const isAuthenticated = await handleTelegramResponse(user);
    if (isAuthenticated) {
      router.push("/"); // Redirect to dashboard on successful login
    } else {
      alert("Authentication failed. You are not the authorized user.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Finance Dashboard Login</h1>
        <p className="text-gray-400 mb-6">Please log in with your Telegram account to continue.</p>
        <TelegramLoginButton
          dataOnauth={onAuth}
          botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
        />
      </div>
    </div>
  );
}