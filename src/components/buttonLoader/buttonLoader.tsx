// src/components/spinner/Spinner.tsx
import React from "react";
import "./buttonLoader.scss";

interface SpinnerProps {
  size?: number; // optional size in px
  color?: string; // optional color
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  color = "#ffffff",
  className = "",
}) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    ></div>
  );
};

export default Spinner;
