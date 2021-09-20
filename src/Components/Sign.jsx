import React, { useState } from "react";
import arrow from "../image/Frame2.png";
import NewHeader from "./NewHeader";
import { NavHashLink } from "react-router-hash-link";
import Footer from "./Footer";
import "./Sign.scss";

const defaultFormState = {
  email: "",
  password: "",
};

const Sign = () => {
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

    var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    tempError.email =
      (!details.email && "The email field is required.") ||
      (!emailRegExp.test(details.email) && "The email field is invalid.");

    tempError.password =
      (!details.password && "The password field is required.") ||
      (!passwordRegExp.test(details.password) &&
        "The password field is invalid.");

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
    <>
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <div className="sign">
          <div className="container">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Sign in to your account</h1>
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
              <div className="inside">
                <div className="text-input">
                  <input
                    className="input"
                    value={details.password}
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <label htmlFor="password" className="input-placeholder">
                    password<span>*</span>
                  </label>
                </div>
                {error && error.password ? (
                  <p className="error-text">{error.password}</p>
                ) : null}
              </div>
              <div className="log">
                <p>forget password?</p>
                <button type="submit" className="btn">
                  Login
                  <span>
                    <img src={arrow} alt="arrow" />
                  </span>
                </button>
              </div>
              {/* <div className="acc"> */}
                <p className="para">
                  Don’t have an account?{" "}
                  <NavHashLink to="/#top" className="btn">
                    Sign Up
                  </NavHashLink>
                </p>
              {/* </div> */}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Sign;
