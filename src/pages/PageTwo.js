import React from "react";
import ControlDevice from "../components/Control/ControlDevice";
import { motion } from "framer-motion";
import Chart from "../components/Charts/TempChart";
import DashboardContent from "../components/Contents/DashboardContent";
import HumChart from "../components/Charts/HumChart";
import PMChart from "../components/Charts/PMChart";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const PageTwo = () => {
  return (
    <motion.div
      // className="centered"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.3 }}
    >
      <DashboardContent />
      <ControlDevice />
      <Chart />
      <HumChart />
      <PMChart />
    </motion.div>
  );
};

export default PageTwo;
