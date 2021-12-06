import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import LoginBtn from "../LoginBtn";
import NewHeader from "../NewHeader";
import arrow from "../../image/backarrow.png";
import pay from "../../image/pay.png";
import moment from "moment";
import Cancel from "../Cancel";
import "./Pay.scss";
import { NavHashLink } from "react-router-hash-link";
import arrow2 from "../../image/Frame2.png";
import useWindowSize from "../useWindowSize";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Pay = () => {
  const dataBook = sessionStorage.getItem("bookData");
  const dataMoney = sessionStorage.getItem("bookMoney");
  const guestBook = sessionStorage.getItem("guestData");
  const roomBook = sessionStorage.getItem("roomData");
  const date1Book = sessionStorage.getItem("date1Data");
  const date2Book = sessionStorage.getItem("date2Data");
  const pack = JSON.stringify(dataBook);
  const money = JSON.parse(dataMoney);
  const guest = JSON.parse(guestBook);
  const room = JSON.parse(roomBook);
  const date1numbers = JSON.parse(date1Book);
  const date2numbers = JSON.parse(date2Book);
  const date1 = moment(date1numbers).format("Do MMM");
  const date2 = moment(date2numbers).format("Do MMM");
  const date1back = new Date(`${date1numbers}`);
  const date2back = new Date(`${date2numbers}`);
  console.log(date1, date2, guest, room);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [cityInvalid, setCityInvalid] = useState(false);
  const [mobileInvalid, setMobileInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({});
  const [validity, setValidity] = useState(false);
  const [valid, setValid] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [logged, setLogged] = useState(false);
  const [draw, setDraw] = useState(false);
  //   const [btnLoading, setBtnLoading] = useState(false);
  const [timer, setTimer] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [width] = useWindowSize();

  const backPage = () => {
    setValid(true);
  };

  React.useEffect(() => {
    if (valid) {
      sessionStorage.setItem("guestData", JSON.stringify(guest));
      sessionStorage.setItem("roomData", JSON.stringify(room));
      sessionStorage.setItem("date1Data", JSON.stringify(date1back));
      sessionStorage.setItem("date2Data", JSON.stringify(date2back));
      window.location.href = "/Book#top";
    }
  }, [valid]);

  React.useEffect(() => {
    setInvalid(true);
    if (sessionStorage.getItem("logged") !== null) {
      setLogged(true);
      const emailData = localStorage.getItem("email");
      const email = JSON.stringify(emailData);
      setEmail(email.slice(1, -1));
      const nameData = localStorage.getItem("name");
      const name = JSON.stringify(nameData);
      setCity(name.slice(1, -1));
      const mobileData = localStorage.getItem("mobile");
      const mobile = JSON.parse(mobileData);
      setMobile(mobile);
    }
  }, []);

  // React.useEffect(() => {
  //   if (sessionStorage.getItem("logged") !== null) {
  //     setLogged(true);
  //   }
  // });

  React.useEffect(() => {
    if (sessionStorage.getItem("logged") !== null) {
      setLogged(true);
    }
  }, []);

  React.useEffect(() => {
    if (sessionStorage.getItem("bookData") === null) {
      // alert("Please select the Package");
      window.location.href = "/Book#top";
    }
  }, []);

  const handleChange = (e) => {
    // console.log("e value", e);
    switch (e.target.name) {
      case "mobile":
        setMobile(e.target.value);
        setMobileInvalid(!e.target.validity.valid);
        break;
      case "email":
        setEmail(e.target.value);
        setEmailInvalid(!e.target.validity.valid);
        break;
      case "name":
        setCity(e.target.value);
        setCityInvalid(!e.target.validity.valid);
        break;
      case "code":
        setCode(e.target.value);
        setCodeInvalid(!e.target.validity.valid);
        break;
      default:
        break;
    }
  };

  const otpClick = async () => {
    if (
      (city !== "" && email !== "" && mobile !== "") ||
      emailInvalid ||
      cityInvalid
    ) {
      setInvalid(false);
      setCorrect(true);
    } else {
      setInvalid(true);
    }
    // const form = {
    //   type: "login",
    //   email: email,
    // };
    // console.log(form);
    // if (correct) {
    //   try {
    //     const res = await axios.post(
    //       `${process.env.REACT_APP_PUBLIC_URL}send-otp`,
    //       form
    //     );
    //     // .then((res) => {
    //     if (res) {
    //       console.log("response msg", res);
    //       setSuccess(res.data.success);
    //       console.log(success);
    //       const { message = "Otp sent successfully" } = res.data;
    //       setAlertState({ open: true, message, type: "success" });
    //       // }
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     const {
    //       message = "Sorry! We are unable to process your request.",
    //       status_code,
    //       errors = {},
    //     } = (err.response && err.response.data) || {};

    //     setSuccess(false);
    //     console.log(success);

    //     const errArr = Object.keys(errors);
    //     if (status_code === 422 && errArr.length) {
    //       const error = {};
    //       errArr.forEach((key) => (error[key] = errors[key][0]));
    //       setError(error);
    //     } else {
    //       setAlertState({ open: true, message, type: "error" });
    //     }
    //   }
    // }
  };

  // useEffect(async () => {
  //   const form = {
  //     type: "login",
  //     email: email,
  //   };
  //   console.log(form);
  //   if (correct) {
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_PUBLIC_URL}send-otp`,
  //         form
  //       );
  //       // .then((res) => {
  //       if (res) {
  //         console.log("response msg", res);
  //         setSuccess(res.data.success);
  //         console.log(success);
  //         const { message = "Otp sent successfully" } = res.data;
  //         setAlertState({ open: true, message, type: "success" });
  //         // }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       const {
  //         message = "Sorry! We are unable to process your request.",
  //         status_code,
  //         errors = {},
  //       } = (err.response && err.response.data) || {};

  //       setSuccess(false);
  //       console.log(success);

  //       const errArr = Object.keys(errors);
  //       if (status_code === 422 && errArr.length) {
  //         const error = {};
  //         errArr.forEach((key) => (error[key] = errors[key][0]));
  //         setError(error);
  //       } else {
  //         setAlertState({ open: true, message, type: "error" });
  //       }
  //     }
  //   }
  // }, [setCorrect, correct]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setTimer(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [setSuccess, success]);

  const [counter, setCounter] = React.useState(30);
  React.useEffect(() => {
    if (success) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
    // console.log(counter);
  }, [counter, setSuccess, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(cityInvalid || mobileInvalid || emailInvalid || code === 6)) {
      setValidity(true);
      setForm({
        mobile: mobile,
        email: email,
        name: city,
        otp: code,
      });
      //  setBtnLoading(true);
      console.log(form);
    } else {
      setValidity(false);
    }
    if (logged) {
      if (!(cityInvalid || mobileInvalid || emailInvalid)) {
        setValidity(true);
        setForm({
          mobile: mobile,
          email: email,
          name: city,
        });
        console.log(form);
      } else {
        setValidity(false);
      }
    }
    // if (validity) {
    //   // console.log(code);
    //   try {
    //     const res = await axios.post(
    //       `${process.env.REACT_APP_PUBLIC_URL}register`,
    //       form
    //     );
    //     if (res) {
    //       // console.log("response msg", res.data.access_token);
    //       localStorage.setItem("access-token", res.data.access_token);
    //       localStorage.setItem("refresh-token", res.data.refresh_token);
    //       console.log(code, res);
    //       sessionStorage.setItem("logged", true);
    //       sessionStorage.setItem("mailed", JSON.stringify(email));
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     const {
    //       message = "Sorry! We are unable to process your request.",
    //       status_code,
    //       errors = {},
    //     } = (err.response && err.response.data) || {};

    //     setSuccess(false);
    //     console.log(success);

    //     const errArr = Object.keys(errors);
    //     if (status_code === 422 && errArr.length) {
    //       const error = {};
    //       errArr.forEach((key) => (error[key] = errors[key][0]));
    //       setError(error);
    //     } else {
    //       setAlertState({ open: true, message, type: "error" });
    //     }
    //   }
    // }
  };

  // useEffect(async () => {
  //   if (validity) {
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_PUBLIC_URL}login`,
  //         form
  //       );
  //       if (res) {
  //         // console.log("response msg", res.data.access_token);
  //         localStorage.setItem("access-token", res.data.access_token);
  //         localStorage.setItem("refresh-token", res.data.refresh_token);
  //         console.log(code, res);
  //         sessionStorage.setItem("logged", true);
  //         sessionStorage.setItem("mailed", JSON.stringify(email));
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       const {
  //         message = "Sorry! We are unable to process your request.",
  //         status_code,
  //         errors = {},
  //       } = (err.response && err.response.data) || {};

  //       setSuccess(false);
  //       console.log(success);

  //       const errArr = Object.keys(errors);
  //       if (status_code === 422 && errArr.length) {
  //         const error = {};
  //         errArr.forEach((key) => (error[key] = errors[key][0]));
  //         setError(error);
  //       } else {
  //         setAlertState({ open: true, message, type: "error" });
  //       }
  //     }
  //   }
  // }, [setValidity, validity]);

  React.useEffect(() => {
    if (validity) {
      console.log(form);
      sessionStorage.clear();
      sessionStorage.setItem("bookData", JSON.stringify(pack));
      sessionStorage.setItem("bookMoney", JSON.stringify(money));
      sessionStorage.setItem("guestData", JSON.stringify(guest));
      sessionStorage.setItem("roomData", JSON.stringify(room));
      sessionStorage.setItem("date1Data", JSON.stringify(date1back));
      sessionStorage.setItem("date2Data", JSON.stringify(date2back));
      sessionStorage.setItem("nameData", JSON.stringify(form.city));
      sessionStorage.setItem("mailData", JSON.stringify(form.email));
      sessionStorage.setItem("phoneData", JSON.stringify(form.mobile));
      if (sessionStorage.getItem("logged") === null) {
        sessionStorage.setItem("logged", true);
        sessionStorage.setItem("mailed", JSON.stringify(form.city));
      }
      // if (sessionStorage.getItem("mailed") === null) {
      //   sessionStorage.setItem("mailed", JSON.stringify(form.city));
      // }
      // window.location.href = "/Part2#top";
    }
  }, [form, validity]);

  const handleAlertClose = () => {
    setAlertState({ open: false, message: "", type: "success" });
  };

  return (
    <>
      <NewHeader />
      <div className="pay1">
        <div className="container">
          <div className="top">
            {width < 1100 ? (
              <div className="topLeft">
                <button className="loginBtn" onClick={backPage}>
                  <span>
                    <img src={arrow} alt="arrow" />
                  </span>
                  Back to booking page
                </button>
              </div>
            ) : (
              <button className="loginBtn" onClick={backPage}>
                <span>
                  <img src={arrow} alt="arrow" />
                </span>
                Back to booking page
              </button>
            )}
            <div className="bar">
              <div className="progress">
                <div className="border1"></div>
                <div className="border2"></div>
                <div className="details">
                  <div className="first">
                    <div className="circle">1</div>
                    {/* <p>Guest Details</p> */}
                  </div>
                  <div className="second">
                    <div className="circle">2</div>
                    {/* <p>Payment Details</p> */}
                  </div>
                  <div className="third">
                    <div className="circle">3</div>
                    {/* <p>Booking Confirmed!</p> */}
                  </div>
                </div>
              </div>
              <div className="detailsText">
                <div className="first">
                  <p>Guest Details</p>
                </div>
                <div className="second">
                  <p>Payment Details</p>
                </div>
                <div className="third">
                  <p>Booking Confirmed!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="left">
              {logged ? null : (
                <div className="log">
                  <div className="det">
                    <p>Already have an account?</p>
                    <h5>You can login to pre-fill your personal details</h5>
                  </div>
                  <LoginBtn close="btn" cancel={false} />
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="box">
                  <h1>Please enter guest details & sign up</h1>
                  <div className="inter">
                    <div className="text-input">
                      <input
                        value={city}
                        className="input"
                        name="name"
                        onChange={handleChange}
                        type="text"
                        pattern="^([A-Za-z ,.'`-]{2,30})$"
                        required
                      />
                      <label htmlFor="name" className="input-placeholder">
                        Full Name<span>*</span>
                      </label>
                    </div>
                    {cityInvalid ? (
                      <p className="error-text">
                        Please provide a valid City Name
                      </p>
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
                      <p className="error-text">
                        Please provide a valid mobile no.
                      </p>
                    ) : null}
                    <div className="otp">
                      <div className={`textInput ${logged ? "full" : ""}`}>
                        <div className={`text-input`}>
                          <input
                            className="input"
                            value={email}
                            name="email"
                            onChange={handleChange}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                            type="email"
                            required
                          />
                          <label htmlFor="email" className="input-placeholder">
                            Email<span>*</span>
                          </label>
                        </div>
                        {emailInvalid ? (
                          <p className="error-text">
                            Please provide a valid email Id
                          </p>
                        ) : null}
                      </div>
                      {logged ? null : (
                        <>
                          {success ? (
                            <button
                              className={`btn resend`}
                              type="button"
                              // onClick={() => setInvalid(emailInvalid)}
                              onClick={otpClick}
                              disabled={timer}
                            >
                              {counter === 0
                                ? "Re-send OTP"
                                : `Re-send OTP(${counter})`}
                            </button>
                          ) : (
                            <button
                              className={`btn`}
                              type="button"
                              // onClick={() => setInvalid(emailInvalid)}
                              onClick={otpClick}
                              // disabled={!invalid}
                            >
                              {/* Send OTP */}
                              Send OTP
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {logged ? null : (
                      <div className="code">
                        <div className="text-input">
                          <input
                            value={code}
                            type="number"
                            className="input"
                            name="code"
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            disabled={invalid}
                            required
                          />
                          <label htmlFor="code" className="input-placeholder">
                            Enter OTP<span>*</span>
                          </label>
                        </div>
                        {codeInvalid ? (
                          <p className="error-text">
                            The code provided is not valid.
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bottom">
                  <button type="submit" className="btn">
                    {/* {btnLoading ? (
                      "Sending..."
                    ) : (
                      <> */}
                    Next
                    <span>
                      <img src={arrow2} alt="arrow" />
                    </span>
                    {/* </>
                    )} */}
                  </button>
                </div>
              </form>
            </div>
            <div className="right">
              <div className="order">
                <h1>Booking Details :</h1>
                <div className="topOrder">
                  <img src={pay} alt="pay" />
                  <div className="pack">
                    <div className="packdetail">
                      <p>{pack.slice(1, -1)} Package</p>
                      <h5>₹ {money + 540}</h5>
                    </div>
                    <div className="packdetail2">
                      <p>
                        {date1} to {date2} | {guest}{" "}
                        {guest > 1 ? "Adults" : "Adult"} {room}{" "}
                        {room > 1 ? "Rooms" : "Room"}
                      </p>
                      <a href="/Book#top">Edit</a>
                    </div>
                  </div>
                </div>
                <ul>
                  <li>Check-in: 12 P.M. ; Check-out: 11 A.M.</li>
                  <li>
                    Free cancellation before 7 days of check-in.{" "}
                    <a onClick={() => setDraw(true)}>
                      View cancellation policy
                    </a>
                  </li>
                  <li>
                    50% of the total room tariff to be paid as reservation
                    charges.
                  </li>
                  <li>
                    Extra charges (if any) to be paid directly at the hotel.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <h1>
          {pack.slice(1, -1)}: {money}
        </h1> */}
        <Cancel draw={draw} setDraw={setDraw} />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={alertState.open}
          onClose={handleAlertClose}
          autoHideDuration={5000}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertState.type}
            variant="filled"
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </>
  );
};

export default Pay;