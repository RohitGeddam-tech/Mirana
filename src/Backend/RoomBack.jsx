import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./RoomBack.scss";
import below from "../image/down.png";
import black from "../image/black.png";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import pack from "./Data";

const Status = ({ status, handleSelect, room }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="select">
      {status !== "Booked" ? (
        <>
          <p onClick={() => setOpen(!open)}>
            <span>
              <div
                className={`circle ${status === "Available" ? "a" : ""} ${
                  status === "Unavailable" ? "c" : ""
                } ${status === "Booked" ? "b" : ""} ${
                  status === "Always Unavailable" ? "d" : ""
                }`}
              ></div>
            </span>
            {status}{" "}
            <span className="spanRight">
              <img src={below} alt="down" />
            </span>
          </p>
          {open ? (
            <div className="opt">
              <input
                type="button"
                value="Available"
                onClick={(e) => handleSelect(e, room, setOpen)}
              />
              <input
                type="button"
                value="Unavailable"
                onClick={(e) => handleSelect(e, room, setOpen)}
              />
              <input
                type="button"
                value="Booked"
                onClick={(e) => handleSelect(e, room, setOpen)}
              />
              <input
                type="button"
                value="Always Unavailable"
                onClick={(e) => handleSelect(e, room, setOpen)}
              />
            </div>
          ) : null}
        </>
      ) : (
        <h1>
          <span>
            <div className="circle b"></div>
          </span>
          {status}
        </h1>
      )}
    </div>
  );
};

const RoomBack = () => {
  const [down, setDown] = useState(false);
  const [yes, setYes] = useState("");
  const [not, setNot] = useState("");
  const [book, setBook] = useState("");
  const [sel, setSel] = useState("");
  const [none, setNone] = useState("");
  const [door, setDoor] = useState("");
  const [date, setDate] = useState(new Date());
  const [array, setArray] = useState([...pack]);

  // console.log("Array state: ", array);

  const handleSelect = (e, room, setOpen) => {
    console.log(e.target.value);
    setSel(e.target.value);
    setOpen(false);
    setDoor(room);
  };

  React.useEffect(() => {
    array.forEach((members) => {
      if (members.room === door) {
        members.status = sel ? sel : members.status;
        console.log({ message: "member array updated", members });
      }
    });
    console.log("handleSelect useEffect is running");
    setArray(array);
    console.log("after change: ", array);
    return array;
  }, [handleSelect]);

  return (
    <>
      <Sidebar />
      <div className="roomMain">
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
            <button className="logonBtn" onClick={() => setYes("Available")}>
              Available
            </button>
            <button className="logonBtn" onClick={() => setNot("Unavailable")}>
              Unavailable
            </button>
            <button className="logonBtn" onClick={() => setBook("Booked")}>
              Booked
            </button>
            <button
              className="logonBtn"
              onClick={() => setNone("Always Unavailable")}
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
            {array.map((doc) => (
              <>
                <tr>
                  <td>{doc.room}</td>
                  <td>{doc.floor}</td>
                  <td>
                    <Status
                      // setOpen={setOpen}
                      status={doc.status}
                      // open={open}
                      handleSelect={handleSelect}
                      room={doc.room}
                    />
                  </td>
                  <td>{doc.name}</td>
                </tr>
                {/* <div className="border"></div> */}
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default RoomBack;
