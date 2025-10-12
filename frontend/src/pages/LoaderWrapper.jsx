import { useState, useEffect } from "react";
import Loader from "./Loader.jsx"; // 👈 import your loader

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec loader
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : children;
};

export default LoaderWrapper;
