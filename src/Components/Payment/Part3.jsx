import React from "react";
import Footer from "../Footer";
import NewHeader from "../NewHeader";
import "./Pay.scss";
// import { NavHashLink } from "react-router-hash-link";
import arrow2 from "../../image/Frame2.png";
import { NavHashLink } from "react-router-hash-link";
import moment from "moment";

const Part3 = () => {
  const dataBook = sessionStorage.getItem("bookData");
  const dataMoney = sessionStorage.getItem("bookMoney");
  const dataName = sessionStorage.getItem("nameData");
  const dataPhone = sessionStorage.getItem("phoneData");
  const dataMail = sessionStorage.getItem("mailData");
  const guestBook = sessionStorage.getItem("guestData");
  const roomBook = sessionStorage.getItem("roomData");
  const date1Book = sessionStorage.getItem("date1Data");
  const date2Book = sessionStorage.getItem("date2Data");
  const pack = JSON.parse(dataBook);
  const money = JSON.parse(dataMoney);
  const name = JSON.parse(dataName);
  const mail = JSON.parse(dataMail);
  const phone = JSON.parse(dataPhone);
  const guest = JSON.parse(guestBook);
  const room = JSON.parse(roomBook);
  const date1numbers = JSON.parse(date1Book);
  const date2numbers = JSON.parse(date2Book);
  const date1 = moment(date1numbers).format("DD MMM YYYY");
  const date2 = moment(date2numbers).format("DD MMM YYYY");
  // sessionStorage.clear();
  React.useEffect(() => {
    if (sessionStorage.getItem("bookMoney") === null) {
      // alert("Please select the Package");
      window.location.href = "/Book#top";
    }
  }, []);

  const data = [
    {
      label: "Name",
      value: name,
    },
    {
      label: "Mobile Number",
      value: phone,
    },
    {
      label: "Email Address",
      value: mail,
    },
    {
      label: "Package",
      value: `${
        sessionStorage.getItem("bookData") === null ? null : pack.slice(1, -1)
      } Package`,
    },
    {
      label: "Check in",
      value: date1,
    },
    {
      label: "Check out",
      value: date2,
    },
    {
      label: "Room Details",
      value: `${guest} ${guest > 1 ? "adults" : "adult"} ${room}
      ${room > 1 ? "rooms" : "room"}`,
    },
    {
      label: "Room Charges",
      value: `${money + 540}`,
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
