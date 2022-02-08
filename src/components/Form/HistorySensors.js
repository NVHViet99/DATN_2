import React, { useState, useEffect } from "react";
import classes from "./HistoryTable.module.scss";

import { useSelector } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { motion } from "framer-motion";

import firebase from "../../utilities/firebase";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

//---------------Styles for table---------------//

let colStyle = (cell, row, rowIndex, colIndex) => {
  if (rowIndex % 2 === 0) {
    return {
      // fontSize: "18px",
      backgroundColor: "#F0ECE3",
      opacity: 0.8,
      borderColor: "#F0ECE3",
      color: "#334257",
      fontWeight: "bold",
    };
  }
  return {
    backgroundColor: "#F9F9F9",
    color: "#191919",
  };
};

let headerStyle = {
  backgroundColor: "#334257",
  color: "#fff",
};

//----------------------------------//

const columns = [
  {
    dataField: "date",
    text: "Date",
    sort: true,

    style: colStyle,
    headerStyle: headerStyle,
  },
  {
    dataField: "time",
    text: "Time",
    style: colStyle,
    headerStyle: headerStyle,
  },
  {
    dataField: "value",
    text: "Value",

    style: colStyle,
    headerStyle: headerStyle,
  },
];

export default function HistorySensor() {
  const [idReg, setIdReg] = useState();
  const [values, setValues] = useState("matchingHum");
  const loading = useSelector((state) => state.loading.isLoading);

  // Export to Excel
  const MyExportCSV = (props) => {
    const handlClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success mb-3" onClick={handlClick}>
          Export to CSV
        </button>
      </div>
    );
  };

  // logic split date, time, name and ID
  let result = [];
  if (idReg) {
    const key = Object.keys(idReg);
    key.forEach((value) => {
      result.push({
        date: idReg[value].split(" ")[2],
        time: idReg[value].split(" ")[1],
        value: idReg[value].split(" ")[0],
      });
    });
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValues(value);
  };

  //get datetime sign in from firebase
  useEffect(() => {
    const idRef = firebase.database().ref(`sensor/${values}`);

    idRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const newId = [];
      for (let id in items) {
        newId.push(items[id]);
      }
      setIdReg(newId);
      console.log(newId);
    });
  }, [values]);

  // render UI
  return (
    <motion.div
      className={classes.table}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.3 }}
    >
      <div className="card">
        {loading && <LoadingSpinner />}

        <ToolkitProvider
          bootstrap4
          keyField="time"
          data={result}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className={classes.container}>
              <div className="card-body text-center">
                <div className={classes.title}>Sensor Data History</div>
                <div className="option">
                  <span> Sort by:</span>
                  <select
                    className="option__select"
                    aria-label=".form-select-lg example"
                    onChange={handleInputChange}
                    value={values}
                    name="gender"
                  >
                    <option value="matching">Temperature</option>
                    <option value="matchingHum">Humidity</option>
                    <option value="matchingPM">PM2.5</option>
                  </select>
                </div>
              </div>

              <div>
                <BootstrapTable
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                  {...props.baseProps}
                />
                <MyExportCSV {...props.csvProps} />
              </div>
            </div>
          )}
        </ToolkitProvider>
      </div>
    </motion.div>
  );
}
