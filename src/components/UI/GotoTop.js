import { useEffect, useState } from "react";
import React from "react";
import classes from "./GotoTop.module.scss";

const GotoTop = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} className={classes.top}>
          <i className="fas fa-caret-up"></i>
        </button>
      )}
    </>
  );
};

export default GotoTop;
