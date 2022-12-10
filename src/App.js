import "./App.css";
import Home from "./Page/Home";
import Detail from "./Page/Detail";
import Map from "./Page/Map";
import Create from "./Page/Create";
import Navbar from "./Page/Navbar";
import Inquiry from "./Page/Inquiry";
import Explain from "./Page/Explain";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="common">
      <Navbar />
      <div className="siteContent">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/Map/:mapParam" element={<Map />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Inquiry" element={<Inquiry />} />
            <Route path="/Explain" element={<Explain />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
