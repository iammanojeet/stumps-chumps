import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader.jsx";

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // 👈 Detect route changes

  useEffect(() => {
    setLoading(true); // Show loader on route change
    const timer = setTimeout(() => setLoading(false), 3000); // 1.5s loader duration
    return () => clearTimeout(timer);
  }, [location.pathname]); // 👈 Trigger on path change

  return loading ? <Loader /> : children;
};

export default LoaderWrapper;
