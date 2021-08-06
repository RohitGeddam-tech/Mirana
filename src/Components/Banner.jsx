import React, { useState } from "react";
import banner from "../image/Banner.png";
import arrow from "../image/Frame1.png";
import arrow2 from "../image/Frame2.png";
import add from "../image/add.png";
import minus from "../image/minus.png";
import "./Banner.scss";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CustomSlider from "./Slider";

const bannerDetails = [
  {
    image: banner,
    title: "Mirana Resort",
    head: "Escape the chaos with",
    para: "An experience awaits to welcome you.",
  },
  // {
  //   image: banner,
  //   title: "Get your business back on track",
  //   head: "Escape the chaos with",
  //   para:'An experience awaits to welcome you.'
  // },
];

const Banner1 = ({ image, title, head, para }) => {
  return (
    <div className="banner1">
      <img src={image} alt="banner" />
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
  const [num, setNum] = useState(1);

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
      date1.getTime() >= date2.getTime()
    ) {
      setDate2(date1.addDays(1));
    }
  }, [handleChange, date1, setDate2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`date1: ${date1.toString().slice(0, 10)}; 
    date2: ${date2.toString().slice(0, 10)};
    Guests: ${num};
    `);
  };

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
            {/* <p><img src={number} alt="num" />No. of guests</p> */}
            <p>No. of guests</p>
            <div className="text-input">
              {num === 1 ? (
                <span style={{ opacity: "0.5" }}>
                  <img src={minus} alt="minus" />
                </span>
              ) : (
                <span onClick={() => setNum(num - 1)}>
                  <img src={minus} alt="minus" />
                </span>
              )}
              <h1>{num} Guests</h1>
              <span onClick={() => setNum(num + 1)}>
                <img src={add} alt="add" />
              </span>
            </div>
          </div>
          <div className="date">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disablePast={true}
                // label={`${<img src={cal} alt="num" />} Check-in date`}
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
            Proceed
            <span>
              <img src={arrow2} alt="arrow" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
