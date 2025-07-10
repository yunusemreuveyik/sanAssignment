import React from "react";
import "./403Page.scss";

const Forbidden: React.FC = () => {
  return (
    <div className="forbidden">
      <h1 className="forbidden__title">403 - Forbidden</h1>
      <p className="forbidden__message">
        You don't have permission to access this page.
      </p>
    </div>
  );
};

export default Forbidden;
