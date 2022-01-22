import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import moment from "moment";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import moment from "moment";

const NewMember = ({ draw, setDraw }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  const [guest, setGuest] = useState("");
  // const [room, setRoom] = useState("");
  //   const [date1, setDate1] = useState(new Date());
  //   const [date2, setDate2] = useState(new Date());
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [right, setRight] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [mailInvalid, setMailInvalid] = useState(false);
  const [popup, setPopup] = useState([]);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const handleDate = (e) => {
    setDate1(e);
    setDate2(new Date());
  };

  React.useEffect(() => {
    if (date1 !== null && date2 !== null) {
      if (
        date1.getTime() === date2.getTime() ||
        date1.getTime() >= date2.getTime() ||
        date1.getDate() === date2.getDate()
      ) {
        setDate2(date1.addDays(1));
      }
    }
  }, [handleDate, date1, date2, setDate2, setDate1]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        setNameInvalid(!e.target.validity.valid);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "mail":
        setMail(e.target.value);
        setMailInvalid(!e.target.validity.valid);
        break;
      case "guest":
        setGuest(e.target.value);
        break;
      case "room":
        setNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const [packid, setPackid] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(nameInvalid && mailInvalid) && phone.length > 8) {
      setRight(true);
      setPopup({
        name: name,
        mobile: phone,
        email: mail,
        checkin_date: moment(date1).format("YYYY-MM-DD"),
        checkout_date: moment(date2).format("YYYY-MM-DD"),
        package: packid,
        number_of_rooms: number,
        number_of_guests: guest,
      });
      setDraw(false);
    } else {
      setRight(false);
    }
  };

  const addData = async () => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (right) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}admin/bookings`,
          popup,
          {
            headers: headers,
          }
        );
        if (res) {
          // setStart(false);
          setPopup({});
          setDraw(false);
          window.location.reload();
          // setForm({});
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    if (popup && Object.entries(popup).length > 0) {
      addData();
    }
  }, [handleSubmit]);

  const selectedArray = [
    { key: "1", text: "Executive", value: "Executive" },
    { key: "2", text: "Luxury", value: "Luxury" },
    { key: "3", text: "Paradise", value: "Paradise" },
  ];

  return (
    <>
      <Modal
        className="modalBack"
        open={draw}
        onClose={() => {
          setDraw(false);
        }}
      >
        <div className="box">
          <div className="head">
            <p>Edit Booking</p>
            <img
              className="img"
              src={clear}
              alt="cancel"
              onClick={() => setDraw(false)}
            />
          </div>
          <form className="enterData" onSubmit={handleSubmit}>
            <div className="text-input">
              <input
                value={name}
                className="input"
                name="name"
                pattern="^([A-Za-z ,.'`-]{2,30})$"
                onChange={handleChange}
                type="text"
                required
              />
              <label htmlFor="name" className="input-placeholder">
                Guest Name
              </label>
            </div>
            <div className="text-input">
              <input
                value={phone}
                type="number"
                className="input"
                name="phone"
                onChange={handleChange}
                pattern="^([0-9]{10})$"
                required
              />
              <label htmlFor="phone" className="input-placeholder">
                Mobile No.
              </label>
            </div>
            <div className="text-input">
              <input
                className="input"
                value={mail}
                name="mail"
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                type="email"
                required
              />
              <label htmlFor="mail" className="input-placeholder">
                Email
              </label>
            </div>
            <div className="date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disablePast={true}
                  label={`Check-in date`}
                  clearable
                  // minDate={date1}
                  value={date1}
                  onChange={handleDate}
                  inputVariant="outlined"
                  format="E, dd MMM"
                  animateYearScrolling
                />
                <DatePicker
                  disablePast={true}
                  clearable
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
            <div className="select">
              {selected === "" ? null : <h5>Package Type</h5>}
              <Dropdown
                selection
                defaultValue={selected}
                placeholder="Package Type"
                onChange={(e) => {
                  setSelected(e.target.innerText);
                  if (e.target.innerText === "Paradise") {
                    setPackid(3);
                  }
                  if (e.target.innerText === "Luxury") {
                    setPackid(2);
                  }
                  if (e.target.innerText === "Executive") {
                    setPackid(1);
                  }
                }}
                button
                fluid
                className="d"
                options={selectedArray}
              ></Dropdown>
            </div>
            <div className="text-input">
              <input
                value={guest}
                type="number"
                className="input"
                name="guest"
                onChange={handleChange}
                pattern="^([0-9]{10})$"
                required
              />
              <label htmlFor="guest" className="input-placeholder">
                No. of guests.
              </label>
            </div>
            <div className="text-input">
              <input
                value={number}
                type="number"
                className="input"
                name="room"
                onChange={handleChange}
                pattern="^([0-9]{10})$"
                required
              />
              <label htmlFor="nummber" className="input-placeholder">
                No. of rooms.
              </label>
            </div>
            {/* <div className="select">
              {number === "" ? null : <h5>Room No.</h5>}
              {number === "" ? (
                <Dropdown
                  selection
                  defaultValue={number.slice(1, -1)}
                  placeholder="Room No."
                  onChange={(e) => setNumber(e.target.innerText)}
                  button
                  fluid
                  className="d"
                  options={roomArray}
                ></Dropdown>
              ) : (
                <Dropdown
                  selection
                  defaultValue={number}
                  onChange={(e) => setNumber(e.target.innerText)}
                  button
                  fluid
                  className="d"
                  options={roomArray}
                ></Dropdown>
              )}
            </div> */}
            <button className="btn" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NewMember;
