import React from "react";

function missing() {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-sm-12 ">
          <div className="col-sm-10 col-sm-offset-1  text-center">
            <div>
              <h1 className="text-center ">404</h1>
            </div>

            <div>
              <h3 className="h3">Look like you're lost</h3>

              <p>The page you are looking for is not available!</p>

              <a href="/" className="link_404">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default missing;
