import React from "react";
import Banner from "./BannerRest";
import NewHeader from "../NewHeader";
import Footer from "../Footer";
import chef from "../../image/chef.png";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import menu from "./menu.pdf";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Rooms = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <div className="menu">
          <div className="container">
            <h1>Our Menu</h1>
            <div className="inside">
              <div className="pdf">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <div style={{ height: "500px" }}>
                    <Viewer
                      fileUrl={menu}
                      plugins={[defaultLayoutPluginInstance]}
                      theme="dark"
                    />
                  </div>
                </Worker>
              </div>
              <div className="list">
                <ul>
                  <li>Careful catering to Veg, Jain and Non-Veg orders </li>
                  <li>Exclusive à la carte options. </li>
                  <li>Tailor-made world cuisines. </li>
                  <li>Local and seasonal chef specials (upon request). </li>
                  <li>In-room dining (subject to COVID-protocols).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="chef">
          <div className="container">
            <h1>Our Chef</h1>
            <div className="info">
              <img src={chef} alt="chef" />
              <p>
                Mirana’s culinary experience designer, Jiten Acharya comes from
                humble beginnings. Raised in a family of foodies, he spent most
                of his time discovering magic in various kitchens. He took great
                pleasure in cooking and tasting new dishes authentic to their
                origins.
                <br />
                <br />
                He was inspired by how food can tell a story and convey cultural
                ideas, as well as how it brings people together. Having a unique
                blend of being an academician and industry professional with
                domestic and international stints, the IHM Kolkata graduate and
                IHM, Mumbai professor, Acharya has also groomed very many large
                teams of professionals; who proudly stir some of the finest
                recipes across the country to date.
                <br />
                <br />
                His avid travel and tasting experiences brought him to be a part
                of the Mirana Team. He aims to serve a one-of-a-kind experience
                which is rooted in conversations with each guest and cooked in a
                palette of their preferences.Every meal that his team creates
                reflects the essence of Mirana, providing not only an
                unforgettable taste, but also nourishment for the mind, body and
                soul.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
