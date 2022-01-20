import React from "react";
import Footer from "../Footer";
import NewHeader from "../NewHeader";
import Cancel from "../Cancel";
import Charge from "../Charge";
import "./Book.scss";
import book from "../../image/book.png";
import { NavHashLink } from "react-router-hash-link";
import { useState } from "react";
// import arrow2 from "../../image/Frame2.png";
import add from "../../image/add.png";
import clear from "../../image/clear.png";
import minus from "../../image/minus.png";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Modal } from "@material-ui/core";
import useWindowSize from "../useWindowSize";
import moment from "moment";
import axios from "axios";

const Book = () => {
  const [width] = useWindowSize();
  // const dataBook = sessionStorage.getItem("bannerData");
  const guestBook = sessionStorage.getItem("guestData");
  const roomBook = sessionStorage.getItem("roomData");
  const date1Book = sessionStorage.getItem("date1Data");
  const date2Book = sessionStorage.getItem("date2Data");
  const guestnumbers = JSON.parse(guestBook);
  const roomnumbers = JSON.parse(roomBook);
  const date1numbers = JSON.parse(date1Book);
  const date2numbers = JSON.parse(date2Book);
  // console.log(date1numbers, date1Book);

  // const [date1, setDate1] = useState(new Date(`${date1numbers}`));
  const [date1, setDate1] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(1);
  // console.log(room, guest);
  const [data, setData] = useState({});
  const [on, setOn] = useState(false);
  // const [date2, setDate2] = useState(new Date(`${date2numbers}`));
  const [date2, setDate2] = useState(
    moment(new Date()).add(1, "days").format("YYYY-MM-DD")
  );
  const [valid, setValid] = useState(false);
  const [execValid, setExecValid] = useState(false);
  const [exec, setExec] = useState("");
  const [execMoney, setExecMoney] = useState("");
  const [execId, setExecId] = useState(0);
  const [draw, setDraw] = useState(false);
  const [charge, setCharge] = useState(false);
  const [view, setView] = useState([]);
  const [array, setArray] = useState([]);
  const [msg, setMsg] = useState("");
  const [roomApi, setRoomApi] = useState(1);

  const handleChange = (e) => {
    setDate1(moment(e).format("YYYY-MM-DD"));
  };

  React.useEffect(() => {
    if (sessionStorage.getItem("guestData") !== null) {
      console.log("moemnt");
    }
    if (sessionStorage.getItem("guestData") !== null) {
      // console.log("react usestae is running");
      setGuest(guestnumbers);
      setRoom(roomnumbers);
      setRoomApi(roomnumbers);
      // setDate1(moment(new Date()).format("YYYY-MM-DD"));
      setDate1(moment(new Date(`${date1numbers}`)).format("YYYY-MM-DD"));
      setDate2(moment(new Date(`${date2numbers}`)).format("YYYY-MM-DD"));
      console.log(date1, date2);
    }
  }, []);

  React.useEffect(() => {
    // console.log(date1, date2);
    if (
      // date1.getTime() === date2.getTime() ||
      moment(date1).format("YYYY-MM-DD") >=
        moment(date2).format("YYYY-MM-DD") ||
      moment(date1).format("YYYY-MM-DD") === moment(date2).format("YYYY-MM-DD")
    ) {
      setDate2(moment(date1).add(1, "days").format("YYYY-MM-DD"));
    }
  }, [handleChange, date1, date2, setDate2, setDate1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      guest: guest,
      room: room,
      date1: date1,
      date2: date2,
      text: exec,
    });
    if (
      moment(date1).format("YYYY-MM-DD") !==
        moment(date2).format("YYYY-MM-DD") &&
      date1 !== null &&
      date2 !== null &&
      guest !== 0 &&
      room !== 0
    ) {
      console.log("done");
    } else {
      console.log("error");
    }
  };

  const execSubmit = (id, name, money) => {
    setExec(name);
    setExecMoney(money);
    setExecId(id);
    if (
      moment(date1).format("YYYY-MM-DD") ===
        moment(date2).format("YYYY-MM-DD") &&
      guest === 0 &&
      room === 0 &&
      exec === "" &&
      execMoney === "" &&
      execId === 0
    ) {
      console.log("error data: ", data);
    } else {
      setValid(true);
    }
  };

  React.useEffect(() => {
    if (valid) {
      setData({
        guest: guest,
        room: room,
        date1: date1,
        date2: date2,
        execute: exec,
        execMoney: execMoney,
        execId: execId,
      });
      setExecValid(true);
    }
  }, [valid]);

  React.useEffect(() => {
    // console.log(date1, date2);All rooms are booked
    if (
      // date1.getTime() === date2.getTime() ||
      moment(date1).format("YYYY-MM-DD") >=
        moment(date2).format("YYYY-MM-DD") ||
      moment(date1).format("YYYY-MM-DD") === moment(date2).format("YYYY-MM-DD")
    ) {
      setDate2(moment(date1).add(1, "days").format("YYYY-MM-DD"));
    }
  }, [handleChange, date1, date2, setDate2, setDate1]);

  React.useEffect(() => {
    if (
      moment(date1).format("YYYY-MM-DD") < moment(date2).format("YYYY-MM-DD")
    ) {
      axios
        .get(
          `${
            process.env.REACT_APP_PUBLIC_URL
          }room-packages?number_of_rooms=${roomApi}&checkin_date=${moment(
            date1
          ).format("YYYY-MM-DD")}&checkout_date=${moment(date2).format(
            "YYYY-MM-DD"
          )}`
        )
        .then((res) => {
          if (res) {
            const info = res.data.data;
            // console.log("response user profile msg", info);
            if (res.data.message === "") {
              setArray([...info]);
              setMsg("");
            } else {
              setMsg(res.data.message);
              setArray([]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [roomApi, date1, date2]);

  // React.useEffect(() => {
  //   if (valid) {
  //     console.log("data link-/: ", data);
  //     // sessionStorage.clear();
  //     sessionStorage.removeItem("guestData");
  //     sessionStorage.removeItem("roomData");
  //     sessionStorage.removeItem("date1Data");
  //     sessionStorage.removeItem("date2Data");
  //   }
  // }, [data, valid]);

  React.useEffect(() => {
    if (execValid) {
      console.log("data link-/: ", data);
      // sessionStorage.clear();
      sessionStorage.removeItem("guestData");
      sessionStorage.removeItem("roomData");
      sessionStorage.removeItem("date1Data");
      sessionStorage.removeItem("date2Data");
      sessionStorage.setItem("date1Data", JSON.stringify(date1));
      sessionStorage.setItem("date2Data", JSON.stringify(date2));
      if (exec !== "") {
        sessionStorage.setItem("bookData", exec);
      }
      if (execMoney !== "") {
        sessionStorage.setItem("bookMoney", execMoney);
      }
      if (execId !== 0) {
        sessionStorage.setItem("bookId", execId);
      }
      sessionStorage.setItem("guestData", JSON.stringify(guest));
      sessionStorage.setItem("roomData", JSON.stringify(room));
      window.location.href = "/Pay#top";
    }
  }, [data, execValid]);

  const handleCharge = (id) => {
    setCharge(true);
    if (id === 1) {
      setView({
        adult: 1500,
        teen: 1100,
      });
    }
    if (id === 2) {
      setView({
        adult: 2000,
        teen: 1500,
      });
    }
    if (id === 3) {
      setView({
        adult: 2500,
        teen: 1800,
      });
    }
  };

  const handleMod = (e) => {
    e.preventDefault();
    setData({
      guest: guest,
      room: room,
      date1: date1,
      date2: date2,
    });
    if (
      moment(date1).format("YYYY-MM-DD") !==
        moment(date2).format("YYYY-MM-DD") &&
      date1 !== null &&
      date2 !== null &&
      guest !== 0 &&
      room !== 0
    ) {
      setOn(false);
    } else {
      console.log("error", date1, date2, guest, room);
    }
  };

  // React.useEffect(() => {
  //   if (valid) {
  //     console.log(data);
  //   }
  // }, [valid, handleMod]);

  return (
    <>
      <NewHeader />
      <div className="bookHeader">
        {width < 1025 ? (
          <>
            <div className="avail">
              <div className="textInput" onClick={() => setOn(true)}>
                <p>You are booking for:</p>
                <div className="text-input">
                  <h1>
                    {guest} {guest === 1 ? "Adult" : "Adults"}, {room}{" "}
                    {room === 1 ? "Room" : "Rooms"} |{" "}
                    {moment(date1).format("DD MMM")} to{" "}
                    {moment(date2).format("DD MMM")}
                  </h1>
                </div>
              </div>
            </div>
            <Modal
              className="modalBooks"
              open={on}
              onClose={() => {
                setOn(false);
              }}
            >
              <form className="box" onSubmit={handleMod}>
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => setOn(false)}
                />
                <div className="adult">
                  <h1>Adults (12+)</h1>
                  <div className="text-input">
                    {guest === 1 ? (
                      <span style={{ opacity: "0.5" }}>
                        <img src={minus} alt="minus" />
                      </span>
                    ) : (
                      <span onClick={() => setGuest(guest - 1)}>
                        <img src={minus} alt="minus" />
                      </span>
                    )}
                    <h1>{guest}</h1>
                    <span onClick={() => setGuest(guest + 1)}>
                      <img src={add} alt="add" />
                    </span>
                  </div>
                </div>
                <div className="adult">
                  <h1>Rooms</h1>
                  <div className="text-input">
                    {room === 1 ? (
                      <span style={{ opacity: "0.5" }}>
                        <img src={minus} alt="minus" />
                      </span>
                    ) : (
                      <span onClick={() => setRoom(room - 1)}>
                        <img src={minus} alt="minus" />
                      </span>
                    )}
                    <h1>{room}</h1>
                    <span onClick={() => setRoom(room + 1)}>
                      <img src={add} alt="add" />
                    </span>
                  </div>
                </div>
                <div className="date">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="dateInfo">
                      <h1>Check in date</h1>
                      <DatePicker
                        disablePast={true}
                        value={date1}
                        onChange={handleChange}
                        format="E, dd MMM"
                        animateYearScrolling
                      />
                    </div>
                    <div className="dateInfo">
                      <h1>Check out date</h1>
                      <DatePicker
                        disablePast={true}
                        minDate={date2}
                        format="E, dd MMM"
                        value={date2}
                        onChange={setDate2}
                        animateYearScrolling
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                </div>
                <p>
                  Please note that the max. capacity in one room is 2 adults + 1
                  adult (at additional cost)
                </p>
                <button type="submit" className="btn">
                  Apply
                </button>
              </form>
            </Modal>
          </>
        ) : (
          <>
            <form className="avail" onSubmit={handleSubmit}>
              <div className="first">
                <h1>Reserve for:</h1>
                <div className="textInput">
                  <p>No. of guests</p>
                  <div className="text-input" onClick={() => setOn(true)}>
                    <h1>
                      {guest} {guest === 1 ? "Adult" : "Adults"}, {room}{" "}
                      {room === 1 ? "Room" : "Rooms"}
                    </h1>
                  </div>
                </div>
                <div className="date">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disablePast={true}
                      label={`Check-in date`}
                      value={date1}
                      onChange={handleChange}
                      inputVariant="outlined"
                      format="E, dd MMM"
                      animateYearScrolling
                    />
                    <DatePicker
                      disablePast={true}
                      label={`Check-out date`}
                      inputVariant="outlined"
                      minDate={date2}
                      format="E, dd MMM"
                      value={date2}
                      onChange={setDate2}
                      animateYearScrolling
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className="second">
                <button className="btn" type="submit">
                  Search Rooms
                  {/* <span>
                <img src={arrow2} alt="arrow" />
              </span> */}
                </button>
              </div>
            </form>
            <Modal
              className="modalBanner"
              open={on}
              onClose={() => {
                setOn(false);
                setRoomApi(room);
              }}
            >
              <div className="box">
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => {
                    setOn(false);
                    setRoomApi(room);
                  }}
                />
                <div className="adult">
                  <h1>Adults (12+)</h1>
                  <div className="text-input">
                    {guest === 1 ? (
                      <span style={{ opacity: "0.5" }}>
                        <img src={minus} alt="minus" />
                      </span>
                    ) : (
                      <span onClick={() => setGuest(guest - 1)}>
                        <img src={minus} alt="minus" />
                      </span>
                    )}
                    <h1>{guest}</h1>
                    <span onClick={() => setGuest(guest + 1)}>
                      <img src={add} alt="add" />
                    </span>
                  </div>
                </div>
                <div className="adult">
                  <h1>Rooms</h1>
                  <div className="text-input">
                    {room === 1 ? (
                      <span style={{ opacity: "0.5" }}>
                        <img src={minus} alt="minus" />
                      </span>
                    ) : (
                      <span onClick={() => setRoom(room - 1)}>
                        <img src={minus} alt="minus" />
                      </span>
                    )}
                    <h1>{room}</h1>
                    <span onClick={() => setRoom(room + 1)}>
                      <img src={add} alt="add" />
                    </span>
                  </div>
                </div>
                <p>
                  Please note that the max capacity in one room is 2 adults + 1
                  adult (at additional cost)
                </p>
                <div className="bottom">
                  <button
                    className="btn"
                    onClick={() => {
                      setOn(false);
                      setRoomApi(room);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
      <div className="book">
        <div className="container">
          {msg === "" ? (
            <>
              <h1>Choose a package</h1>
              {array.map((doc) => (
                <div className="package" key={doc.id}>
                  <div className="left">
                    <img src={book} alt="book" />
                  </div>
                  <div className="right">
                    <div className="top">
                      <h1>{doc.name}</h1>
                      <div className="topRight">
                        <h1>₹ {doc.package_amount}</h1>
                        <p>+{doc.tax_amount} taxes & fees</p>
                      </div>
                    </div>
                    <div className="border"></div>
                    <div className="body">
                      <ul>
                        <li>
                          Complimentary {doc.services.join(" + ")} available.
                        </li>
                        <li>
                          Price for 2 adults + 1 adult (at additional cost){" "}
                        </li>
                        <li>
                          Extra mattress available at extra charges.{" "}
                          <a onClick={() => handleCharge(doc.id)}>
                            View charges
                          </a>
                        </li>
                        <li>Check-in: 12noon ; Check-out: 11 a.m.</li>
                        <li>
                          Free cancellation before 7 days of check-in.{" "}
                          <a onClick={() => setDraw(true)}>
                            View cancellation policy
                          </a>
                        </li>
                      </ul>
                      <div className="buttons">
                        <NavHashLink to="/Rooms#top" className="loginBtn">
                          View Room
                        </NavHashLink>
                        <button
                          className="btn"
                          onClick={() =>
                            execSubmit(doc.id, doc.name, doc.total_amount)
                          }
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              style={{
                padding: "80px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>{msg}</h1>
            </div>
          )}
        </div>
      </div>
      <Cancel draw={draw} setDraw={setDraw} />
      <Charge draw={charge} setDraw={setCharge} view={view} />
      <Footer />
    </>
  );
};

export default Book;
