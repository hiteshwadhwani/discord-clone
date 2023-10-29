import { useEffect, useState } from "react";

const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const origin =
    isMounted && window.location.origin ? window.location.origin : "";
  if (!isMounted) {
    return "";
  }
  return origin;
};
export default useOrigin
