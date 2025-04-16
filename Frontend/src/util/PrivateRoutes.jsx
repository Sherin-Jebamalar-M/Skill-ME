import { Outlet, Navigate } from "react-router-dom";

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

const PrivateRoutes = () => {
  const token = getAccessToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
