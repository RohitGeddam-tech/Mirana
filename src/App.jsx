import "./App.scss";
import About1 from "./Components/About1";
import About2 from "./Components/About2";
import Banner from "./Components/Banner";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Gallery from "./Components/Gallery";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <About2 />
        <About1 />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
