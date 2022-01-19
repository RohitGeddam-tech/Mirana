import React from "react";
import Footer from "../Footer";
import NewHeader from "../NewHeader";
import "./Pay.scss";
// import { NavHashLink } from "react-router-hash-link";
import arrow2 from "../../image/Frame2.png";
import { NavHashLink } from "react-router-hash-link";
import moment from "moment";

const Part3 = () => {
  const dataInfo = sessionStorage.getItem("dataInfo");
  const dataMap = JSON.parse(dataInfo);
  // sessionStorage.clear();
  React.useEffect(() => {
    if (localStorage.getItem("next") === null) {
      // alert("Please select the Package");
      window.location.href = "/Book#top";
    }
  }, []);

  const data = [
    {
      label: "Name",
      value: dataMap.name,
    },
    {
      label: "Mobile Number",
      value: dataMap.mobile,
    },
    {
      label: "Email Address",
      value: dataMap.email,
    },
    {
      label: "Package",
      value: dataMap.package,
    },
    {
      label: "Check in",
      value: dataMap.checkin_date,
    },
    {
      label: "Check out",
      value: dataMap.checkout_date,
    },
    {
      label: "Room Details",
      value: `${dataMap.number_of_guests} ${
        dataMap.number_of_guests > 1 ? "adults" : "adult"
      } ${dataMap.number_of_rooms}
      ${dataMap.number_of_rooms > 1 ? "rooms" : "room"}`,
    },
    {
      label: "Room Charges",
      value: `₹ ${dataMap.total_payable_amount}`,
    },
  ];

  return (
    <>
      <NewHeader />
      <div className="part3" style={{ paddingTop: "110px" }}>
        <div className="container">
          <div className="top">
            <div className="progress">
              <div className="border1"></div>
              <div className="border2"></div>
              <div className="details">
                <div className="first">
                  <div className="circle">1</div>
                  {/* <p>Guest Details</p> */}
                </div>
                <div className="second">
                  <div className="circle">2</div>
                  {/* <p>Payment Details</p> */}
                </div>
                <div className="third">
                  <div className="circle">3</div>
                  {/* <p>Booking Confirmed!</p> */}
                </div>
              </div>
            </div>
            <div className="detailsText">
              <div className="first">
                <p>Guest Details</p>
              </div>
              <div className="second">
                <p>Payment Details</p>
              </div>
              <div className="third">
                <p>Booking Confirmed!</p>
              </div>
            </div>
          </div>
          <div className="dataBox">
            <div className="boxShade">
              <h4>Booking Summary :</h4>
              <div className="shadeContainer">
                {data.map((doc) => (
                  <div className="internal">
                    <h5>{doc.label} :</h5>
                    <p>{doc.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bottom">
              <NavHashLink to="/#top" className="btn">
                Back to homepage
              </NavHashLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Part3;
