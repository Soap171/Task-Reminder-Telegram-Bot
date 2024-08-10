import React, { useState } from "react";
import logoImg from "../images/Logo_trans.png";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const { signUpFn, error, loading, success } = useSignUp();
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
      await signUpFn(username, password, TelegramId);
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
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <div className="text-center mb-4">
                        <a href="#!">
                          <img
                            src={logoImg}
                            alt="Logo"
                            width="175"
                            height="130"
                          />
                        </a>
                      </div>
                      <h4 className="text-center">
                        Start to Remind your Tasks
                      </h4>
                    </div>
                  </div>
                </div>
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
                        Password
                      </label>
                      <div className="invalid-feedback">
                        Please provide a password.
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
                          ? "Creating account..."
                          : "Create a new account"}
                      </button>
                      {error && (
                        <div className="alert alert-danger mt-4" role="alert">
                          {error}
                        </div>
                      )}

                      {success === true && (
                        <div className="alert alert-success mt-4">
                          Registered
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
                        to="#"
                        className="link-secondary text-decoration-none"
                      >
                        Forget Password
                      </Link>
                      <Link
                        to="/login"
                        className="link-secondary text-decoration-none"
                      >
                        Login
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

export default SignUp;
