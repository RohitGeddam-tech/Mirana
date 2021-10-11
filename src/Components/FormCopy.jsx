import React, { useState, useEffect } from "react";
import arrow from "../image/Frame2.png";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
  const [formEmpty, setFormEmpty] = useState(false);
  // const [error, setError] = useState({});

  const textchange = () => {
    if (text.split(" ").length < 10) {
      setTextInvalid(true);
    } else {
      setTextInvalid(false);
    }
  };

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
    if (Object.values(form).every((each) => each === "")) {
      setFormEmpty(true);
      setValidity(false);
    } else {
      setFormEmpty(false);
    }
    if (
      !(
        fnameInvalid ||
        lnameInvalid ||
        textInvalid ||
        cityInvalid ||
        mobileInvalid ||
        emailInvalid
      )
    ) {
      setValidity(true);
      setForm({
        first_name: fname,
        last_name: lname,
        mobile: mobile,
        email: email,
        message: text,
      });
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
            setFormEmpty(false);
            setSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err);
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
        <div className="text-input">
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
        </div>
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
          <button type="submit" className="btn">
            Send
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </div>
        {formEmpty ? (
          <p className="error-text">Please fill in the form</p>
        ) : null}
        <Modal
          isOpen={success}
          onRequestClose={() => setSuccess(false)}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          className="modal"
        >
          <p>Thanks we will be contacting you soon</p>
        </Modal>
      </form>
    </>
  );
};

export default Form;
