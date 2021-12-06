import React, { useState, useEffect } from "react";
import arrow from "../image/Frame2.png";
import axios from "axios";
import { Modal } from "@material-ui/core";

const Form = ({ className = "" }) => {
  // const [details, setDetails] = useState({ ...defaultFormState });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [fnameInvalid, setFnameInvalid] = useState(false);
  const [lnameInvalid, setLnameInvalid] = useState(false);
  const [mobileInvalid, setMobileInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [textInvalid, setTextInvalid] = useState(false);
  const [cityInvalid, setCityInvalid] = useState(false);
  const [form, setForm] = useState({});
  const [validity, setValidity] = useState(false);
  const [success, setSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [error, setError] = useState({});

  const handleChange = (e) => {
    // console.log("e value", e);
    switch (e.target.name) {
      case "fname":
        setFname(e.target.value);
        setFnameInvalid(!e.target.validity.valid);
        break;
      case "lname":
        setLname(e.target.value);
        setLnameInvalid(!e.target.validity.valid);
        break;
      case "mobile":
        setMobile(e.target.value);
        setMobileInvalid(!e.target.validity.valid);
        break;
      case "email":
        setEmail(e.target.value);
        setEmailInvalid(!e.target.validity.valid);
        break;
      case "text":
        setText(e.target.value);
        // setTextInvalid(textchange());
        setTextInvalid(!e.target.validity.valid);
        break;
      case "city":
        setCity(e.target.value);
        setCityInvalid(!e.target.validity.valid);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setMobileInvalid(true);
    }
    if (
      !(
        fnameInvalid &&
        lnameInvalid &&
        textInvalid &&
        mobileInvalid &&
        emailInvalid
      ) &&
      mobile.length === 10
    ) {
      setValidity(true);
      setForm({
        first_name: fname,
        last_name: lname,
        mobile: mobile,
        email: email,
        message: text,
      });
      setBtnLoading(true);
      console.log(form);
    } else {
      setValidity(false);
    }
  };

  useEffect(() => {
    if (validity) {
      axios
        .post(`${process.env.REACT_APP_PUBLIC_URL}/contact-us`, form)
        .then((res) => {
          if (res) {
            console.log("response msg", res);
            setBtnLoading(false);
            setSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setBtnLoading(false);
        });
    }
  }, [form, validity]);

  const [clicked, setClicked] = useState(false);

  className += ` textfield ${text ? "has-value" : ""}`;

  return (
    <>
      <form className="modal" onSubmit={handleSubmit}>
        <div className="alignHeading">
          <h2>Contact Us</h2>
          <p>
            Your perfect stay is our responsibility. To ensure perfection, we’d
            like to be involved in crafting your experience, plan along with
            you. Give us a shout to discover your options at Mirana.
          </p>
        </div>
        <div className="inputFlex">
          <div className="text-input">
            <input
              value={fname}
              className="input"
              name="fname"
              pattern="^([A-Za-z ,.'`-]{2,30})$"
              onChange={handleChange}
              type="text"
              required
            />
            <label htmlFor="fname" className="input-placeholder">
              First name<span>*</span>
            </label>
            {fnameInvalid ? (
              <p className="error-text">Please provide a valid first-name</p>
            ) : null}
          </div>
          <div className="text-input">
            <input
              value={lname}
              className="input"
              name="lname"
              onChange={handleChange}
              pattern="^([A-Za-z ,.'`-]{2,30})$"
              type="text"
              required
            />
            <label htmlFor="lname" className="input-placeholder">
              Last name<span>*</span>
            </label>
            {lnameInvalid ? (
              <p className="error-text">Please provide a valid last-name</p>
            ) : null}
          </div>
        </div>
        <div className="text-input">
          <input
            className="input"
            value={email}
            name="email"
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
            type="email"
            required
          />
          <label htmlFor="email" className="input-placeholder">
            Email<span>*</span>
          </label>
        </div>
        {emailInvalid ? (
          <p className="error-text">Please provide a valid email Id</p>
        ) : null}
        <div className="text-input">
          <input
            value={mobile}
            type="number"
            className="input"
            name="mobile"
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <label htmlFor="mobile" className="input-placeholder">
            Mobile No.<span>*</span>
          </label>
        </div>
        {mobileInvalid ? (
          <p className="error-text">Please provide a valid mobile no.</p>
        ) : null}
        {/* <div className="text-input">
          <input
            value={city}
            className="input"
            name="city"
            onChange={handleChange}
            type="text"
            pattern="^([A-Za-z ,.'`-]{2,30})$"
            required
          />
          <label htmlFor="city" className="input-placeholder">
            City
          </label>
          {cityInvalid ? (
            <p className="error-text">Please provide a valid City Name</p>
          ) : null}
        </div> */}
        <div className="text-input">
          <textarea
            className={className}
            value={text}
            name="text"
            onChange={handleChange}
            onClick={() => setClicked(!clicked)}
            type="text"
            // pattern="^([A-Za-z0-9 ,.'`-]{10,200})$"
            minLength="10"
            required
          />
          <label htmlFor="message" className="input-placeholder">
            Write your message here*
          </label>
          {textInvalid ? (
            <p className="error-text">
              Please provide a minimum of 10 characters
            </p>
          ) : null}
        </div>
        <div className="bottom">
          <button type="submit" className="btn" disabled={btnLoading}>
            {btnLoading ? (
              "Sending..."
            ) : (
              <>
                Send
                <span>
                  <img src={arrow} alt="arrow" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
      <Modal
        className="modal"
        open={success}
        onClose={() => {
          setSuccess(false);
        }}
      >
        <div className="box">
          <h1>Thank you</h1>
          <p>
            Thank you for your interest. Our team will get in touch with you
            soon.
          </p>
          <button className="btn" onClick={() => setSuccess(false)}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Form;
