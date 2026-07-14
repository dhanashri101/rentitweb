import { useEffect, useState } from "react";
import "./App.css";

// Set the actual launch date here.
// Format: YYYY-MM-DDTHH:MM:SS+05:30
const LAUNCH_DATE = new Date("2026-08-14T00:00:00+05:30").getTime();

const calculateTimeLeft = () => {
  const distance = LAUNCH_DATE - Date.now();

  if (distance <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),

    hours: Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    ),

    minutes: Math.floor(
      (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    ),

    seconds: Math.floor(
      (distance % (1000 * 60)) / 1000
    ),
  };
};

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const updateCountdown = () => {
      const updatedTime = calculateTimeLeft();

      setTimeLeft(updatedTime);

      const countdownFinished =
        updatedTime.days === 0 &&
        updatedTime.hours === 0 &&
        updatedTime.minutes === 0 &&
        updatedTime.seconds === 0;

      return countdownFinished;
    };

    updateCountdown();

    const timer = setInterval(() => {
      const finished = updateCountdown();

      if (finished) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
  };

  const formatTime = (number) =>
    String(number).padStart(2, "0");

  return (
    <main className="launch-page">
      <div
        className="texture-layer"
        aria-hidden="true"
      />

      <div className="page-content">
        <section className="content-section">
          <h1 className="main-title">
            <span className="title-lead">We’re</span>

            <span className="title-bold">
              Launching
            </span>

            <span className="title-bold">
              Soon..
            </span>
          </h1>

          <p className="description">
            We&apos;re working hard to bring you
            something amazing.
            <br />
            Get ready for a better way to connect.
          </p>

          <div className="countdown-container">
            <div className="time-block">
              <span className="time-num">
                {formatTime(timeLeft.days)}
              </span>

              <span className="time-txt">
                Days
              </span>
            </div>

            <span className="time-sep">:</span>

            <div className="time-block">
              <span className="time-num">
                {formatTime(timeLeft.hours)}
              </span>

              <span className="time-txt">
                Hrs
              </span>
            </div>

            <span className="time-sep">:</span>

            <div className="time-block">
              <span className="time-num">
                {formatTime(timeLeft.minutes)}
              </span>

              <span className="time-txt">
                Min
              </span>
            </div>

            <span className="time-sep">:</span>

            <div className="time-block">
              <span className="time-num">
                {formatTime(timeLeft.seconds)}
              </span>

              <span className="time-txt">
                Sec
              </span>
            </div>
          </div>

          <p className="signup-text">
            Sign up to be the first to know when we
            launch.
          </p>

          <form
            className="notify-form"
            onSubmit={handleSubmit}
          >
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

            <button
              type="submit"
              className="notify-button"
            >
              Notify Me
            </button>

            {submitted && (
              <p className="success-message">
                Thank you! We&apos;ll notify you when
                we launch.
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