import { useState } from "react";
import useAuthContext from "./useAuthContext"; // Correct import
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext(); // Correct destructuring
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const signUpFn = async (username, password, telegramId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password, telegramId }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return { signUpFn, loading, error, success };
};
