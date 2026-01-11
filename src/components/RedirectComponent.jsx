import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RedirectComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    const redirectPath = "/client-access";

    const externalUrl = "http://localhost:3001/";

    if (currentPath === redirectPath) {
      window.location.replace(externalUrl);
    }
  }, [location]);

  return null;
};

export default RedirectComponent;
