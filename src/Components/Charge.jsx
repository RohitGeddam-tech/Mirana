import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import clear from "../image/clear.png";

const Cancel = ({ draw, setDraw, view }) => {
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
            <h1>Additional Charges</h1>
            <img src={clear} alt="close" onClick={() => setDraw(false)} />
          </div>
          <div className="body">
            <div className="in">
              <p>Extra adult (12+)</p>
              <p>₹ {view.adult}</p>
            </div>
            <div className="in">
              <p>Child with bed (6-12 years)</p>
              <p>₹ {view.teen}</p>
            </div>
            <div className="in">
              <p>Child with bed (upto 5 years)</p>
              <p>₹ 0</p>
            </div>
            <p>
              *a-la-carte menu/ additional breakfast/ lunch will be charged
              extra
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cancel;
