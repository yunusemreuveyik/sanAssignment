import React from "react";
import "./404Pages.scss";

const NotFound: React.FC = () => {
  return (
    <div className="notfound">
      <h1 className="notfound__title">404 - Page Not Found</h1>
      <p className="notfound__message">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
