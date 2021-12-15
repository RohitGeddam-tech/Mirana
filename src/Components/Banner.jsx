import React, { useState, useEffect } from "react";
import banner from "../image/Banner.webp";
import bannerMob from "../image/mobBanner.webp";
// import banner from "../image/banner.png";
import useWindowSize from "./useWindowSize";
import arrow from "../image/Frame1.png";
import arrow2 from "../image/Frame2.png";
import add from "../image/add.png";
import clear from "../image/clear.png";
import minus from "../image/minus.png";
import "./Banner.scss";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CustomSlider from "./Slider";
import { Modal } from "@material-ui/core";

const bannerDetails = [
  {
    image: banner,
    title: "Mirana Resort",
    head: "Escape the chaos with",
    para: "An experience awaits to welcome you.",
  },
  // {
  //   image: banner,
  //   title: "Mirana Resort",
  //   head: "Escape the chaos  with ultra super miramar discounts",
  //   para:'An experience awaits to welcome you.'
  // },
];

const Banner1 = ({ image, title, head, para }) => {
  const [width] = useWindowSize();
  return (
    <div className="banner1">
      {width > 540 ? (
        <img src={image} alt="banner" loading="lazy" />
      ) : (
        <img src={bannerMob} alt="banner" />
        // <img src={bannerMob} alt="banner" loading="lazy" />
      )}
      <div className="container">
        <h2>{head}</h2>
        <h1>{title}</h1>
        <p>{para}</p>
        <div className="bottom">
          <button className="btn">
            Learn More
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const [date1, setDate1] = useState(new Date());
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(1);
  const [data, setData] = useState({});
  const [on, setOn] = useState(false);
  const [valid, setValid] = useState(false);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const handleChange = (e) => {
    setDate1(e);
  };

  const [date2, setDate2] = useState(new Date());

  React.useEffect(() => {
    setDate2(date1.addDays(1));
  }, []);

  React.useEffect(() => {
    if (
      date1.getTime() === date2.getTime() ||
      date1.getTime() >= date2.getTime() ||
      date1.getDate() === date2.getDate()
    ) {
      setDate2(date1.addDays(1));
    }
  }, [handleChange, date1, setDate2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // var skip = 0;
    // if (guest % 3 == 1) {
    //   setRoom(room + 1);
    //   console.log(room)
    //   skip = 1;
    // }
    // for (var x = guest; x <= 100; x++) {
    //   var skip = 0;
    //   if (x % 3 == 1) {
    //     setRoom(room + 1);
    //     skip = 1;
    //   }
    //   if (!skip) {
    //     document.write(x);
    //   }
    //   document.write("<br>"); //line breaks to enhance output readability
    // }
    setData({
      guest: guest,
      room: room,
      date1: date1,
      date2: date2,
    });
    // console.log("data link-/: ",data);
    // console.log(`date1: ${date1.toString().slice(0, 10)}; 
    // date2: ${date2.toString().slice(0, 10)};
    // Guests: ${guest};
    // rooms: ${room}
    // `);
    if (!date1 || !date2 || guest !== 0 || room !== 0) {
      setValid(true);
    }
    // else {
    //   console.log("error");
    // }
  };

  useEffect(() => {
    if (valid) {
      // {
      //   data === {}
      //     ? console.log("empty data state")
      //     : sessionStorage.setItem("bannerData", JSON.stringify(data));
      // }
      // console.log("data link-/: ", data);
      sessionStorage.setItem("guestData", JSON.stringify(guest));
      sessionStorage.setItem("roomData", JSON.stringify(room));
      sessionStorage.setItem("date1Data", JSON.stringify(date1));
      sessionStorage.setItem("date2Data", JSON.stringify(date2));
      window.location.href = '/Book#top'
    }
  }, [data, valid]);

  return (
    <div className="banner">
      <CustomSlider>
        {bannerDetails.map((item, index) => (
          <div key={index}>
            <Banner1 {...item} />
          </div>
        ))}
      </CustomSlider>
      <form className="avail" onSubmit={handleSubmit}>
        <div className="first">
          <h1>Select a date and check availability</h1>
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
                format="E, dd MMM"
                animateYearScrolling
              />
              <DatePicker
                disablePast={true}
                label={`Check-out date`}
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
            Check
            <span>
              <img src={arrow2} alt="arrow" />
            </span>
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
            <h1>Adults</h1>
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
            Please note that the max capacity in one room is 2 adults + 1 adult
            (at additional cost)
          </p>
          <div className="bottom">
            <button className="btn" onClick={() => setOn(false)}>Proceed</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Banner;
