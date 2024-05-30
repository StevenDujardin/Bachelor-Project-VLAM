import axios from "axios";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Define an interface for the AuthContext
interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
  isLoggedIn: () => boolean;

}

// Create the context with a default value of undefined as it will always be provided by AuthProvider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Define props for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const isLoggedIn = (): boolean => {
    return token !== null;
  };
  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      isLoggedIn
    }),
    [token, isLoggedIn]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
