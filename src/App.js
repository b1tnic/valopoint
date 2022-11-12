import "./App.css";
import Home from "./Page/Home";
import Detail from "./Page/Detail";
import Navbar from "./Page/Navbar";
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
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
