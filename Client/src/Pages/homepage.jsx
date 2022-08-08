import React from "react";

function Homepage() {
  return (
    <div className="h-100 p-2  homepage">
      <div className="d-flex flex-column h-100 justify-content-center p-5">
        <h1 className="text-light">
          Enabling Smarter Commodity Price Decisions with AI
        </h1>
        <p className="text-light">
          AI Forecast helps you with high quality forecasts to enable better
          &amp; faster price decisions
        </p>
        <a className="theme-btn" href="/form/login">
          <span>Sign-Up</span>
        </a>
      </div>
    </div>
  );
}

export default Homepage;
