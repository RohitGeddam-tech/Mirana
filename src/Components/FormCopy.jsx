import React, { useState, useEffect } from "react";
import arrow from "../image/Frame2.png";
import axios from "axios";
import { Modal } from "@material-ui/core";
import moment from "moment";

const Form = ({
  className = "",
  date1,
  date2,
  pack,
  guest,
  room,
  setOpen,
  amount,
  id,
}) => {
  // const [details, setDetails] = useState({ ...defaultFormState });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [fnameInvalid, setFnameInvalid] = useState(false);
  const [lnameInvalid, setLnameInvalid] = useState(false);
  const [mobileInvalid, setMobileInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  // const [textInvalid, setTextInvalid] = useState(false);
  const [form, setForm] = useState({});
  const [validity, setValidity] = useState(false);
  // const [valid, setValid] = useState(false);
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
        // console.log(e);
        break;
      case "email":
        setEmail(e.target.value);
        setEmailInvalid(!e.target.validity.valid);
        // console.log(e);
        break;
      case "text":
        setText(e.target.value);
        // setTextInvalid(textchange());
        // setTextInvalid(!e.target.validity.valid);
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
      !(fnameInvalid && lnameInvalid && mobileInvalid && emailInvalid) &&
      mobile.length === 10
    ) {
      setValidity(true);
      setForm({
        checkin_date: `${moment(date1).format("YYYY-MM-DD")}`,
        checkout_date: `${moment(date2).format("YYYY-MM-DD")}`,
        package: id,
        number_of_guests: guest,
        number_of_rooms: room,
        first_name: fname,
        last_name: lname,
        mobile: mobile,
        email: email,
        message: text,
      });
      setBtnLoading(true);
      // console.log(form);
    } else {
      setValidity(false);
    }
  };

  useEffect(() => {
    // console.log("form msg", form);
    if (validity) {
      axios
        .post(`${process.env.REACT_APP_PUBLIC_URL}contact-us/`, form)
        .then((res) => {
          if (res) {
            // console.log("response msg", res);
            setBtnLoading(false);
            setSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setBtnLoading(false);
        });
      // setOpen(false);
    }
  }, [form, validity]);

  const [clicked, setClicked] = useState(false);

  className += ` textfield ${text ? "has-value" : ""}`;

  return (
    <>
      <form className="modalForm" onSubmit={handleSubmit}>
        {/* <div className="alignHeading">
          <h2>{h2}</h2>
          <p>{p}</p>
        </div> */}
        <div className="flexInput">
          <div className="textInput a">
            <p className="label">No. of rooms</p>
            <p className="value">
              {room !== 1 ? `${room} rooms` : `${room} room`}
            </p>
          </div>
          <div className="textInput b">
            <p className="label">No. of guests</p>
            <p className="value">
              {guest !== 1 ? `${guest} Guests` : `${guest} Guest`}
            </p>
          </div>
          <div className="textInput c">
            <p className="label">Package</p>
            <p className="value">{pack}</p>
          </div>
          <div className="textInput d">
            <p className="label">Check in date</p>
            <p className="value">{moment(date1).format("YYYY-MM-DD")}</p>
          </div>
          <div className="textInput e">
            <p className="label">Check out date</p>
            <p className="value">{moment(date2).format("YYYY-MM-DD")}</p>
          </div>
          <div className="textInput f">
            <p className="label">Price</p>
            <p className="value">
              ₹ {amount} <span>(inc. taxes)</span>
            </p>
          </div>
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
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$"
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
            pattern="[0-9]{10,10}"
            maxLength="10"
            minLength="10"
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
          <textarea
            className={className}
            value={text}
            name="text"
            onChange={handleChange}
            onClick={() => setClicked(!clicked)}
            type="text"
            // pattern="^([A-Za-z0-9 ,.'`-]{10,200})$"
            // minLength="10"
            // required
          />
          <label htmlFor="message" className="input-placeholder">
            Write your message here
          </label>
          {/* {textInvalid ? (
            <p className="error-text">
              Please provide a minimum of 10 characters
            </p>
          ) : null} */}
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
        className="modal thanks"
        open={success}
        onClose={() => {
          setSuccess(false);
        }}
      >
        <div className="box">
          <h1>Thank you</h1>
          <p>Your booking request has been sent. We will call you shortly.</p>
          <button
            className="btn"
            onClick={() => {
              setSuccess(false);
              setOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Form;
