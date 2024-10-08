import React, { useState } from "react";
import logoImg from "../images/Login-Sign.png";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const { login, error, loading, success } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await login(username, password);
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
                            width="200"
                            height="130"
                          />
                        </a>
                      </div>
                      <h4 className="text-center text-muted">
                        Welcome back you've been missed!
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
                        name="username"
                        id="username"
                        placeholder="user123"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="email" className="form-label">
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
                        {loading ? "Logging" : "Login"}
                      </button>
                      {error && (
                        <div className="alert alert-danger mt-4" role="alert">
                          {error}
                        </div>
                      )}

                      {success === true && (
                        <div className="alert alert-success mt-4">
                          Logged In
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
                        to="/signup"
                        className="link-secondary text-decoration-none"
                      >
                        Create new account
                      </Link>
                      <Link
                        to="/reset-password"
                        className="link-secondary text-decoration-none"
                      >
                        Forgot password
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

export default Login;
