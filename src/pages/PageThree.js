import React from "react";
import Contacts from "../components/Form/Contacts";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";
import HistoryTable from "../components/Form/HistoryTable";
import AdminContent from "../components/Contents/AdminContent";
import HistorySensor from "../components/Form/HistorySensors";

const PageThree = () => {
  const loading = useSelector((state) => state.loading.isLoading);

  return (
    <div>
      {!loading && <AdminContent />}
      <div className="centered">{loading && <LoadingSpinner />}</div>
      {!loading && <Contacts />}
      {!loading && <HistoryTable />}
      {!loading && <HistorySensor />}
    </div>
  );
};

export default PageThree;
