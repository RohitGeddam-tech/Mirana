import React, { useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import Footer from "./Footer";
import NewHeader from "./NewHeader";
import pay from "../image/pay.png";
import "./MyBooking.scss";
import arrow from "../image/backarrow.png";
import axios from "axios";

const MyBooking = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [other, setOther] = useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("next") === null) {
      // alert("Please select the Package");
      window.location.href = "/#top";
    }
  }, []);

  React.useEffect(() => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    // console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    axios
      .get(`${process.env.REACT_APP_PUBLIC_URL}bookings`, {
        headers: headers,
      })
      .then((res) => {
        if (res) {
          const info = res.data.data;
          console.log("response user profile msg", info);
          setUpcoming([...info.upcoming_bookings]);
          setOther([...info.otherBooking]);
          // window.location.href = "/Part2#top";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePut = (id) => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    // console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    axios
      .put(
        `${process.env.REACT_APP_PUBLIC_URL}bookings/${id}`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res) {
          // console.log(res.data);
          if (res.data.success) {
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("other: ", other, "upcoming: ", upcoming);

  return (
    <>
      <NewHeader />
      <div className="myBook" style={{ paddingTop: "110px" }}>
        <div className="contain">
          <NavHashLink to="/#top" className="loginBtn">
            <span>
              <img src={arrow} alt="arrow" />
            </span>
            Back to homepage
          </NavHashLink>
          <h1>My Bookings</h1>
          <div className="first">
            <p>Upcoming</p>
            {upcoming.length > 0 ? (
              <>
                {upcoming.map((doc) => (
                  <>
                    <div className="boxShade" key={doc.id}>
                      <img src={pay} alt="pay" />
                      <div className="inform">
                        <div className="top">
                          <h5>{doc.package}</h5>
                          <p>₹ {doc.total_payable_amount}</p>
                        </div>
                        <div className="bottom">
                          <p>
                            {doc.checkin_date} to {doc.checkout_date} |{" "}
                            {doc.number_of_guests}{" "}
                            {doc.number_of_guests > 1 ? "guests" : "guest"},{" "}
                            {doc.number_of_rooms}{" "}
                            {doc.number_of_rooms > 1 ? "rooms" : "room"}
                          </p>
                          <h5>{doc.status}</h5>
                        </div>
                      </div>
                    </div>
                    <div
                      className="last"
                      onClick={() => handlePut(doc.id)}
                      style={{ paddingBottom: "15px" }}
                    >
                      <a>Cancel this booking</a>
                    </div>
                  </>
                ))}
              </>
            ) : null}
          </div>
          {other.length > 0 ? (
            <>
              <div className="second">
                <p>Others</p>
                {other.map((doc) => (
                  <div className="boxShade">
                    <img src={pay} alt="pay" />
                    <div className="inform">
                      <div className="top">
                        <h5>{doc.package}</h5>
                        <p>₹ {doc.total_payable_amount}</p>
                      </div>
                      <div className="bottom">
                        <p>
                          {doc.checkin_date} to {doc.checkout_date} |{" "}
                          {doc.number_of_guests}{" "}
                          {doc.number_of_guests > 1 ? "guests" : "guest"},{" "}
                          {doc.number_of_rooms}{" "}
                          {doc.number_of_rooms > 1 ? "rooms" : "room"}
                        </p>
                        <h5
                          className={`${
                            doc.status === "Completed" ? "green" : ""
                          }
                        ${doc.status === "Ongoing" ? "orange" : ""}
                        ${doc.status === "Canceled" ? "red" : ""}`}
                        >
                          {doc.status}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
