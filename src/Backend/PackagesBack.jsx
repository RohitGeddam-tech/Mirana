import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./PackagesBack.scss";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";
import create from "../image/create.png";
import below from "../image/down.png";
import black from "../image/black.png";

const pack = [
  {
    name: "Executive",
    room: 4500,
    food: 500,
  },
  {
    name: "Luxury",
    room: 4500,
    food: 2000,
  },
  {
    name: "Paradise",
    room: 4500,
    food: 3000,
  },
];

const PackagesBack = () => {
  const [data, setData] = useState({});
  const [on, setOn] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [food, setFood] = useState("");
  const [form, setForm] = useState({});
  const [start, setStart] = useState(false);
  const [valid, setValid] = useState(false);
  const [down, setDown] = useState(false);

  const fill = (check) => {
    const file = pack.filter((data) => data.name === check);
    // return file;
    setData(file);
    setName(file[0].name);
    setRoom(file[0].room);
    setFood(file[0].food);
    // setForm({
    //   name: name,
    //   room: room,
    //   food: food,
    // });
    setOn(true);
  };

  // React.useEffect(() => {
  //   if (on) {
  //     setName(data[0].name);
  //     setRoom(data[0].room);
  //     setFood(data[0].food);
  //   }
  // }, []);

  React.useEffect(() => {
    if (on) {
      console.log("data useState: ", data);
      console.log("name useState: ", name);
      console.log("room useState: ", room);
      console.log("food useState: ", food);
      if (name !== "" && room !== "" && food !== "") {
        setStart(true);
      }
    }
  }, [data, on]);

  const handleChange = (e) => {
    // console.log("e value", e);
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        // setLnameInvalid(!e.target.validity.valid);
        break;
      case "room":
        setRoom(e.target.value);
        // setMobileInvalid(!e.target.validity.valid);
        break;
      case "food":
        setFood(e.target.value);
        // setMobileInvalid(!e.target.validity.valid);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && room !== "" && food !== "") {
      setValid(true);
      setForm({
        name: name,
        room: room,
        food: food,
      });
      setStart(false);
      console.log(form);
      pack.forEach((members) => {
        if (members.name === form.name) {
          members.name = form.name ? form.name : "nothing";
          members.room = form.room ? form.room : members.room;
          members.food = form.food ? form.food : members.food;

          console.log({ message: "member array updated", members });
        }
      });
    } else {
      setValid(false);
    }
  };

  React.useEffect(() => {
    if (valid) {
      console.log(form);
      console.log(form.name);
    }
  }, [form, valid, pack]);

  // React.useEffect(() => {
  //   if (on) {
  //     console.log("form usesTate: ", form);
  //   }
  // }, [form, on]);

  return (
    <>
      <Sidebar />
      <div className="packMain">
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
          <h1>Packages</h1>
          <table className="mainData">
            <tr>
              <th>Package Name</th>
              <th>Room Price</th>
              <th>Food Price</th>
            </tr>
            {pack.map((doc) => (
              // <div className="row">
              <>
                <tr>
                  <td>{doc.name}</td>
                  <td>{doc.room}</td>
                  <td>{doc.food}</td>
                  <td>
                    <button onClick={() => fill(doc.name)}>
                      <span>
                        <img src={create} alt="create" />
                      </span>
                      edit
                    </button>
                  </td>
                </tr>
                {/* <div className="border"></div> */}
              </>
              // </div>
            ))}
          </table>
          <Modal
            className="modalBack"
            open={start}
            onClose={() => {
              setStart(false);
            }}
          >
            <div className="box">
              <div className="head">
                <p>Edit Package</p>
                <img
                  className="img"
                  src={clear}
                  alt="cancel"
                  onClick={() => setStart(false)}
                />
              </div>
              <form className="enterData" onSubmit={handleSubmit}>
                <div className="text-input">
                  <input
                    value={name}
                    className="input"
                    name="name"
                    onChange={handleChange}
                    pattern="^([A-Za-z ,.'`-]{2,30})$"
                    type="text"
                    required
                  />
                  <label htmlFor="name" className="input-placeholder">
                    Package Name
                  </label>
                </div>
                <div className="text-input">
                  <input
                    value={room}
                    type="number"
                    className="input"
                    name="room"
                    onChange={handleChange}
                    pattern="[0-9]{1,}"
                    required
                  />
                  <label htmlFor="room" className="input-placeholder">
                    Room Price
                  </label>
                </div>
                <div className="text-input">
                  <input
                    value={food}
                    type="number"
                    className="input"
                    name="food"
                    onChange={handleChange}
                    pattern="[0-9]{1,}"
                    required
                  />
                  <label htmlFor="food" className="input-placeholder">
                    Food Price
                  </label>
                </div>
                <button className="btn" type="submit">
                  Proceed
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PackagesBack;
