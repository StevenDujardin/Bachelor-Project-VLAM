import axios from "axios";
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

// Define an interface for the AuthContext
export interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

// Create the context with a default value of undefined as it will always be provided by AuthProvider
const defaultIsLoggedIn = false; // Default logged in state
const defaultSetLoggedIn = () => {}; // Default function for setting the state

export const AuthContext = createContext<AuthContextType>(
  { isLoggedIn: defaultIsLoggedIn, setLoggedIn: defaultSetLoggedIn }
);
// Define props for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/auth/status", { withCredentials: true })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setLoggedIn(true);
          console.log("Successfully authenticated");
        } else {
          setLoggedIn(false);
        }
      })
      .catch(() => setLoggedIn(false));
  }, []);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      setLoggedIn,
    }),
    [isLoggedIn]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
