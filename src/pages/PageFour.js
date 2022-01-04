import React from "react";
import { motion } from "framer-motion";
import Chart from "../components/Charts/TempChart";

const variants = {
  hidden: { opacity: 0, y: -200, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const PageFour = () => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      {/* <Chart /> */}
    </motion.div>
  );
};

export default PageFour;
