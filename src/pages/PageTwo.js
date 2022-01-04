import React from "react";
import ControlDevice from "../components/Control/ControlDevice";
import { motion } from "framer-motion";
import Chart from "../components/Charts/TempChart";

const variants = {
  hidden: { opacity: 0, y: -200, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const PageTwo = () => {
  return (
    <motion.div
      // className="centered"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      <ControlDevice />
      <Chart />
    </motion.div>
  );
};

export default PageTwo;
