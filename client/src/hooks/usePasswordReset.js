import { useState } from "react";

export const usePasswordReset = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (username, telegramId, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, telegramId, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.message);
      }

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError("Failed to reset password");
    }
  };

  return { resetPassword, loading, error, success };
};
