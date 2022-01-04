import React from "react";
import People from "../components/Form/People";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";

const PageOne = () => {
  const loading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && <People />}
    </>
  );
};

export default PageOne;
