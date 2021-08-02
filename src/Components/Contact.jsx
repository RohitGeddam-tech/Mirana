import React from "react";
import "./Contact.scss";
import loc from "../image/loc.png";
import call from "../image/call1.png";
import Form from "./Form";

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <Form />
        <div className="right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2564413117807!2d72.90903941442745!3d18.607531971366303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be871be1472e061%3A0x9e751c9e3a240814!2sSamira%20Palms%20East%20Gate!5e0!3m2!1sen!2sin!4v1626965349868!5m2!1sen!2sin"
            width="100%"
            height="300"
            title="Map"
            style={{border:'none', borderRadius:"8px", paddingTop:"50px"}}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="footer">
            <div className="box">
              <h1>
                <span>
                  <img src={loc} alt="" />
                </span>{" "}
                Address :
              </h1>
              <a href="https://goo.gl/maps/bSMw2mhFQLpANHBR6">
                Plot 1648/3/1, Samira Palms, Nagaon Bunder Road, Nagaon Alibag,
                Raigad District, Maharashtra – 402204
              </a>
            </div>
            <div className="box">
              <h1>
                <span>
                  <img src={call} alt="" />
                </span>{" "}
                Call us at :
              </h1>
              <div className="inbox">
                <a href="tel:+919820347152">Rajeev: +91 9820347152</a>
                <a href="tel:+919970266970">Jiten: +91 9970266970</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
