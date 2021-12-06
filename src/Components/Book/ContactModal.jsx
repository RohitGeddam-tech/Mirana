import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import clear from "../../image/clear.png";
import Form from "../FormCopy";

const ContactModal = ({ draw, setDraw, date1, date2, name, guest, room }) => {
  const guests = guest;
  const rooms = room;
  const dateA = date1;
  const dateB = date2;
  const names = name;
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
            <h1>Please Enter Your Details!</h1>
            <img src={clear} alt="close" onClick={() => setDraw(false)} />
          </div>
          <div className="body">
            <Form
              date1={dateA}
              date2={dateB}
              pack={names}
              guest={guests}
              room={rooms}
              setOpen={setDraw}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactModal;
