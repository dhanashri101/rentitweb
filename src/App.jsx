import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
  };

  return (
    <main className="launch-page">
      <div className="texture-layer" aria-hidden="true" />

      <div className="page-content">
        <section className="content-section">
          <h1 className="main-title">
            <span className="title-lead">We’re</span>
            <span className="title-bold">Launching</span>
            <span className="title-bold">Soon..</span>
          </h1>

          <p className="description">
            We&apos;re working hard to bring you something amazing.
            <br />
            Get ready for a better way to connect.
          </p>

          <p className="signup-text">
            Sign up to be the first to know when we launch.
          </p>

          <form className="notify-form" onSubmit={handleSubmit}>
            <label className="email-field">
              <svg
                className="mail-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6.75H20V17.25H4V6.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                <path
                  d="M4.5 7.5L10.75 12.15C11.49 12.7 12.51 12.7 13.25 12.15L19.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="E-mail"
                aria-label="Email address"
                required
              />
            </label>

            <button type="submit" className="notify-button">
              Notify Me
            </button>

            {submitted && (
              <p className="success-message">
                Thank you! We&apos;ll notify you when we launch.
              </p>
            )}
          </form>
        </section>

        <section className="illustration-section">
          <img
            src="/illustration.png"
            alt="Website launch illustration"
            className="launch-illustration"
          />
        </section>
      </div>
    </main>
  );
}

export default App;