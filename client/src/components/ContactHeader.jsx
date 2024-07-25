import React from "react";
import { Link } from "react-router-dom";

function ContactHeader() {
  return (
    <div className="container py-5 mb-4 bg-light rounded-3 ">
      <div className="p-5 mb-4 shadow-lg">
        <div>
          <h2 className="fw-bolder display-3 ">Question ?</h2>
        </div>
        <div className="lc-block col-md-8">
          <p className="lead">
            If you have any question or suggestion regarding this application
            please feel free to contact me. I'll contact you as soon as possible
          </p>
        </div>
        <div>
          <Link className="btn btn-primary" to="contact">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
