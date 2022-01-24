import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Complete.scss";
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
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { NavHashLink } from "react-router-hash-link";
import Settings from "./Settings";
import NewMember from "./NewMember";
import ReactPaginate from "react-paginate";

const UpBack = () => {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [array, setArray] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [draw, setDraw] = useState(false);
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
          `${process.env.REACT_APP_PUBLIC_URL}admin/completed-bookings${
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
  }, [searched, startDate, endDate, current]);

  return (
    <>
      <Sidebar />
      <div className="comeMain">
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
                <th>Guests</th>
                <th>Room No.</th>
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
                  <td>{doc.rooms.map((opt) => opt.room).join(", ")}</td>
                  <td>{doc.package.name}</td>
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
        </div>
        <NewMember draw={draw} setDraw={setDraw} />
      </div>
    </>
  );
};

export default UpBack;
