import "./App.css";

import { AuthProvider } from "./provider/AuthProvider";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col justify-center">
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
