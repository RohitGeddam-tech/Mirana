import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./BookBack.scss";
import { Modal, Select } from "@material-ui/core";
import clear from "../image/clear.png";
import create from "../image/create.png";
import check from "../image/check.png";
import dots from "../image/dots.png";
import below from "../image/down.png";
import black from "../image/black.png";
import green from "../image/green.png";
import orange from "../image/orange.png";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { NavHashLink } from "react-router-hash-link";

const data = [
  {
    name: "Darshan Sawant",
    phone: 9869753456,
    mail: "darshansawant743@gmail.com",
    check_in: "2021-10-21",
    check_out: "2021-10-22",
    pack: "Luxury",
    room: 201,
    status: "Paid",
  },
  {
    name: "Kiran Patil",
    phone: 8108345778,
    mail: "ksp@gmail.com",
    check_in: "2021-10-21",
    check_out: "2021-10-22",
    pack: "Paradise",
    room: 205,
    status: "Pending",
  },
  {
    name: "Rohit Geddam",
    phone: 7977250075,
    mail: "rohitgeddam0@gmail.com",
    check_in: "2021-10-21",
    check_out: "2021-10-22",
    pack: "Executive",
    room: 104,
    status: "Pending",
  },
];

const statusData = [
  {
    key: "1",
    text: "Paid",
    value: "Paid",
    image: { avatar: true, src: green },
  },
  {
    key: "2",
    text: "Pending",
    value: "Pending",
    image: { avatar: true, src: orange },
  },
];

const Status = ({
  status,
  handleSelect,
  room,
  handleSettings,
  handleCheck,
}) => {
  const dotData = [
    {
      key: "1",
      text: "Edit booking",
      value: "Edit booking",
      icon: "pencil alternate",
      handle: handleSettings,
    },
    {
      key: "2",
      text: "Checkout",
      value: "Checkout",
      icon: "check",
      handle: handleCheck,
    },
  ];
  return (
    <div className="select">
      <Dropdown
        selection
        defaultValue={status}
        onChange={(e) => handleSelect(e, room)}
        button
        fluid
        className="p"
        options={statusData}
      ></Dropdown>
      <Dropdown icon="ellipsis vertical" className="dots">
        <Dropdown.Menu>
          {dotData.map((doc) => (
            <Dropdown.Item
              text={doc.text}
              icon={doc.icon}
              onClick={() => doc.handle(room)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const BookBack = () => {
  const [open, setOpen] = useState(false);
  const [down, setDown] = useState(false);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState("");
  const [selected, setSelected] = useState("");
  const [door, setDoor] = useState();
  const [array, setArray] = useState([...data]);
  const [form, setForm] = useState([]);
  const [popup, setPopup] = useState([]);
  const [error, setError] = useState({});
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [stat, setStat] = useState(false);
  const [number, setNumber] = useState("");
  const [num, setNum] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [mailInvalid, setMailInvalid] = useState(false);
  const [right, setRight] = useState(false);

  const handleSearch = (e) => {
    // console.log("e value", e);
    setSearch(e.target.value);
  };

  const handleSelect = (e, room) => {
    // console.log(e.target.value);
    setSel(e.target.value);
    setDoor(room);
  };

  React.useEffect(() => {
    array.forEach((members) => {
      if (members.room === door) {
        members.status = sel ? sel : members.status;
        // console.log({ message: "member array updated", members });
      }
    });
    // console.log("handleSelect useEffect is running");
    setArray(array);
    // console.log("after change: ", array);
    return array;
  }, [handleSelect]);

  const handleSettings = (room) => {
    array.forEach((members) => {
      if (members.room === room) {
        setForm({
          name: members.name,
          phone: members.phone,
          mail: members.mail,
          check_in: members.check_in,
          check_out: members.check_out,
          pack: members.pack,
          room: members.room,
          status: members.status,
        });
        // console.log({ message: "form array deployed", form });
        // setModal(true);
        setOpen(true);
      }
    });
  };

  const handleCheck = (room) => {
    array.forEach((members) => {
      if (members.room === room) {
        setForm({
          name: members.name,
          phone: members.phone,
          mail: members.mail,
          check_in: members.check_in,
          check_out: members.check_out,
          pack: members.pack,
          room: members.room,
          status: members.status,
        });
        // console.log({ message: "form array deployed", form });
        setModal(true);
        // setOpen(true);
      }
    });
  };

  // React.useEffect(() => {
  //   console.log({ message: "form array deployed", form });
  // }, [handleSettings, modal]);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const handleDate = (e) => {
    setDate1(e);
  };

  React.useEffect(() => {
    setDate1(new Date(`${form.check_in}`));
    // console.log(date1);
    setDate2(new Date(`${form.check_out}`));
    // console.log(date2);
  }, []);

  React.useEffect(() => {
    if (popup === []) {
      setDate1(new Date(`${form.check_in}`));
      // console.log(date1);
      setDate2(new Date(`${form.check_out}`));
      // console.log(date2);
      setSelected(form.pack);
      setName(form.name);
      setNumber(form.room);
      setPhone(form.phone);
      setMail(form.mail);
    }
  }, [form]);

  React.useEffect(() => {
    if (
      date1.getTime() === date2.getTime() ||
      date1.getTime() >= date2.getTime() ||
      date1.getDate() === date2.getDate()
    ) {
      setDate2(date1.addDays(1));
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
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phone.length);
    console.log(phone);
    console.log("phoneInvalid", phoneInvalid);
    if (!(nameInvalid && mailInvalid) && phone.length === 10) {
      setRight(true);
      setPopup({
        name: name,
        phone: phone,
        mail: mail,
        check_in: date1,
        check_out: date2,
        pack: selected,
        room: number,
      });
      setOpen(false);
    } else {
      setRight(false);
      console.log("error submit: ", error);
    }
  };

  React.useEffect(() => {
    if (right) {
      console.log("onForm submit: ", popup);
    }
  }, [handleSubmit]);

  const checkout = () => {
    setDate1(new Date(`${form.check_in}`));
    setDate2(new Date(`${form.check_out}`));
    // setSelected(form.pack);
    setName(form.name);
    setNumber(form.room);
    setPhone(form.phone);
    setMail(form.mail);
    setModal(false);
  };

  const roomArray = [
    {
      room: 101,
    },
    {
      room: 102,
    },
    {
      room: 103,
    },
    {
      room: 104,
    },
    {
      room: 105,
    },
    {
      room: 201,
    },
    {
      room: 202,
    },
    {
      room: 203,
    },
    {
      room: 204,
    },
    {
      room: 205,
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="bookMain">
        <div className="drop">
          <div className="shown" onClick={() => setDown(!down)}>
            <img src={black} alt="account" />
            <h1>Rajeev Chakrabarti</h1>
            <img src={below} alt="down-arrow" />
          </div>
          <div className={`down ${down ? "active" : null}`}>
            <p>Settings</p>
            <p>Log Out</p>
          </div>
        </div>
        <div className="contain">
          <h1>Bookings</h1>
          <div className="Navigation">
            <div className="links">
              <NavHashLink to="/BookBack#top" activeClassName="activate">
                Ongoing
              </NavHashLink>
              <NavHashLink
                to="/BookBack/Upcoming#top"
                activeClassName="activate"
              >
                Upcoming
              </NavHashLink>
              <NavHashLink
                to="/BookBack/Completed#top"
                activeClassName="activate"
              >
                Completed
              </NavHashLink>
              <NavHashLink
                to="/BookBack/Cancelled#top"
                activeClassName="activate"
              >
                Cancelled
              </NavHashLink>
            </div>
            <button className="btn" onClick={() => setOpen(true)}>
              Add a new booking
            </button>
          </div>
          <div className="searchBox">
            <div className="text-input">
              <input
                value={search}
                className="input"
                name="search"
                onChange={handleSearch}
                pattern="^([A-Za-z ,.'`-]{0,})$"
                type="text"
                // required
              />
              <label htmlFor="name" className="input-placeholder">
                Search By Name
              </label>
            </div>
          </div>
          <table className="mainData">
            <tr>
              <th>Guest Name</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Check-in</th>
              <th>
                <p>Check-out</p>
              </th>
              <th>Package type</th>
              <th>Room No.</th>
              <th>Payment Status</th>
            </tr>
            {array.map((doc) => (
              <tr>
                <td>{doc.name}</td>
                <td>{doc.phone}</td>
                <td>{doc.mail}</td>
                <td>{moment(doc.check_in).format("DD MMM YYYY")}</td>
                <td>{moment(doc.check_out).format("DD MMM YYYY")}</td>
                <td>{doc.pack}</td>
                <td>{doc.room}</td>
                <td>
                  <Status
                    // setOpen={setOpen}
                    status={doc.status}
                    // open={open}
                    handleSettings={handleSettings}
                    handleSelect={handleSelect}
                    handleCheck={handleCheck}
                    room={doc.room}
                  />
                </td>
              </tr>
            ))}
          </table>
          <Modal
            className="modalBack"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div className="box">
              <div className="head">
                <p>Edit Booking</p>
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => setOpen(false)}
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
                      // minDate={date1}
                      value={date1}
                      onChange={handleDate}
                      inputVariant="outlined"
                      format="E, dd MMM"
                      animateYearScrolling
                    />
                    <DatePicker
                      disablePast={true}
                      label={`Check-out date`}
                      inputVariant="outlined"
                      minDate={date1}
                      format="E, dd MMM"
                      value={date2}
                      onChange={setDate2}
                      animateYearScrolling
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="select">
                  <h5>Package Type</h5>
                  <p onClick={() => setStat(!stat)}>
                    {selected}{" "}
                    <span className="spanRight">
                      <img src={below} alt="down" />
                    </span>
                  </p>
                  {stat ? (
                    <div className="opt">
                      <input
                        type="button"
                        value="Executive"
                        onClick={(e) => {
                          setSelected(e.target.value);
                          setStat(false);
                        }}
                      />
                      <input
                        type="button"
                        value="Luxury"
                        onClick={(e) => {
                          setSelected(e.target.value);
                          setStat(false);
                        }}
                      />
                      <input
                        type="button"
                        value="Paradise"
                        onClick={(e) => {
                          setSelected(e.target.value);
                          setStat(false);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="select">
                  <h5>Room No.</h5>
                  <p onClick={() => setNum(!num)}>
                    {number}{" "}
                    <span className="spanRight">
                      <img src={below} alt="down" />
                    </span>
                  </p>
                  {num ? (
                    <div className="opt">
                      {roomArray.map((doc) => (
                        <input
                          type="button"
                          value={doc.room}
                          onClick={(e) => {
                            setNumber(e.target.value);
                            setNum(false);
                          }}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
                <button className="btn" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </Modal>
          <Modal
            className="modalBack"
            open={modal}
            onClose={() => {
              setModal(false);
            }}
          >
            <div className="box">
              <div className="head">
                <p>Confirmation for checkout</p>
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => setModal(false)}
                />
              </div>
              <div className="checkInfo">
                <div className="top">
                  <div className="internal">
                    <p>Name:</p>
                    <h5>{form.name}</h5>
                  </div>
                  <div className="internal">
                    <p>Package Type:</p>
                    <h5>{form.pack}</h5>
                  </div>
                </div>
                <div className="top">
                  <div className="internal">
                    <p>Room No.:</p>
                    <h5>{form.room}</h5>
                  </div>
                  <div className="internal">
                    <p>Payment Status:</p>
                    <Dropdown
                      selection
                      defaultValue={form.status}
                      onChange={(e) => setSel(e.target.value)}
                      button
                      fluid
                      className="p"
                      options={statusData}
                    ></Dropdown>
                  </div>
                </div>
                <div className="bottom">
                  <button className="loginBtn" onClick={() => setModal(false)}>
                    cancel
                  </button>
                  <button className="btn" onClick={checkout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default BookBack;
