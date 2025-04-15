import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

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
  const [loadingAuth, setLoadingAuth] = useState(true); // To prevent premature redirects

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        // Token exists, user is likely logged in.
        // Optionally, fetch user details from backend and update 'user' state
        // Example (you'll need to implement your API call):
        // try {
        //   const response = await axios.get('/api/user/me', { withCredentials: true });
        //   setUser(response.data.user);
        //   localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        // } catch (error) {
        //   console.error("Error fetching user data:", error);
        //   setUser(null);
        //   localStorage.removeItem("userInfo");
        //   // Redirect to login if fetching user data fails (token might be invalid)
        //   const temp = window.location.href.split("/");
        //   const url = temp.pop();
        //   if (url !== "login" && url !== "register" && url !== "about_us" && url !== "#why-skill-swap" && url !== "") {
        //     navigate("/login");
        //   }
        // }
        if (!user && localStorage.getItem("userInfo")) {
          try {
            setUser(JSON.parse(localStorage.getItem("userInfo")));
          } catch (error) {
            console.error("Error parsing userInfo:", error);
          }
        }
      } else {
        // No token, redirect to login if not on a public page
        const temp = window.location.href.split("/");
        const url = temp.pop();
        if (url !== "login" && url !== "register" && url !== "about_us" && url !== "#why-skill-swap" && url !== "") {
          navigate("/login");
        }
      }
      setLoadingAuth(false); // Authentication check complete
    };

    checkAuth();

    const handleUrlChange = () => {
      console.log("URL has changed:", window.location.href);
      checkAuth(); // Re-check auth on URL changes
    };
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [navigate, user]);

  // Prevent rendering children until authentication check is complete
  if (loadingAuth) {
    return <div>Loading...</div>; // Or a spinner
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };
