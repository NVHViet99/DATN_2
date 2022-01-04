import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import TableList from "./TableList";

const List = ({ listItem }) => {
  const [idReg, setIdReg] = useState();

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

  return (
    <>
      <TableList result={result} />
    </>
  );
};

export default List;
