import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { OverOns } from "./pages/OverOns";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ReceptenOverview } from "./pages/ReceptenOverview";
import { Recept } from "./pages/Recept";
import { BestPractice } from "./pages/BestPractice";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-center">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/over_ons" element={<OverOns />}></Route>
          <Route path="/recepten" element={<ReceptenOverview />}></Route>
          <Route path="/recepten/:recipe_id" element={<Recept />}></Route>
          <Route path="/best_practices" element={<BestPractice />}></Route>

          <Route></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
