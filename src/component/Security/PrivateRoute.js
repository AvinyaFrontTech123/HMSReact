import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig"

export default function PrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await api.get("/auth/validate");  
        setIsValid(true);
      } catch (err) {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;

  return isValid ? children : <Navigate to="/login" />;
}
