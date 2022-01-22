import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./PackagesBack.scss";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";
import create from "../image/create.png";
import below from "../image/down.png";
import black from "../image/black.png";
import Settings from "./Settings";
import axios from "axios";

const PackagesBack = () => {
  const [data, setData] = useState({});
  const [on, setOn] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [food, setFood] = useState("");
  const [num, setNum] = useState(0);
  const [form, setForm] = useState({});
  const [start, setStart] = useState(false);
  const [valid, setValid] = useState(false);
  const [down, setDown] = useState(false);
  const [packed, setPackage] = useState([]);

  useEffect(async () => {
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
        .get(`${process.env.REACT_APP_PUBLIC_URL}admin/packages`, {
          headers: headers,
        })
        .then((res) => {
          if (res) {
            const info = res.data.data;
            setPackage([...info]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const fill = (check) => {
    const file = packed.filter((data) => data.name === check);
    setData(file);
    setName(file[0].name);
    setRoom(file[0].room_price);
    setFood(file[0].food_price);
    setNum(file[0].id);
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
      if (name !== "" && room !== "" && food !== "") {
        setStart(true);
      }
    }
  }, [data, on]);

  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setName(value.split(" ").join(""));
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
      // setValid(true);
      setForm({
        name: name,
        room_price: room,
        food_price: food,
      });
      setStart(false);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  React.useEffect(async () => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    if (valid) {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_PUBLIC_URL}admin/packages/${num}`,
          form,
          {
            headers: headers,
          }
        );
        if (res) {
          setStart(false);
          window.location.reload();
          // setForm({});
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [setForm, setValid, valid, form]);

  return (
    <>
      <Sidebar />
      <div className="packMain">
        <Settings />
        <div className="contain">
          <h1>Packages</h1>
          <table className="mainData">
            <tbody>
              <tr>
                <th>Package Name</th>
                <th>Room Price</th>
                <th>Food Price</th>
              </tr>
              {/* {packed >= 0 ? (
              <> */}
              {packed.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.room_price}</td>
                  <td>{doc.food_price}</td>
                  <td>
                    <button onClick={() => fill(doc.name)}>
                      <span>
                        <img src={create} alt="create" />
                      </span>
                      edit
                    </button>
                  </td>
                </tr>
              ))}
              {/* </>
            ) : null} */}
            </tbody>
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
                    pattern="^([A-Za-z ,_.'`-]{2,30})$"
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
