import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios if you plan to fetch user data

const UserContext = createContext();

const getAccessToken = () => {
  const name = "accessToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        // Token exists, user is likely logged in.
        // Optionally, fetch user details from backend and update 'user' state
        try {
          const response = await axios.get('/user/me', { withCredentials: true }); // Replace '/user/me' with your actual endpoint
          setUser(response.data.user);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          localStorage.removeItem("userInfo");
          const temp = window.location.href.split("/");
          const url = temp.pop();
          if (url !== "login" && url !== "register" && url !== "about_us" && url !== "#why-skill-swap" && url !== "") {
            navigate("/login");
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem("userInfo");
        const temp = window.location.href.split("/");
        const url = temp.pop();
        if (url !== "login" && url !== "register" && url !== "about_us" && url !== "#why-skill-swap" && url !== "") {
          navigate("/login");
        }
      }
      setLoadingAuth(false);
    };

    checkAuth();

    const handleUrlChange = () => {
      console.log("URL has changed:", window.location.href);
      checkAuth();
    };
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [navigate]);

  if (loadingAuth) {
    return <div>Loading...</div>; // Or a spinner
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };
