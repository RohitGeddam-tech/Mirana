import React, { useState } from "react";
import fb from "../image/fb1.png";
import tweet from "../image/twitter.png";
import insta from "../image/insta1.png";
import arrow from "../image/Frame2.png";
import "./Footer.scss";

const defaultFormState = {
  email: "",
};

const Footer = () => {
  const [details, setDetails] = useState({ ...defaultFormState });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const tempDetails = { ...details },
      tempError = { ...error };
    tempDetails[e.target.name] = e.target.value;
    tempError[e.target.name] = "";
    setDetails(tempDetails);
    setError(tempError);
  };

  const validateForm = () => {
    const tempError = { ...error };
    var emailRegExp =
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    tempError.email =
      (!details.email && "The email field is required.") ||
      (!emailRegExp.test(details.email) && "The email field is invalid.");

    setError(tempError);
    return Object.values(tempError).some((val) => val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const errorExist = validateForm();
    if (!errorExist) {
      console.log(details);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="foot">
      <div className="container">
        <div className="up">
          <div className="connect">
            <p>Connect with us:</p>
            <div className="icons">
              <img src={fb} alt="fb" />
              <img src={tweet} alt="tweet" />
              <img src={insta} alt="insta" />
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <p>Newsletter sign up</p>
            <div className="inside">
              <div className="text-input">
                <input
                  className="input"
                  value={details.email}
                  name="email"
                  onChange={handleChange}
                />
                <label htmlFor="email" className="input-placeholder">
                  Email<span>*</span>
                </label>
              </div>
              {error && error.email ? (
                <p className="error-text">{error.email}</p>
              ) : null}
            </div>
            <button type="submit" className="btn">
              Subscribe
              <span>
                <img src={arrow} alt="arrow" />
              </span>
            </button>
          </form>
        </div>
        <div className="divider"></div>
        <div className="last">
          <p>Read Terms & Conditions</p>
          <p>© 2021 Mirana Resort. All Rights Reserved.</p>
          <p>Website by Sugarlogger Technologies Pvt. Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
