import React, { useState } from "react";
// import Sign from "./Sign";
import account from "../image/account.png";
import "./LoginBtn.scss";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";
import { Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { NavHashLink } from "react-router-hash-link";

const LoginBtn = ({ close }) => {
  const [login, setLogin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [code, setCode] = useState("");
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const otpClick = () => {
    if (!emailInvalid && email !== "") {
      console.log("email empty", email !== "");
      console.log("email invalid", !emailInvalid);
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    console.log(emailInvalid, invalid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(codeInvalid && emailInvalid)) {
      setLogin(true);
      sessionStorage.setItem("logged", true);
      sessionStorage.setItem("mailed", JSON.stringify(email));
    }
  };

  React.useEffect(() => {
    if (sessionStorage.length >= 1) {
      const log = sessionStorage.getItem("logged");
      const loggedIn = JSON.parse(log);
      const mail = sessionStorage.getItem("mailed");
      const mails = JSON.parse(mail);
      console.log(mails);
      if (loggedIn) {
        setEmail(mails);
        setLogin(true);
      }
    }
  }, []);

  return (
    <>
      {login ? (
        <div className="afterLogin">
          <button className={`${close}`}>
            <span>
              <p className="acc">{email.slice(0, 1)}</p>
            </span>
            Name
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
                    setLogin(false);
                    setDraw(false);
                    setEmail("");
                    setCode("");
                    setInvalid(false);
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
            <span>
              <img src={account} alt="account" />
            </span>
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
              <form className="body" onSubmit={handleSubmit}>
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
                  <button
                    className={`${invalid ? "btn resend" : "btn"}`}
                    type="button"
                    // onClick={() => setInvalid(emailInvalid)}
                    onClick={otpClick}
                    // disabled={!invalid}
                  >
                    {/* Send OTP */}
                    {invalid ? "Re-send OTP" : "Send OTP"}
                  </button>
                </div>
                {invalid ? (
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
        </div>
      )}
    </>
  );
};

export default LoginBtn;
