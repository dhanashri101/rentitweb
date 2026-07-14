import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 1. LAZY INITIALIZER: This function runs immediately before the screen paints.
  // It guarantees the timer starts at the exact saved time with no "flashing" or resetting.
  const [timeLeft, setTimeLeft] = useState(() => {
    let savedTargetDate = localStorage.getItem("myLaunchDate");

    if (!savedTargetDate) {
      savedTargetDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("myLaunchDate", savedTargetDate.toString());
    } else {
      savedTargetDate = parseInt(savedTargetDate, 10);
    }

    const distance = savedTargetDate - new Date().getTime();

    if (distance > 0) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  });

  // 2. The interval simply keeps updating the clock every second based on that saved date.
  useEffect(() => {
    const savedTargetDate = parseInt(localStorage.getItem("myLaunchDate"), 10);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = savedTargetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const formatTime = (num) => (num < 10 ? `0${num}` : num);

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

          <div className="countdown-container">
            <div className="time-block">
              <span className="time-num">{formatTime(timeLeft.days)}</span>
              <span className="time-txt">Days</span>
            </div>
            <span className="time-sep">:</span>
            <div className="time-block">
              <span className="time-num">{formatTime(timeLeft.hours)}</span>
              <span className="time-txt">Hrs</span>
            </div>
            <span className="time-sep">:</span>
            <div className="time-block">
              <span className="time-num">{formatTime(timeLeft.minutes)}</span>
              <span className="time-txt">Min</span>
            </div>
            <span className="time-sep">:</span>
            <div className="time-block">
              <span className="time-num">{formatTime(timeLeft.seconds)}</span>
              <span className="time-txt">Sec</span>
            </div>
          </div>

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