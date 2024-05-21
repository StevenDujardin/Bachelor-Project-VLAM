import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { OverOns } from "./pages/OverOns";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ReceptenOveview } from "./pages/ReceptenOveview";
import { Recept } from "./pages/Recept";

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-center ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/over_ons" element={<OverOns />}></Route>
          <Route path="/recepten" element={<ReceptenOveview />}></Route>
          <Route path="/recepten/:id" element={<Recept/>} ></Route> 

          <Route></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;