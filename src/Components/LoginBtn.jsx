import React, { useEffect, useState } from "react";
// import Sign from "./Sign";
import account from "../image/account.png";
import profile from "../image/profile.png";
import { Modal, Snackbar } from "@material-ui/core";
import clear from "../image/clear.png";
import { Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { NavHashLink } from "react-router-hash-link";
import useWindowSize from "./useWindowSize";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const LoginBtn = ({ close, cancel }) => {
  const [login, setLogin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [code, setCode] = useState("");
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [validity, setValidity] = useState(false);
  const [valid, setValid] = useState(false);
  const [right, setRight] = useState(false);
  const [timer, setTimer] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [width] = useWindowSize();

  const [btnDisable, setBtnDisable] = useState(false);

  const otpClick = async () => {
    if (!emailInvalid && email !== "") {
      console.log("email empty", email !== "");
      console.log("email invalid", !emailInvalid);
      setInvalid(true);
      console.log("state invalid", invalid);
      setValidity(true);
      setBtnDisable(true);
    } else {
      setInvalid(false);
    }
    const form = {
      type: "login",
      email: email,
    };
    console.log(form);
    if (validity) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}send-otp`,
          form
        );
        // .then((res) => {
        if (res) {
          console.log("response msg", res);
          setSuccess(res.data.success);
          console.log(success);
          const { message = "Otp sent successfully" } = res.data;
          setAlertState({ open: true, message, type: "success" });
          setBtnDisable(false);
          // }
        }
      } catch (err) {
        console.log(err);
        const {
          message = "Sorry! We are unable to process your request.",
          status_code,
          errors = {},
        } = (err.response && err.response.data) || {};

        setSuccess(false);
        console.log(success);

        const errArr = Object.keys(errors);
        if (status_code === 422 && errArr.length) {
          const error = {};
          errArr.forEach((key) => (error[key] = errors[key][0]));
          setError(error);
        } else {
          setAlertState({ open: true, message, type: "error" });
        }
        setBtnDisable(false);
      }
    }
    console.log(emailInvalid, invalid);
  };

  useEffect(async () => {
    const form = {
      type: "login",
      email: email,
    };
    // console.log(form);
    if (validity) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}send-otp`,
          form
        );
        // .then((res) => {
        if (res) {
          console.log("response msg", res);
          setSuccess(res.data.success);
          console.log(success);
          const { message = "Otp sent successfully" } = res.data;
          setAlertState({ open: true, message, type: "success" });
          setBtnDisable(false);
          // }
        }
      } catch (err) {
        console.log(err);
        const {
          message = "Sorry! We are unable to process your request.",
          status_code,
          errors = {},
        } = (err.response && err.response.data) || {};

        setSuccess(false);
        console.log(success);

        const errArr = Object.keys(errors);
        if (status_code === 422 && errArr.length) {
          const error = {};
          errArr.forEach((key) => (error[key] = errors[key][0]));
          setError(error);
        } else {
          setAlertState({ open: true, message, type: "error" });
        }
        setBtnDisable(false);
      }
    }
  }, [setValidity, validity]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setTimer(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [setSuccess, success]);

  const [counter, setCounter] = React.useState(30);
  useEffect(() => {
    if (success) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
    // console.log(counter);
  }, [counter, setSuccess, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(codeInvalid && emailInvalid)) {
      setValid(true);
    }
    const form = {
      email: email,
      password: code,
    };
    if (valid) {
      // console.log(code);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}login`,
          form
        );
        if (res) {
          // console.log("response msg", res.data.access_token);
          localStorage.setItem("access-token", res.data.access_token);
          localStorage.setItem("refresh-token", res.data.refresh_token);
          setLogin(true);
          setRight(true);
          // console.log(code, res);
          sessionStorage.setItem("logged", true);
          sessionStorage.setItem("mailed", JSON.stringify(email));
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        const {
          message = "Sorry! We are unable to process your request.",
          status_code,
          errors = {},
        } = (err.response && err.response.data) || {};

        setSuccess(false);
        console.log(success);

        const errArr = Object.keys(errors);
        if (status_code === 422 && errArr.length) {
          const error = {};
          errArr.forEach((key) => (error[key] = errors[key][0]));
          setError(error);
        } else {
          setAlertState({ open: true, message, type: "error" });
        }
      }
    }
  };

  useEffect(async () => {
    const form = {
      email: email,
      password: code,
    };
    if (valid) {
      // console.log(code);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}login`,
          form
        );
        if (res) {
          // console.log("response msg", res.data.access_token);
          localStorage.setItem("access-token", res.data.access_token);
          localStorage.setItem("refresh-token", res.data.refresh_token);
          setLogin(true);
          setRight(true);
          // console.log(code, res);
          localStorage.setItem("next", true);
          sessionStorage.setItem("logged", true);
          sessionStorage.setItem("mailed", JSON.stringify(email));
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        const {
          message = "Sorry! We are unable to process your request.",
          status_code,
          errors = {},
        } = (err.response && err.response.data) || {};

        setSuccess(false);
        console.log(success);

        const errArr = Object.keys(errors);
        if (status_code === 422 && errArr.length) {
          const error = {};
          errArr.forEach((key) => (error[key] = errors[key][0]));
          setError(error);
        } else {
          setAlertState({ open: true, message, type: "error" });
        }
      }
    }
  }, [setValid, valid]);

  useEffect(() => {
    if (localStorage.getItem("access-token") !== null) {
      setRight(true);
    }
  });

  useEffect(() => {
    if (right) {
      const tokenData = localStorage.getItem("access-token");
      const token = JSON.stringify(tokenData);
      // console.log(token.slice(1, -1));
      const headers = {
        Authorization: `Bearer ${token.slice(1, -1)}`,
      };
      // console.log(headers);
      // if (right) {
      axios
        .get(`${process.env.REACT_APP_PUBLIC_URL}user-profile`, {
          headers: headers,
        })
        .then((res) => {
          if (res) {
            const info = res.data.data;
            // console.log("response user profile msg", info);
            localStorage.setItem("email", info.email);
            localStorage.setItem("name", info.name);
            localStorage.setItem("mobile", info.mobile);
            // localStorage.setItem("next", true);
            localStorage.setItem("role", info.role);
            sessionStorage.setItem("delete", true);
            if (info.role === "admin") {
              window.location.href = "/RoomBack#top";
            }
            setSuccess(res.data.success);
            // console.log(success);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // }
    }
  }, [right]);

  // const [del, setDel] = useState(false);

  // React.useEffect(() => {
  //   if (sessionStorage.getItem("delete") !== null) {
  //     setDel(true);
  //     console.log("running");
  //   }
  // });

  // React.useEffect(() => {
  //   if (del) {
  //     // window.location.reload();
  //     console.log("deleting");
  //     sessionStorage.removeItem("delete");
  //   }
  // }, [del]);

  // [handleSubmit, valid]

  React.useEffect(() => {
    if (localStorage.getItem("next") !== null) {
      const log = localStorage.getItem("next");
      const loggedIn = JSON.parse(log);
      const mail = sessionStorage.getItem("email");
      const mails = JSON.parse(mail);
      // console.log(mails);
      if (loggedIn) {
        setEmail(mails);
        setLogin(true);
      }
    }
  }, []);

  const handleAlertClose = () => {
    setAlertState({ open: false, message: "", type: "success" });
  };

  const [newName, setNewName] = useState("");

  React.useEffect(() => {
    if (localStorage.getItem("name") !== null) {
      const nameData = localStorage.getItem("name");
      const newName = JSON.stringify(nameData);
      setNewName(newName);
    }
  });

  return (
    <>
      {login ? (
        <div className="afterLogin">
          <button className={`${close}`}>
            <span>
              <p className="acc">{newName.slice(1, 2)}</p>
            </span>
            {newName.slice(1, -1)}
          </button>
          <Dropdown className="d">
            <DropdownMenu>
              <DropdownItem>
                <NavHashLink to="/MyBookings#top">My Bookings</NavHashLink>
              </DropdownItem>
              <DropdownItem>
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    setLogin(false);
                    setDraw(false);
                    setEmail("");
                    setCode("");
                    setInvalid(false);
                    window.location.reload();
                    if (window.location.href.includes("MyBookings")) {
                      window.location.href = "/#top";
                    }
                    if (
                      window.location.href.includes("Part2") ||
                      window.location.href.includes("Part3")
                    ) {
                      window.location.href = "/Pay#top";
                    }
                  }}
                >
                  Logout
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="beforeLogin">
          <button onClick={() => setDraw(true)} className={`${close}`}>
            {cancel ? (
              <span>
                {width < 481 ? (
                  <img src={profile} alt="account" />
                ) : (
                  <img src={account} alt="account" />
                )}
              </span>
            ) : null}
            Login
          </button>
          <Modal
            className="modalPop"
            open={draw}
            onClose={() => {
              setDraw(false);
            }}
          >
            <div className="box">
              <div className="head">
                <h1>Login</h1>
                <img src={clear} alt="close" onClick={() => setDraw(false)} />
              </div>
              <form className="body dp" onSubmit={handleSubmit}>
                <div className="otp">
                  <div className="textInput">
                    <div className="text-input">
                      <input
                        className="input"
                        value={email}
                        name="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailInvalid(!e.target.validity.valid);
                        }}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
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
                      disabled={btnDisable}
                    >
                      {/* Send OTP */}
                      Send OTP
                    </button>
                  )}
                </div>
                {success ? (
                  <div className="otp">
                    <div className="textInput">
                      <div className="text-input">
                        <input
                          value={code}
                          type="number"
                          className="input"
                          name="code"
                          onChange={(e) => {
                            setCode(e.target.value);
                            setCodeInvalid(!e.target.validity.valid);
                          }}
                          pattern="[0-9]{6}"
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
                    <button type="submit" className="btn">
                      Login
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </Modal>
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
      )}
    </>
  );
};

export default LoginBtn;
