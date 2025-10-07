// lib/auth.js

/**
 * Sends Telegram user payload to your Flask backend for signature verification.
 *
 * Required env:
 * - NEXT_PUBLIC_API_URL (e.g. https://your-koyeb-app.koyeb.app)
 */
export const handleTelegramResponse = async (telegramUserPayload) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // You can include credentials if you plan to set server cookies:
        // credentials: "include",
        body: JSON.stringify(telegramUserPayload),
      }
    );

    if (res.ok) {
      // Minimal client-side flag for your private route guard
      localStorage.setItem("finance_bot_auth", "true");
      return true;
    }

    // Optional: surface backend error text to help debugging
    const err = await res.json().catch(() => ({}));
    console.warn("Telegram auth backend responded with:", err);
    return false;
  } catch (error) {
    console.error("Telegram auth request failed:", error);
    return false;
  }
};
