import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

function SocialLine() {
  return (
    <div className="container-fluid py-2" id="contact">
      <div className="row text-center">
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <BsFacebook size={75} />
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <BsLinkedin size={75} />
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <BsWhatsapp size={75} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLine;
