import React from "react";
import isbot from "isbot";

interface MiddleWareProps {
  children: React.ReactNode;
}

function MiddleWare({ children }: MiddleWareProps) {
  if (isbot(navigator.userAgent)) {
    document.location.replace("https://dastyor.com/");
  }
  return <>{children}</>;
}

export default MiddleWare;
