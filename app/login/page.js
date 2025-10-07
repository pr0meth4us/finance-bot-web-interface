"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { handleTelegramResponse } from "@/lib/auth";

/**
 * IMPORTANT:
 * - Set NEXT_PUBLIC_TELEGRAM_BOT_USERNAME in Vercel (without the leading @).
 * - Make sure @BotFather /setdomain is EXACTLY your production host
 *   e.g. finance-bot-web-interface.vercel.app
 * - Test ONLY on that host (not previews/localhost).
 */
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Expose the callback for the Telegram widget.
    // The widget will call window.onTelegramAuth(user)
    window.onTelegramAuth = async (user) => {
      try {
        const ok = await handleTelegramResponse(user);
        if (ok) {
          router.push("/");
        } else {
          alert("Authentication failed. You are not the authorized user.");
        }
      } catch (e) {
        console.error("Telegram auth failed:", e);
        alert("Authentication failed. Please try again.");
      }
    };

    // Optional: quick sanity log so you know the env is present client-side
    // (remove after confirming)
    if (!process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME) {
      console.warn(
        "NEXT_PUBLIC_TELEGRAM_BOT_USERNAME is missing. Set it in Vercel."
      );
    }
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Finance Dashboard Login</h1>
          <p className="text-gray-400 mb-6">
            Please log in with your Telegram account to continue.
          </p>

          {/* The official Telegram Login widget.
             We DO NOT set request_access="write" for now. */}
          <div id="telegram-login-container" />

          <Script
            id="telegram-login-widget"
            src="https://telegram.org/js/telegram-widget.js?22"
            strategy="afterInteractive"
            // Next.js passes data-* props through to the script tag.
            // IMPORTANT: username WITHOUT '@'
            data-telegram-login={
              process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ""
            }
            data-size="large"
            // This tells the widget to call window.onTelegramAuth(user)
            data-onauth="onTelegramAuth"
            // Render into our container div (so it sits in our layout nicely)
            data-container="telegram-login-container"
          />
        </div>
      </div>
    </>
  );
}
