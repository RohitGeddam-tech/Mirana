import React, { useState } from "react";
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

const Status = ({ status, handleSelect, room, select, setSel, setDoor }) => {
  console.log(select);
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
      text: "Booked",
      value: "Booked",
      image: { avatar: true, src: orange },
    },
    {
      key: "4",
      text: "Always Uvailable",
      value: "Always Unavailable",
      image: { avatar: true, src: circleBlack },
    },
  ];
  return (
    <div className="select">
      {/* {status === "Booked" || select === "Booked" ? (
        <h1>
          <span>
            <div className="circle b"></div>
          </span>
          {status}
        </h1>
      ) : ( */}
      <Dropdown
        selection
        defaultValue={status}
        onChange={(e) => handleSelect(e, room)}
        button
        fluid
        className="p"
        options={statusData}
      ></Dropdown>
      {/* )} */}
    </div>
  );
};

const RoomBack = () => {
  const [yes, setYes] = useState("");
  const [not, setNot] = useState("");
  const [book, setBook] = useState("");
  const [sel, setSel] = useState("");
  const [none, setNone] = useState("");
  const [door, setDoor] = useState("");
  const [date, setDate] = useState(new Date());
  const [array, setArray] = useState([...pack]);

  // console.log("Array state: ", array);

  const handleSelect = (e, room) => {
    console.log(e.target.innerText);
    setSel(e.target.innerText);
    // console.log(sel);
    setDoor(room);
  };
  React.useEffect(() => {
    console.log(sel);
  }, [handleSelect]);

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
                      select={sel}
                      setSel={setSel}
                      setDoor={setDoor}
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
        {/* <Cancel draw={draw} setDraw={setDraw} /> */}
      </div>
    </>
  );
};

export default RoomBack;
