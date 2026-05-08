import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role= localStorage.getItem("role");
    if (token) {
      setUser({ token, role });
    }
  }, []);

  const login = (token,role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token,role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    setUser(null);
     window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;