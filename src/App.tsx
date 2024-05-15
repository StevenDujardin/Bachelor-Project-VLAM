import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { OverOns } from "./pages/OverOns";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/over_ons" element={<OverOns/>}></Route>

        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
