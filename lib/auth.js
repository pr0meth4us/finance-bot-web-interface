export const handleTelegramResponse = async (response) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/telegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (res.ok) {
      // Store a simple session flag in local storage
      localStorage.setItem("finance_bot_auth", "true");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Telegram auth request failed:", error);
    return false;
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("finance_bot_auth") === "true";
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("finance_bot_auth");
  }
};