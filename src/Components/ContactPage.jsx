import React, { useState } from "react";
import NewHeader from "./NewHeader";
import Footer from "./Footer";
import Contact from "./Contact";

const ContactPage = () => {
  const [state, setState] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2564413117807!2d72.90903941442745!3d18.607531971366303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be871be1472e061%3A0x9e751c9e3a240814!2sSamira%20Palms%20East%20Gate!5e0!3m2!1sen!2sin!4v1626965349868!5m2!1sen!2sin"
  );
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Contact src={state} setSrc={setState} />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
