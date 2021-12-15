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
import ContactModal from "./ContactModal";

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

  // const [date1, setDate1] = useState(new Date(`${date1numbers}`));
  const [date1, setDate1] = useState(new Date());
  const [guest, setGuest] = useState(guestnumbers);
  const [room, setRoom] = useState(roomnumbers);
  // console.log(room, guest);
  const [data, setData] = useState({});
  const [on, setOn] = useState(false);
  // const [date2, setDate2] = useState(new Date(`${date2numbers}`));
  const [date2, setDate2] = useState(new Date());
  const [valid, setValid] = useState(false);
  const [exec, setExec] = useState("");
  const [amount, setAmount] = useState("");
  // const [paradise, setParadise] = useState("");
  const [draw, setDraw] = useState(false);
  const [charge, setCharge] = useState(false);
  const [view, setView] = useState([]);
  const [array, setArray] = useState([]);
  const [right, setRight] = useState(false);

  // console.log("guestBook: ", guest);
  // console.log("guestBook: ", room);
  // console.log("guestBook: ", date1);
  // console.log("guestBook: ", date2);
  // console.log("guestBook: ", JSON.stringify(date2numbers));

  // React.useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_PUBLIC_URL}room-packages`)
  //     .then((res) => {
  //       if (res) {
  //         const info = res.data.data;
  //         console.log("response user profile msg", info);
  //         setArray([...info]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const handleChange = (e) => {
    setDate1(e);
  };

  React.useEffect(() => {
    if (guest === null || room === null || date1 === date2) {
      // console.log("react usestae is running");
      setGuest(1);
      setRoom(1);
      setDate2(date1.addDays(1));
    } else {
      setDate1(new Date(`${date1numbers}`));
      setDate2(new Date(`${date2numbers}`));
    }
  }, []);

  React.useEffect(() => {
    if (
      date1.getTime() === date2.getTime() ||
      date1.getTime() >= date2.getTime() ||
      date1.getDate() === date2.getDate()
    ) {
      setDate2(date1.addDays(1));
    }
  }, [handleChange, date1, date2, setDate2, setDate1]);

  React.useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_PUBLIC_URL
        }room-packages?number_of_rooms=${room}&checkin_date=${moment(
          date1
        ).format("YYYY-MM-DD")}&checkout_date=${moment(date2).format(
          "YYYY-MM-DD"
        )}`
      )
      .then((res) => {
        if (res) {
          const info = res.data.data;
          // console.log("response user profile msg", info);
          setArray([...info]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [room, date1, date2]);

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
      date1.getDate() !== date2.getDate() &&
      date1 !== null &&
      date2 !== null &&
      guest !== 0 &&
      room !== 0
    ) {
      setValid(true);
    } else {
      console.log("error");
    }
  };

  // React.useEffect(() => {
  //   if (valid) {
  //     console.log(data);
  //   }
  // }, [valid, handleSubmit]);

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
      date1.getDate() !== date2.getDate() &&
      date1 !== null &&
      date2 !== null &&
      guest !== 0 &&
      room !== 0
    ) {
      setValid(true);
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
        {width < 1075 ? (
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
                  {/* Save */}Search Rooms
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
              }}
            >
              <div className="box">
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
                <p>
                  Please note that the max capacity in one room is 2 adults + 1
                  adult (at additional cost)
                </p>
                <div className="bottom">
                  <button className="btn" onClick={() => setOn(false)}>
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
                    <li>Complimentary {doc.services.join(" + ")} available.</li>
                    <li>Price for 2 adults + 1 adult (at additional cost) </li>
                    <li>
                      Extra mattress available at extra charges.{" "}
                      <a onClick={() => handleCharge(doc.id)}>View charges</a>
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
                      onClick={() => {
                        setExec(doc.name);
                        setAmount(doc.total_amount);
                        setRight(true);
                      }}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactModal
        draw={right}
        setDraw={setRight}
        guest={guest}
        room={room}
        date1={date1}
        date2={date2}
        name={exec}
        amount={amount}
      />
      <Cancel draw={draw} setDraw={setDraw} />
      <Charge draw={charge} setDraw={setCharge} view={view} />
      <Footer />
    </>
  );
};

export default Book;
