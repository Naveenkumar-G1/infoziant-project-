import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedData = localStorage.getItem("authData");
  if (!storedData) return null;

  try {
    return JSON.parse(storedData);
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(getStoredUser());

  useEffect(() => {
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    } else {
      localStorage.removeItem("authData");
    }
  }, [authData]);

  const login = (data) => {
    setAuthData(data);
  };

  const logout = () => {
    setAuthData(null);
  };

  const value = useMemo(
    () => ({ authData, login, logout, isAuthenticated: !!authData }),
    [authData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
