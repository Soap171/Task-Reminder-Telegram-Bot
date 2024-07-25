import React from "react";

function Hero() {
  return (
    <div className="container-fluid px-4 py-5 my-5 text-center">
      <div className="lc-block mb-4">
        <div editable="rich">
          <h2 className="display-2 fw-bold">
            Remember Task <span className="text-primary">Using Telegram </span>{" "}
            <span className="text-success">Bot</span>
          </h2>
        </div>
      </div>
      <div className="lc-block col-lg-6 mx-auto mb-5">
        <div editable="rich">
          <p className="lead">
            Quickly Remeber your day today task without getting forgetting
            everytime
          </p>
          <p className="lead">
            No need to Sign In or Login Just add your task and get notified
          </p>
        </div>
      </div>

      <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        {" "}
        <a className="btn btn-primary btn-lg px-4 gap-3" href="#" role="button">
          Add Task
        </a>
        <a
          className="btn btn-outline-secondary btn-lg px-4"
          href="#"
          role="button"
        >
          About
        </a>
      </div>
      <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center">
        <img
          className="img-fluid"
          src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/10/undraw_going_up_ttm5.svg"
          width=""
          height="783"
          srcset=""
          sizes=""
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
