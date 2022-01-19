import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Upcoming.scss";
import { Modal, RootRef, Select, Snackbar } from "@material-ui/core";
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
import Settings from "./Settings";
import NewMember from "./NewMember";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import { Alert } from "@material-ui/lab";
// import Select from '@material-ui/core/Select';
import Checkbox from "@material-ui/core/Checkbox";
import { components } from "react-select";
import ReactSelect from "react-select";

const Option = (props) => {
  // console.log("props: ", { ...props });
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Status = ({
  status,
  room,
  handleSettings,
  handleCheck,
  handleCancel,
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
      text: "Check in",
      value: "Checkin",
      icon: "check",
      handle: handleCheck,
    },
    {
      key: "3",
      text: "Cancel Booking",
      value: "cancel",
      icon: "cancel",
      handle: handleCancel,
    },
  ];
  return (
    <div className="select">
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

const UpBack = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [personName, setPersonName] = useState([]);
  const [searched, setSearched] = useState("");
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [door, setDoor] = useState();
  const [array, setArray] = useState([]);
  const [form, setForm] = useState([]);
  const [popup, setPopup] = useState([]);
  const [error, setError] = useState({});
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [stat, setStat] = useState(false);
  const [number, setNumber] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [guest, setGuest] = useState("");
  const [room, setRoom] = useState("");
  const [phone, setPhone] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [mailInvalid, setMailInvalid] = useState(false);
  const [right, setRight] = useState(false);
  const [draw, setDraw] = useState(false);
  const [success, setSuccess] = useState(false);
  const [roomArray, setRoomArray] = useState([]);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleSearch = (e) => {
    // console.log("e value", e);
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearched(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  const getData = async () => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    // console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (
      localStorage.getItem("role") !== null &&
      localStorage.getItem("role") === "admin"
    ) {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_URL}admin/upcoming-bookings${
            moment(new Date()).format("YYYY-MM-DD") !==
              moment(startDate).format("YYYY-MM-DD") ||
            moment(new Date()).add(1, "days").format("YYYY-MM-DD") !==
              moment(endDate).format("YYYY-MM-DD") ||
            searched !== ""
              ? "?"
              : ""
          }${
            (moment(new Date()).format("YYYY-MM-DD") !==
              moment(startDate).format("YYYY-MM-DD") ||
              moment(new Date()).add(1, "days").format("YYYY-MM-DD") !==
                moment(endDate).format("YYYY-MM-DD")) &&
            moment(endDate).format("YYYY-MM-DD") >
              moment(startDate).format("YYYY-MM-DD")
              ? `checkin_date=${moment(startDate).format(
                  "YYYY-MM-DD"
                )}&checkout_date=${moment(endDate).format("YYYY-MM-DD")}`
              : ""
          }${searched !== "" ? `&search=${searched}` : ""}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res) {
            const info = res.data.data;
            // console.log("response user profile msg", info);
            // console.log("file array state1: ", array.length);
            setArray([...info]);
            // console.log("file array state2: ", array.length);
            // console.log("file array state: ", array);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  React.useEffect(() => {
    if (
      moment(endDate).format("YYYY-MM-DD") <=
      moment(startDate).format("YYYY-MM-DD")
    ) {
      setEndDate(moment(startDate).add(1, "days").format("YYYY-MM-DD"));
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    if (
      moment(endDate).format("YYYY-MM-DD") >
      moment(startDate).format("YYYY-MM-DD")
    ) {
      getData();
    }
  }, [searched, startDate, endDate]);

  const handleSettings = (room) => {
    array.forEach((members) => {
      if (members.id === room) {
        setForm({
          id: members.id,
          name: members.user.name,
          phone: members.user.mobile,
          mail: members.user.email,
          check_in: members.checkin_date,
          check_out: members.checkout_date,
          pack: members.package.name,
          status: members.payment_status,
          roomNo: members.number_of_rooms,
          guest: members.number_of_guests,
        });
        // console.log({ message: "form array deployed", form });
        // setModal(true);
        setOpen(true);
      }
    });
  };

  const handleCheck = (room) => {
    array.forEach((members) => {
      if (members.id === room) {
        setForm({
          id: members.id,
          name: members.user.name,
          phone: members.user.mobile,
          mail: members.user.email,
          check_in: members.checkin_date,
          check_out: members.checkout_date,
          pack: members.package.name,
          status: members.payment_status,
          roomNo: members.number_of_rooms,
          guest: members.number_of_guests,
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
    // if (popup === []) {
    setDate1(new Date(`${form.check_in}`));
    // console.log(date1);
    setDate2(new Date(`${form.check_out}`));
    // console.log(date2);
    setSelected(form.pack);
    setName(form.name);
    setNumber(form.room);
    setPhone(form.phone);
    setMail(form.mail);
    setGuest(form.guest);
    setRoom(form.roomNo);
    setNum(form.id);
    // }
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
      case "guest":
        setGuest(e.target.value);
        break;
      case "room":
        setRoom(e.target.value);
        break;
      default:
        break;
    }
  };

  const [packid, setPackid] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!(nameInvalid && mailInvalid) && phone.length > 8) ||
      phone === form.phone
    ) {
      setRight(true);
      setPopup({
        name: name,
        mobile: phone,
        email: mail,
        checkin_date: moment(date1).format("YYYY-MM-DD"),
        checkout_date: moment(date2).format("YYYY-MM-DD"),
        package: packid,
        number_of_rooms: room,
        number_of_guests: guest,
      });
      setOpen(false);
    } else {
      setRight(false);
      console.log("error submit: ", error);
    }
  };

  const putData = async () => {
    if (right && packid > 0) {
      console.log("onForm submit: ", popup);
      const tokenData = localStorage.getItem("access-token");
      const token = JSON.stringify(tokenData);
      // console.log(token.slice(1, -1));
      const headers = {
        Authorization: `Bearer ${token.slice(1, -1)}`,
      };
      if (right) {
        // console.log(form);
        try {
          const res = await axios.put(
            `${process.env.REACT_APP_PUBLIC_URL}admin/upcoming-bookings/${num}`,
            popup,
            {
              headers: headers,
            }
          );
          if (res) {
            console.log(res.data);
            setOpen(false);
            setRight(false);
            // console.log("response msg", res);
            setSuccess(res.data.success);
            // console.log(success);
            const { message = "Booking updated successfully" } = res.data;
            setAlertState({ open: true, message, type: "success" });
            // console.log(popup);
            window.location.reload();
            // setForm({});
          }
        } catch (err) {
          // console.log(err);
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
          setOpen(false);
          setRight(false);
        }
      }
    }
  };

  React.useEffect(() => {
    if (right) {
      // console.log("onForm submit: ", popup);
      putData();
    }
  }, [handleSubmit]);

  const handleAlertClose = () => {
    setAlertState({ open: false, message: "", type: "success" });
  };

  const [arrayRooms, setArrayRooms] = useState([]);
  // const [roomValue, setRoomValue] = useState([]);

  const handleMultiple = (event) => {
    // console.log(event);
    setPersonName(event);
  };

  // React.useEffect(() => {
  //   console.log(personName);
  //   // console.log("room value: ", roomValue);
  //   console.log("array of rooms", arrayRooms);
  // }, [handleMultiple]);

  const checkout = async () => {
    // setModal(false);
    // const { sub } = handleMultiple();
    // console.log(personName);
    const room = personName.map((doc) => doc.value);

    // console.log("room sent: ", room);
    const rooms = {
      rooms: room,
    };
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (personName.length > 0) {
      // console.log(form);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}admin/upcoming-bookings-checkin/${num}`,
          rooms,
          {
            headers: headers,
          }
        );
        if (res) {
          console.log(res.data);
          setModal(false);
          // console.log(popup);
          setPersonName([]);
          setPopup({});
          window.location.reload();
          // setForm({});
        }
      } catch (err) {
        // console.log(name);
        console.log(err);
        setModal(false);
        alert("error");
      }
    }
  };

  React.useEffect(async () => {
    // setModal(false);
    // console.log(personName);
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    // console.log(form);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}admin/available-rooms?checkin_date=2021-12-06&checkout_date=2021-12-07`,
        {
          headers: headers,
        }
      );
      if (res) {
        // console.log(res.data.data);
        // setModal(false);
        setRoomArray([...res.data.data]);
        // console.log(popup);
        // setForm({});
      }
    } catch (err) {
      // console.log(name);
      console.log(err);
      // setModal(false);
    }
  }, []);

  const selectedArray = [
    { key: "1", text: "Executive", value: "Executive" },
    { key: "2", text: "Luxury", value: "Luxury" },
    { key: "3", text: "Paradise", value: "Paradise" },
  ];

  const [cancelModal, setCancelModal] = useState(false);

  const handleCancel = (id) => {
    setNum(id);
    setCancelModal(true);
  };

  const Canceled = async () => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    // console.log(form);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PUBLIC_URL}admin/upcoming-bookings-cancel/${num}`,
        {},
        {
          headers: headers,
        }
      );
      if (res) {
        console.log(res.data);
        setCancelModal(false);
        // setRight(false);
        // console.log("response msg", res);
        setSuccess(res.data.success);
        // console.log(success);
        const { message = "Booking canceled successfully" } = res.data;
        setAlertState({ open: true, message, type: "success" });
        // console.log(popup);
        // window.location.reload();
        // setForm({});
      }
    } catch (err) {
      // console.log(err);
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
      setCancelModal(false);
    }
  };

  React.useEffect(() => {
    if (roomArray.length > 0) {
      setArrayRooms(
        roomArray.map((doc) => ({ value: doc.id, label: doc.room }))
      );
    }
  }, [roomArray]);

  return (
    <>
      <Sidebar />
      <div className="upMain">
        <Settings />
        <div className="contain">
          <h1>Bookings</h1>
          <div className="Navigation">
            <div className="links">
              <NavHashLink to="/BookBack#top" activeClassName="activate">
                Ongoing
              </NavHashLink>
              <NavHashLink
                to="/BookBack/upcoming#top"
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
            <button className="btn" onClick={() => setDraw(true)}>
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
              <th>
                Check-in
                <div
                  className="dateFil"
                  // style={{ opacity: "0", width: "15px", height: "20px", cursor:"pointer" }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      // disablePast={true}
                      label={`Check-in`}
                      value={startDate}
                      onChange={setStartDate}
                      inputVariant="outlined"
                      format="E, dd MMM"
                      animateYearScrolling
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </th>
              <th
                className={`${
                  moment(new Date()).format("YYYY-MM-DD") !==
                    moment(startDate).format("YYYY-MM-DD") ||
                  moment(new Date()).add(1, "days").format("YYYY-MM-DD") !==
                    moment(endDate).format("YYYY-MM-DD") ||
                  searched !== ""
                    ? "p"
                    : ""
                }`}
              >
                Check-out
                <div
                  className="dateFil"
                  // style={{ opacity: "0.3", width: "15px", height: "20px", cursor:"pointer" }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      // disablePast={true}
                      label={`Check-out`}
                      minDate={startDate}
                      value={endDate}
                      onChange={setEndDate}
                      inputVariant="outlined"
                      format="E, dd MMM"
                      animateYearScrolling
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </th>
              <th>Guests</th>
              <th>Rooms</th>
              <th>Package type</th>
            </tr>
            {array.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.user.name}</td>
                <td>{doc.user.mobile}</td>
                <td>{doc.user.email}</td>
                <td>{moment(doc.checkin_date).format("DD MMM YYYY")}</td>
                <td>{moment(doc.checkout_date).format("DD MMM YYYY")}</td>
                <td>{`${doc.number_of_guests} ${
                  doc.number_of_guests === 1 ? `guest` : `guests`
                }`}</td>
                <td>{`${doc.number_of_rooms} ${
                  doc.number_of_rooms === 1 ? `room` : `rooms`
                }`}</td>
                <td>{doc.package.name}</td>
                <td>
                  <Status
                    // setOpen={setOpen}
                    // open={open}
                    // status={doc.payment_status}
                    handleSettings={handleSettings}
                    handleCheck={handleCheck}
                    handleCancel={handleCancel}
                    room={doc.id}
                  />
                </td>
              </tr>
            ))}
          </table>
          <Modal
            className="modalBack"
            open={cancelModal}
            onClose={() => {
              setCancelModal(false);
            }}
          >
            <div className="box">
              <div className="head">
                <p>Confirmation</p>
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => setCancelModal(false)}
                />
              </div>
              <div className="body">
                <p>
                  Are you sure you want to cancel this booking? You cannot undo
                  this.
                </p>
                <div className="bottom">
                  <button
                    className="loginBtn"
                    onClick={() => setCancelModal(false)}
                  >
                    Go back
                  </button>
                  <button className="btn" onClick={Canceled}>
                    Cancel booking
                  </button>
                </div>
              </div>
            </div>
          </Modal>
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
                      // disablePast={true}
                      label={`Check-in date`}
                      minDate={date1}
                      value={date1}
                      onChange={handleDate}
                      inputVariant="outlined"
                      format="E, dd MMM"
                      animateYearScrolling
                    />
                    <DatePicker
                      // disablePast={true}
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
                  <h5>Package Type</h5>
                  <Dropdown
                    selection
                    defaultValue={selected}
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
                {/* <div className="select">
                  <h5>Room No.</h5>
                  <Dropdown
                    selection
                    defaultValue={number}
                    onChange={(e) => setNumber(e.target.value)}
                    button
                    fluid
                    className="d"
                    options={roomArray}
                  ></Dropdown>
                </div> */}
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
                    value={room}
                    type="number"
                    className="input"
                    name="room"
                    onChange={handleChange}
                    pattern="^([0-9]{10})$"
                    required
                  />
                  <label htmlFor="room" className="input-placeholder">
                    No. of rooms.
                  </label>
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
                <p>Allot a room</p>
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
                    <p>Check in:</p>
                    <h5>{moment(form.check_in).format("DD MMM YYYY")}</h5>
                  </div>
                  <div className="internal">
                    <p>Check out:</p>
                    <h5>{moment(form.check_out).format("DD MMM YYYY")}</h5>
                  </div>
                </div>
                <div className="top">
                  <div className="internal">
                    <p>Guests:</p>
                    <h5>{`${form.guest} ${
                      form.guest === 1 ? `guest` : `guests`
                    }`}</h5>
                  </div>
                  <div className="internal">
                    <p>Rooms:</p>
                    <h5>{`${form.roomNo} ${
                      form.roomNo === 1 ? `room` : `rooms`
                    }`}</h5>
                  </div>
                </div>
                <div className="top">
                  <div className="internal" style={{ width: "85%" }}>
                    <p>Alloted Rooms</p>
                    <ReactSelect
                      options={arrayRooms}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option,
                      }}
                      onChange={handleMultiple}
                      allowSelectAll={false}
                      value={personName}
                    />
                  </div>
                  <div className="internal" style={{ display: "none" }}>
                    <p>Room No.:</p>
                    <h5>{form.room}</h5>
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
        <NewMember draw={draw} setDraw={setDraw} />
      </div>
    </>
  );
};

export default UpBack;
