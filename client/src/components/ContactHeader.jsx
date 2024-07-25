import React from "react";

function ContactHeader() {
  return (
    <div className="container py-5 mb-4 bg-light rounded-3 ">
      <div className="p-5 mb-4 lc-block">
        <div className="lc-block">
          <div editable="rich">
            <h2 className="fw-bolder display-3">Question ?</h2>
          </div>
        </div>
        <div className="lc-block col-md-8">
          <div editable="rich">
            <p className="lead">
              If you have any question or suggestion regarding this application
              please feel free to contact me. I'll contact you as soon as
              possible
            </p>
          </div>
        </div>
        <div className="lc-block">
          <a className="btn btn-primary" href="#" role="button">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
