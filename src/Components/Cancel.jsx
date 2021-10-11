import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";

const Cancel = ({ draw, setDraw }) => {
  return (
    <>
      <Modal
        className="modalPop"
        open={draw}
        onClose={() => {
          setDraw(false);
        }}
      >
        <div className="box">
          <div className="head">
            <h1>Cancellation Policy</h1>
            <img src={clear} alt="close" onClick={() => setDraw(false)} />
          </div>
          <div className="body">
            <p className='normal'>
              Cancellation allowed 7 days prior to Check In date. The hotel
              reserves the right to charge penalty of complete reservation
              charges if cancelled after the cancellation period.
              <br /><br />
              Reservation may be cancelled online or offline only as per the
              predefined policy. Please note that hotel will charge a
              cancelation fee if you must cancel after this deadline as set by
              the hotel. If you have made a prepayment, we will retain all or
              part of your prepayment. If not, we will charge your credit card.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cancel;
