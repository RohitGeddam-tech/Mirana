import React, { useState } from "react";
import banner from "../image/Banner.png";
import arrow from "../image/Frame1.png";
import arrow2 from "../image/Frame2.png";
import "./Banner.scss";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const Banner = () => {
  const [date1, setDate1] = useState(new Date());
  const [num, setNum] = useState(1);
  const [item, setItem] = useState(false);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const handleChange = (e) => {
    setDate1(e);
    // setDate2(e.addDays(1));
    // if (
    //   date1.getTime() === date2.getTime() &&
    //   date1.getTime() >= date2.getTime()
    // ) {
    //   setDate1(e);
    //   setDate2(e.addDays(1));
    //   setItem(true);
    //   console.log(date1, "date", date2, item);
    // }
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
      setItem(true);
      // console.log(date1, "date", date2, item);
    }
  }, [handleChange, date1, setDate2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`date1: ${date1}; 
    date2: ${date2};
    Guests: ${num};
    `);
  };

  return (
    <div className="banner">
      <img src={banner} alt="banner" />
      <div className="container">
        <h2>Escape the chaos with</h2>
        <h1>Mirana Resort</h1>
        {/* <p>
          Tucked away into a private green oasis, by the pristine beaches of
          Nagaon - Alibaug, a boutique hotel experience waits to welcome you
          soon as the pandemic dust settles. Whether you’re looking for the much
          needed escape, planning your picture-perfect special occasions or
          seeking your next creative inspiration, at Mirana, we can make your
          getaway wishes come true.
        </p> */}
        <p>An experience awaits to welcome you.</p>
        <button className="btn">
          Learn More
          <span>
            <img src={arrow} alt="arrow" />
          </span>
        </button>
      </div>
      <form className="avail" onSubmit={handleSubmit}>
        <h1>Select a date and check availability</h1>
        <div className="textInput">
          <p>No. of guests</p>
          <div className="text-input">
            {num === 0 ? (
              <span>-</span>
            ) : (
              <span onClick={() => setNum(num - 1)}>-</span>
            )}
            <h1>{num} Guests</h1>
            {/* <input
              value={details.mobile}
              type="text"
              className="input"
              name="mobile"
              onChange={handleChange}
              pattern="[0-9]{9}"
            /> */}
            <span onClick={() => setNum(num + 1)}>+</span>
          </div>
        </div>
        <div className="date">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disablePast={true}
              label="Check-in date"
              value={date1}
              onChange={handleChange}
              // onAbort={handleChange}
              animateYearScrolling
            />
            <DatePicker
              disablePast={true}
              label="Check-out date"
              minDate={date2}
              value={date2}
              onChange={setDate2}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>
        </div>
        <button className="btn" type="submit">
          Proceed
          <span>
            <img src={arrow2} alt="arrow" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Banner;
