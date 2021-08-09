import React from "react";
import balcony from "../../image/balcony.svg";
import tv from "../../image/tv.svg";
import pool from "../../image/pool.svg";
import fridge from "../../image/fridge.svg";
import smoke from "../../image/smoke.svg";
import wifi from "../../image/wifi.svg";
import pet from "../../image/pet.svg";
import "./Ammenity.scss";

const Data = [
  {
    image: smoke,
    name: "No Smoking",
  },
  {
    image: wifi,
    name: "Free Wi-fi",
  },
  {
    image: pool,
    name: "Swimming Pool",
  },
  {
    image: balcony,
    name: "Private Baclony/Garden",
  },
  {
    image: tv,
    name: "Satellite TV",
  },
  {
    image: fridge,
    name: "Mini Fridge",
  },
  {
    image: pet,
    name: "Pet friendly (prior permission required)",
  },
];

const Ammenity = () => {
  return (
    <div className="ammen">
      <div className="container">
        <h1>Amenities & Services</h1>
        <div className="cards">
          {Data.map((item, index) => (
            <div className="card" key={index}>
              <div className="circle">
                <img src={item.image} alt="balcony" />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ammenity;
