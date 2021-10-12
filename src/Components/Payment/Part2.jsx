import React from "react";
import Footer from "../Footer";
import NewHeader from "../NewHeader";
import "./Pay.scss";
// import { NavHashLink } from "react-router-hash-link";
import arrow2 from "../../image/Frame2.png";
import { NavHashLink } from "react-router-hash-link";
const Part2 = () => {
  const dataMoney = sessionStorage.getItem("bookMoney");
  const money = JSON.parse(dataMoney);
  return (
    <>
      <NewHeader />
      <div className="part2" style={{ paddingTop: "110px" }}>
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
              <h5>Payment Details :</h5>
              <div className="shadeContainer">
                <div className="detail">
                  <p>Room Price (1 room x 1 night)</p>
                  <p>{money}</p>
                </div>
                <div className="detail">
                  <p>Taxes & Fees</p>
                  <p>₹ 540</p>
                </div>
                <div className="border"></div>
                <div className="detail">
                  <p
                    style={{
                      fontWeight: "bold",
                      paddingTop: "15px",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Total Amount Payable
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      paddingTop: "15px",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    ₹ {money + 540}
                  </p>
                </div>
                <div className="detail">
                  <p>50% to be paid at the hotel</p>
                  <p>₹ {(money + 540) / 2}</p>
                </div>
                <div className="border"></div>
                <div
                  className="detail"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "0",
                  }}
                >
                  <p
                    className="small"
                    style={{
                      fontWeight: "bold",
                      color: "#BA7F45",
                      fontSize: "20px",
                      lineHeight: "23px",
                      paddingBottom: "0",
                    }}
                  >
                    50% Reservation Charges (payable now)
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#BA7F45",
                      fontSize: "20px",
                      lineHeight: "23px",
                      paddingTop: "0",
                      paddingBottom: "0",
                    }}
                  >
                    ₹ {(money + 540) / 2}
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <NavHashLink to="/Part3#top" className="btn">
                Pay now
                <span>
                  <img src={arrow2} alt="arrow" />
                </span>
              </NavHashLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Part2;
