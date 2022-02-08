import React from "react";
import dashboard from "../../images/dashboard.svg";
import classes from "./DashboardContent.module.scss";

const DashboardContent = () => {
  return (
    <div>
      <div className={classes.image}>
        <img src={dashboard} alt="Logo" className={classes.image__detail} />
      </div>
      <h1>DashBoard</h1>
      <h6>
        This page contains books I enjoy with my notes, highlights and reviews.
      </h6>
    </div>
  );
};

export default DashboardContent;
