import React from "react";
import admin from "../../images/svgRed.svg";
import classes from "./AdminContent.module.scss";

const AdminContent = () => {
  function handleScroll() {
    window.scrollBy({
      top: 600, // could be negative value
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.content__title}>Admin</h1>
        <h6 className={classes.content__text}>
          This page contains books I enjoy with my notes, highlights and
          reviews.
        </h6>
        <button className={classes.content__button} onClick={handleScroll}>
          Let's start &rarr;
        </button>
      </div>
      <div className={classes.image}>
        <img src={admin} alt="Logo" className={classes.image__detail} />
      </div>
    </div>
  );
};

export default AdminContent;
