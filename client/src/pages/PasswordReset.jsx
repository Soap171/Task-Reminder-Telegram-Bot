import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePasswordReset } from "../hooks/usePasswordReset";

function PasswordReset() {
  const { resetPassword, loading, error, success } = usePasswordReset();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [TelegramId, setTelegramId] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await resetPassword(username, TelegramId, password);
    }
    setValidated(true);
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <form
                  className={`row g-3 needs-validation ${
                    validated ? "was-validated" : ""
                  }`}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validated && !username ? "is-invalid" : ""
                        }`}
                        name="telegramid"
                        id="telegramid"
                        placeholder="name@example.com"
                        onChange={(e) => setTelegramId(e.target.value)}
                        required
                      />
                      <label htmlFor="telegramid" className="form-label">
                        Telegram Id
                      </label>
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validated && !username ? "is-invalid" : ""
                        }`}
                        name="username"
                        id="username"
                        placeholder="name@example.com"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <div className="invalid-feedback">
                        Please enter your username.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className={`form-control ${
                          validated && !password ? "is-invalid" : ""
                        }`}
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <div className="invalid-feedback">
                        Please provide new a password.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn bsb-btn-xl btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading
                          ? "Resetting your password..."
                          : "Reset Password"}
                      </button>
                      {error && (
                        <div className="alert alert-danger mt-4" role="alert">
                          {error}
                        </div>
                      )}

                      {success === true && (
                        <div className="alert alert-success mt-4">
                          Password reset successfully.{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <Link
                        to="/login"
                        className="link-secondary text-decoration-none"
                      >
                        Back To Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PasswordReset;
