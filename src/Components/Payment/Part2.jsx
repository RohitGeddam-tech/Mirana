import React, { useState } from "react";
import Footer from "../Footer";
import NewHeader from "../NewHeader";
import "./Pay.scss";
// import { NavHashLink } from "react-router-hash-link";
import arrow2 from "../../image/Frame2.png";
import { NavHashLink } from "react-router-hash-link";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Part2 = () => {
  const dataMoney = sessionStorage.getItem("bookMoney");
  const money = JSON.parse(dataMoney);
  const data = sessionStorage.getItem("paymentInfo");
  // console.log("paymentInfo: ", JSON.parse(data));
  const dataVal = JSON.parse(data);
  const [array, setArray] = useState({});
  // React.useEffect(() => {
  //   if (sessionStorage.getItem("bookMoney") === null) {
  //     // alert("Please select the Package");
  //     window.location.href = "/Book#top";
  //   }
  // }, []);

  React.useEffect(() => {
    const tokenData = localStorage.getItem("access-token");
    const token = JSON.stringify(tokenData);
    // console.log(token.slice(1, -1));
    const headers = {
      Authorization: `Bearer ${token.slice(1, -1)}`,
    };
    axios
      .get(`${process.env.REACT_APP_PUBLIC_URL}checkout`, {
        headers: headers,
      })
      .then((res) => {
        if (res) {
          const info = res.data.data;
          // console.log("response user profile msg", info);
          setArray({ ...info });
          // window.location.href = "/Part2#top";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // amount: array.amount.toString(),

    const options = {
      key: array.key,
      currency: array.currency,
      amount: "000",
      order_id: array.order_id,
      name: array.name,
      image: array.image,
      handler: function (res) {
        // console.log("razor-pay: ", res.razorpay_payment_id);
        // console.log("razor-pay: ", res.razorpay_order_id);
        // console.log("razor-pay: ", res.razorpay_signature);
        const data = {
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_order_id: res.razorpay_order_id,
          razorpay_signature: res.razorpay_signature,
        };
        const tokenData = localStorage.getItem("access-token");
        const token = JSON.stringify(tokenData);
        // console.log(token.slice(1, -1));
        const headers = {
          Authorization: `Bearer ${token.slice(1, -1)}`,
        };
        axios
          .post(
            `${process.env.REACT_APP_PUBLIC_URL}razorPay/callback_handler`,
            data,
            {
              headers: headers,
            }
          )
          .then((res) => {
            if (res) {
              // console.log(res.data);
              sessionStorage.setItem("dataInfo", JSON.stringify(res.data.data));
              window.location.href = "/Part3"
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

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
                  <p>
                    Room Price ({dataVal.number_of_rooms}{" "}
                    {dataVal.number_of_rooms > 1 ? "rooms" : "room"} x{" "}
                    {dataVal.number_of_days}{" "}
                    {dataVal.number_of_days > 1 ? "days" : "day"})
                  </p>
                  <p>{dataVal.room_amount}</p>
                </div>
                <div className="detail">
                  <p>Taxes & Fees</p>
                  <p>₹ {dataVal.tax_amount}</p>
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
                    ₹ {dataVal.total_payable_amount}
                  </p>
                </div>
                <div className="detail">
                  <p>50% to be paid at the hotel</p>
                  <p>₹ {dataVal.to_be_paid_at_hotel}</p>
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
                    ₹ {dataVal.reservation_charge}
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <button onClick={displayRazorpay} className="btn">
                Pay now
                <span>
                  <img src={arrow2} alt="arrow" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Part2;
