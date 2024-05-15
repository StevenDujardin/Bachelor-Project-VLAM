import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <img
        src="https://www.lekkervanbijons.be/sites/default/files/styles/home_hero_xxlarge/public/images/HR_iStock_papa-kind-groenten.jpg?itok=8Hm8F_TU"
        alt="groenten"
        className="w-full absolute -z-10 object-cover brightness-90"
      ></img>
      <Header />
    </>
  );
}

export default App;
