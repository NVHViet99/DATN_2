import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";
import ManageContent from "../components/Contents/ManageContent";
import PeopleCaroul from "../components/Form/PeopleCaroul";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const PageFour = () => {
  const loading = useSelector((state) => state.loading.isLoading);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.3 }}
    >
      {loading && <LoadingSpinner />}

      {!loading && <ManageContent />}
      {!loading && <PeopleCaroul />}
    </motion.div>
  );
};

export default PageFour;
