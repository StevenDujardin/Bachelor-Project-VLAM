import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { OverOns } from "./pages/OverOns";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ReceptenOveview } from "./pages/ReceptenOveview";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/over_ons" element={<OverOns />}></Route>
        <Route path="/recepten" element={<ReceptenOveview />}></Route>

        <Route></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
