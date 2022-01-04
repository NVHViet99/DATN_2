import React, { useState, useEffect } from "react";
import classes from "./HistoryTable.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../hooks/Loading";

import LoadingSpinner from "../UI/LoadingSpinner";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { motion } from "framer-motion";

import firebase from "../../utilities/firebase";

let dayFilter;
let nameFilter;

const variants = {
  hidden: { opacity: 0, y: -200, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
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
    dataField: "id",
    style: colStyle,
    text: "ID",
    sort: true,
    headerStyle: headerStyle,
  },
  {
    dataField: "date",
    text: "Date",
    sort: true,
    filter: textFilter({
      getFilter: (filter) => {
        dayFilter = filter;
      },
    }),
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
    dataField: "name",
    text: "Name",
    filter: textFilter({
      getFilter: (filter) => {
        nameFilter = filter;
      },
    }),
    style: colStyle,
    headerStyle: headerStyle,
  },
];

export default function HistoryTable() {
  const [idReg, setIdReg] = useState();
  const [listItem, setListItem] = useState([]);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.isLoading);

  const { SearchBar } = Search;

  // Export to Excel
  const MyExportCSV = (props) => {
    const handlClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success mb-2" onClick={handlClick}>
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
      let name;
      const id = idReg[value].split(" ")[1];
      listItem.map((item) => {
        if (item.Id === id) {
          name = item.fullName;
        }
      });
      result.push({
        id: id,
        date: idReg[value].split(" ")[5],
        time: idReg[value].split(" ")[6],
        name: name,
      });
    });
  }

  //clear input
  const handleClick = () => {
    dayFilter("");
    nameFilter("");
  };

  //get datetime sign in from firebase
  useEffect(() => {
    const idRef = firebase.database().ref("return/Matched_Id");

    idRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const newId = [];
      for (let id in items) {
        newId.push(items[id]);
      }
      setIdReg(newId);
    });
  }, []);

  //get data users
  useEffect(() => {
    dispatch(loadingActions.startLoading());
    const listRef = firebase.database().ref("fingerPrintId");
    listRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const listItems = [];
      for (let i in items) {
        listItems.push(items[i]);
      }
      setListItem(listItems);
      dispatch(loadingActions.stopLoading());
    });
  }, []);

  // render UI
  return (
    <motion.div
      className={classes.table}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
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
            <div className={classes.title}>Employees History</div>
            <div className={classes.button}>
              <button className={classes.button__clear} onClick={handleClick}>
                Clear all filters
              </button>
              <SearchBar
                className={classes.button__search}
                {...props.searchProps}
              />
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
    </motion.div>
  );
}
