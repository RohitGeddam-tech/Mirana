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
import { Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { NavHashLink } from "react-router-hash-link";
import Settings from "./Settings";
import NewMember from "./NewMember";
import axios from "axios";
import ReactPaginate from "react-paginate";

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

const Status = ({ room, handleSettings, handleCheck }) => {
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
      {/* <Dropdown
        selection
        defaultValue={status}
        onChange={(event) => handleSelect(event, room)}
        button
        fluid
        className="p"
        options={statusData}
      ></Dropdown> */}
      <Dropdown icon="ellipsis vertical" className="dots">
        <Dropdown.Menu>
          {dotData.map((doc) => (
            <Dropdown.Item
              key={doc.key}
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [sel, setSel] = useState("");
  const [selected, setSelected] = useState("");
  const [door, setDoor] = useState();
  // const [array, setArray] = useState([...data]);
  const [array, setArray] = useState([]);
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
  const [guest, setGuest] = useState("");
  const [room, setRoom] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [mailInvalid, setMailInvalid] = useState(false);
  const [right, setRight] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [draw, setDraw] = useState(false);
  const [packid, setPackid] = useState(0);
  const [success, setSuccess] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  const handlePageClick = (data) => {
    setCurrent(data.selected + 1);
  };

  const handleSearch = (e) => {
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
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (
      localStorage.getItem("role") !== null &&
      localStorage.getItem("role") === "admin"
    ) {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_URL}admin/ongoing-bookings${
            moment(new Date()).format("YYYY-MM-DD") !==
              moment(startDate).format("YYYY-MM-DD") ||
            moment(new Date()).add(1, "days").format("YYYY-MM-DD") !==
              moment(endDate).format("YYYY-MM-DD") ||
            searched !== "" ||
            current > 0
              ? "?"
              : ""
          }page=${current}${
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
            setArray([...info]);
            setCurrent(res.data.meta.pagination.current_page);
            setTotal(res.data.meta.pagination.total_pages);
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

  const handleSelect = (e, room) => {
    setSel(e.target.innerText);
    setDoor(room);
  };

  const handleSettings = (room) => {
    array.forEach((members) => {
      if (members.id === room) {
        setForm({
          roomVal: members.rooms,
          money: members.total_paid_amount,
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
        // setModal(true);
        setOpen(true);
        setNum(room);
      }
    });
  };

  const handleCheck = (room) => {
    array.forEach((members) => {
      if (members.id === room) {
        setForm({
          roomVal: members.rooms.map((opt) => opt.room).join(", "),
          money: members.total_paid_amount,
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
        setModal(true);
        setNum(room);
        // setOpen(true);
      }
    });
  };

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
    setDate2(new Date(`${form.check_out}`));
  }, []);

  React.useEffect(() => {
    // if (popup === []) {
    setDate1(new Date(`${form.check_in}`));
    setDate2(new Date(`${form.check_out}`));
    setSelected(form.pack);
    setName(form.name);
    setNumber(form.room);
    setPhone(form.phone);
    setMail(form.mail);
    setGuest(form.guest);
    setRoom(form.roomNo);
    // }
  }, [form, setForm]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!(nameInvalid && mailInvalid) && phone.length > 8) ||
      phone === form.phone
    ) {
      setRight(true);
      setPopup({
        checkout_date: moment(date2).format("YYYY-MM-DD"),
        package: packid,
      });
      setOpen(false);
    } else {
      setRight(false);
    }
  };

  const putData = async () => {
    if (right) {
      const tokenData = localStorage.getItem("access-token");
      const token = JSON.stringify(tokenData);
      const headers = {
        Authorization: `Bearer ${token.slice(1, -1)}`,
      };
      if (right) {
        try {
          const res = await axios.put(
            `${process.env.REACT_APP_PUBLIC_URL}admin/ongoing-bookings/${num}`,
            popup,
            {
              headers: headers,
            }
          );
          if (res) {
            setOpen(false);
            setRight(false);
            setSuccess(res.data.success);
            setPopup([]);
            const { message = "Booking updated successfully" } = res.data;
            setAlertState({ open: true, message, type: "success" });
            setForm({});
            window.location.reload();
          }
        } catch (err) {
          const {
            message = "Sorry! We are unable to process your request.",
            status_code,
            errors = {},
          } = (err.response && err.response.data) || {};

          setSuccess(false);

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
      putData();
    }
  }, [handleSubmit]);

  const addData = async () => {
    const rooms = {
      payment_status: sel.toLowerCase(),
    };
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (correct) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}admin/ongoing-bookings-checkout/${num}`,
          rooms,
          {
            headers: headers,
          }
        );
        if (res) {
          setModal(false);
          setSel("");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        setModal(false);
      }
    }
  };

  React.useEffect(() => {
    addData();
  }, [correct]);

  const checkout = (stat) => {
    if (sel !== stat && sel !== "") {
      setCorrect(true);
    }
  };

  // const roomArray = [
  //   { key: "1", text: 101, value: 101 },
  //   { key: "2", text: 102, value: 102 },
  //   { key: "3", text: 103, value: 103 },
  //   { key: "4", text: 104, value: 104 },
  //   { key: "5", text: 105, value: 105 },
  //   { key: "6", text: 201, value: 201 },
  //   { key: "7", text: 202, value: 202 },
  //   { key: "8", text: 203, value: 203 },
  //   { key: "9", text: 204, value: 204 },
  //   { key: "10", text: 205, value: 205 },
  // ];

  const selectedArray = [
    { key: "1", text: "Executive", value: "Executive" },
    { key: "2", text: "Luxury", value: "Luxury" },
    { key: "3", text: "Paradise", value: "Paradise" },
  ];

  return (
    <>
      <Sidebar />
      <div className="bookMain">
        <Settings />
        <div className="contain">
          <h1>Bookings</h1>
          <div className="Navigation">
            <div className="links">
              <NavHashLink
                to="/Admin/Bookings/Ongoing#top"
                activeClassName="activate"
              >
                Ongoing
              </NavHashLink>
              <NavHashLink
                to="/Admin/Bookings/Upcoming#top"
                activeClassName="activate"
              >
                Upcoming
              </NavHashLink>
              <NavHashLink
                to="/Admin/Bookings/Completed#top"
                activeClassName="activate"
              >
                Completed
              </NavHashLink>
              <NavHashLink
                to="/Admin/Bookings/Cancelled#top"
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
            <tbody>
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
                <th>Package type</th>
                <th>Room No.</th>
                <th>Payment Status</th>
              </tr>
              {array.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.user.name}</td>
                  <td>{doc.user.mobile}</td>
                  <td>{doc.user.email}</td>
                  <td>{moment(doc.checkin_date).format("DD MMM YYYY")}</td>
                  <td>{moment(doc.checkout_date).format("DD MMM YYYY")}</td>
                  <td>{doc.package.name}</td>
                  <td>{doc.rooms.map((opt) => opt.room).join(", ")}</td>
                  <td>
                    <span
                      className={`span ${
                        doc.payment_status === "Pending" ? "orange" : ""
                      } ${doc.payment_status === "Paid" ? "green" : ""}`}
                    ></span>
                    {doc.payment_status}
                    <Status
                      // setOpen={setOpen}
                      status={doc.payment_status}
                      // open={open}
                      handleSettings={handleSettings}
                      handleSelect={handleSelect}
                      handleCheck={handleCheck}
                      room={doc.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="page">
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              pageCount={total}
              marginPagesDisplayed={3}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="ui pagination menu out"
              pageClassName="ui pagination menu in"
              pageLinkClassName="item"
              previousClassName="ui pagination menu in prev"
              previousLinkClassName="item"
              nextClassName="ui pagination menu in next"
              nextLinkClassName="item"
              breakClassName="ui pagination menu in"
              breakLinkClassName="item"
              activeLinkClassName="active"
            />
          </div>
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                      disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    <h5>{form.roomVal}</h5>
                    {/* {form.length > 0 ? (
                      <h5>{form.roomVal.map((opt) => opt.room).join(", ")}</h5>
                    ) : null} */}
                  </div>
                  <div className="internal">
                    <p>Pending room fees:</p>
                    <h5>
                      ₹{form.money} <span>{`(total ₹1${form.money})`}</span>
                    </h5>
                  </div>
                </div>
                <div className="top">
                  <div className="internal">
                    <p>Payment Status:</p>
                    <Dropdown
                      selection
                      defaultValue={form.status}
                      onChange={(e) => setSel(e.target.innerText)}
                      button
                      fluid
                      className="p"
                      options={statusData}
                    ></Dropdown>
                  </div>
                  <div className="internal" style={{ opacity: "0" }}>
                    <p>Room No.:</p>
                    <h5>{form.phone}</h5>
                  </div>
                </div>
                <div className="bottom">
                  <button className="loginBtn" onClick={() => setModal(false)}>
                    cancel
                  </button>
                  <button className="btn" onClick={() => checkout(form.status)}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <NewMember draw={draw} setDraw={setDraw} />
      </div>
    </>
  );
};

export default BookBack;
