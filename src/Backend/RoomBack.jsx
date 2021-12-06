import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./RoomBack.scss";
import below from "../image/down.png";
import black from "../image/black.png";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import pack from "./Data";
import green from "../image/green.png";
import orange from "../image/orange.png";
import circleBlack from "../image/circle_black.png";
import circleGrey from "../image/circle_grey.png";
import { Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Settings from "./Settings";
import axios from "axios";
import moment from "moment";

const Status = ({ status, handleSelect, room }) => {
  // console.log(select);
  const statusData = [
    {
      key: "1",
      text: "Available",
      value: "Available",
      image: { avatar: true, src: green },
    },
    {
      key: "2",
      text: "Unavailable",
      value: "Unavailable",
      image: { avatar: true, src: circleGrey },
    },
    {
      key: "3",
      text: "Always Unavailable",
      value: "Always Unavailable",
      image: { avatar: true, src: circleBlack },
    },
  ];
  return (
    <div className="select">
      {status === "Booked" ? (
        <h1>
          <span>
            <div className="circle b"></div>
          </span>
          {status}
        </h1>
      ) : (
        <Dropdown
          selection
          defaultValue={status}
          onChange={(e) => handleSelect(e, room)}
          button
          fluid
          className="p"
          options={statusData}
        ></Dropdown>
      )}
    </div>
  );
};

const RoomBack = () => {
  const [yes, setYes] = useState("");
  const [not, setNot] = useState("");
  const [book, setBook] = useState("");
  const [none, setNone] = useState("");
  const [yesactive, setYesactive] = useState(false);
  const [notactive, setNotactive] = useState(false);
  const [bookactive, setBookactive] = useState(false);
  const [noneactive, setNoneactive] = useState(false);
  const [sel, setSel] = useState("");
  const [door, setDoor] = useState("");
  const [date, setDate] = useState(new Date());
  // const [array, setArray] = useState([...pack]);
  const [file, setFile] = useState([]);
  const [valid, setValid] = useState(false);
  // const [right, setRight] = useState(false);

  const getData = async () => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (
      localStorage.getItem("role") !== null &&
      localStorage.getItem("role") === "admin"
    ) {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_URL}admin/rooms?date=${moment(
            date
          ).format("YYYY-MM-DD")}${
            yesactive || notactive || bookactive || noneactive ? "&status=" : ""
          }${yesactive ? `available` : ""}${yesactive && notactive ? "," : ""}${
            notactive ? `unavailable` : ""
          }${bookactive && notactive ? "," : ""}${bookactive ? `booked` : ""}${
            bookactive && noneactive ? "," : ""
          }${noneactive ? `always_unavailable` : ""}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res) {
            const info = res.data.data;
            console.log("response user profile msg", info);
            console.log("file array state1: ", file.length);
            setFile([...info]);
            console.log("file array state2: ", file.length);
            console.log("file array state: ", file);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [yesactive, notactive, bookactive, noneactive, date]);

  const handleSelect = async (e, room) => {
    console.log(e.target.innerText);
    setSel(e.target.innerText);
    // console.log(sel);
    setDoor(room);
    setValid(true);

    // const form = {
    //   date: date,
    //   status: sel,
    // };

    if (sel === "Always Unavailable") {
      setSel("always_unavailable");
      console.log(sel);
    }

    const form = {
      date: moment(date).format().slice(0, 10),
      status: sel.toLowerCase(),
    };
    console.log(form);
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    // console.log(headers);
    if (valid) {
      // console.log(code);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_PUBLIC_URL}admin/rooms/${room}`,
          form,
          {
            headers: headers,
          }
        );
        if (res) {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // useEffect(() => {
  //   if (yesactive === true) {
  //     setYes("available");
  //   }
  //   if (yesactive === false) {
  //     setYes("");
  //   }
  //   if (notactive === true) {
  //     setNot("unavailable");
  //   }
  //   if (notactive === false) {
  //     setNot("");
  //   }
  //   if (noneactive === true) {
  //     setNone("always unavailable");
  //   }
  //   if (noneactive === false) {
  //     setNone("");
  //   }
  //   if (bookactive === true) {
  //     setBook("booked");
  //   }
  //   if (bookactive === false) {
  //     setBook("");
  //   }
  // }, [yesactive, notactive, bookactive, notactive]);

  React.useEffect(async () => {
    console.log(sel);
    if (sel === "Always Unavailable") {
      setSel("always_unavailable");
      console.log(sel);
    }
    const form = {
      date: moment(new Date()).format().slice(0, 10),
      status: sel.toLowerCase(),
    };
    console.log(form);
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    // console.log(headers);
    if (valid) {
      // console.log(code);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_PUBLIC_URL}/admin/rooms/${door}`,
          form,
          {
            headers: headers,
          }
        );
        if (res) {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [handleSelect]);

  return (
    <>
      <Sidebar />
      <div className="roomMain">
        <Settings />
        <div className="contain">
          <h1>Rooms</h1>
          <div className="filters">
            <div className="date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disablePast={false}
                  label={null}
                  inputVariant="outlined"
                  value={date}
                  onChange={setDate}
                  format="E, dd MMM"
                  animateYearScrolling
                />
              </MuiPickersUtilsProvider>
            </div>
            <button
              className={`logonBtn ${yesactive ? "active" : ""}`}
              onClick={() => {
                setYesactive(!yesactive);
              }}
            >
              Available
            </button>
            <button
              className={`logonBtn ${notactive ? "active" : ""}`}
              onClick={() => {
                setNotactive(!notactive);
              }}
            >
              Unavailable
            </button>
            <button
              className={`logonBtn ${bookactive ? "active" : ""}`}
              onClick={() => {
                setBookactive(!bookactive);
              }}
            >
              Booked
            </button>
            <button
              className={`logonBtn ${noneactive ? "active" : ""}`}
              onClick={() => {
                setNoneactive(!noneactive);
              }}
            >
              Always Unavailable
            </button>
          </div>
          <table className="mainData">
            <tr>
              <th>Room</th>
              <th>Floor</th>
              <th>Status</th>
              <th>Guest Name</th>
            </tr>
            {file.length !== 0 ? (
              <>
                {file.map((doc) => (
                  <>
                    <tr key={doc.id}>
                      <td>{doc.room}</td>
                      <td>{doc.floor}</td>
                      <td>
                        <Status
                          // setOpen={setOpen}
                          status={doc.formatted_status}
                          // open={open}
                          select={sel}
                          setSel={setSel}
                          setDoor={setDoor}
                          handleSelect={handleSelect}
                          room={doc.id}
                        />
                      </td>
                      <td>{doc.name}</td>
                    </tr>
                    {/* <div className="border"></div> */}
                  </>
                ))}
              </>
            ) : null}
          </table>
        </div>
        {/* <Cancel draw={draw} setDraw={setDraw} /> */}
      </div>
    </>
  );
};

export default RoomBack;
