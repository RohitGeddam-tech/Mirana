// import "./App.scss";
import React, { useState } from "react";
import About1 from "./Components/About1";
import About2 from "./Components/About2";
import Banner from "./Components/Banner";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Gallery from "./Components/Gallery";
// import Header from "./Components/Header";
import NewHeader from "./Components/NewHeader";

function App() {
  const [state, setState] = useState("");
  return (
    <div className="App">
      {/* <Header /> */}
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <About2 />
        <About1 />
        <Gallery />
        <Contact src={state} setSrc={setState} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
