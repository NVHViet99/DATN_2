import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebase from "../../utilities/firebase";
import List from "./List";
import UploadImage from "./UploadedImage";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -200, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Contacts = () => {
  // manage states
  const [currentId, setCurrentId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [chooseId, setId] = useState(1);
  const [listItem, setListItem] = useState([]);
  const [chooseIdGetting, setChooseIdGetting] = useState();

  // dispatch an Action
  const dispatch = useDispatch();

  // Delete Image
  const deleteImage = (id) => {
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref("images").child("daily").child(id);

    storageRef.delete().then(() => {
      imageRef.remove();
    });
  };

  // Add/update user
  const addOrEdit = (obj) => {
    //create
    if (currentId === "") {
      const todoRef = firebase.database().ref(`fingerPrintId/User${chooseId}`);
      const idRef = firebase.database().ref("signUpFinger");

      todoRef.set(obj);
      idRef.set(+chooseId);
    }
    // update
    else {
      const todoRef = firebase.database().ref(`fingerPrintId/User${currentId}`);
      todoRef.set(obj);
      setCurrentId("");
    }
    setShowForm(false);
  };

  // Delete User
  const handleDeleteUser = (id) => {
    if (chooseIdGetting === 0) {
      deleteImage(id);
    }
    const itemRef = firebase.database().ref("deleteFinger/chooseId");
    itemRef.set(+id);
    dispatch(loadingActions.startLoading());
  };

  // get All users from firebase
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
    });
  }, []);

  // get choooseId return from ESP8266
  useEffect(() => {
    const chooseId = firebase.database().ref("deleteFinger/chooseId");

    chooseId.on("value", (snapshot) => {
      const getId = snapshot.val();
      dispatch(loadingActions.stopLoading());
      setChooseIdGetting(getId);

      if (getId === 0) {
        dispatch(loadingActions.stopLoading());
      }
    });
  }, []);

  // set autoID to firebase
  useEffect(() => {
    const listRef = firebase.database().ref("fingerPrintId");

    listRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const listItems = [];
      for (let i in items) {
        listItems.push(items[i]);
      }

      const result = [];

      listItems.forEach((item) => result.push(item.Id));

      if (result.length === 1) {
        const id = result[0] == 1 ? 2 : 1;
        setId(id);
      } else {
        for (let i = 0; i < result.length - 1; i++) {
          if (result[i + 1] - result[i] > 1) {
            setId(+result[i] + 1);
            break;
          } else {
            setId(+result[result.length - 1] + 1);
          }
        }
      }
    });
  }, []);

  // show form
  const showFormHandler = () => {
    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // close form
  const closeFormHandler = () => {
    setShowForm(false);
  };

  // return UI
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      <div className="row g-0">
        <div className="col-md-12">
          {showForm && (
            <>
              <ContactForm
                onClose={closeFormHandler}
                {...{ addOrEdit, currentId, listItem, setShowForm, showForm }}
              />
            </>
          )}
        </div>
      </div>
      <div className="col-md-14">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title m-b-0 title">Employees List</h5>
            <button className="button" onClick={showFormHandler}>
              Add New Employee
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Image</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listItem
                  ? listItem.map((item) => {
                      if (item.Id) {
                        return (
                          <tr key={item.Id}>
                            <td className="text-td">{item.Id}</td>
                            <td className="text-td">{item.fullName}</td>
                            <td className="text-td">{item.gender}</td>
                            <td className="text-td">
                              {<UploadImage id={item.Id} />}
                            </td>
                            <td className="text-td">{item.age}</td>
                            <td className="text-td">{item.address}</td>
                            <td className="text-td">{item.mobile}</td>
                            <td className="text-td">{item.email}</td>
                            <td>
                              <span
                                className="btn text-primary"
                                onClick={() => {
                                  setCurrentId(item.Id);
                                }}
                              >
                                <i
                                  className="fas fa-pencil-alt"
                                  onClick={showFormHandler}
                                ></i>
                              </span>
                              <span
                                className="btn text-danger"
                                onClick={() => {
                                  handleDeleteUser(item.Id);
                                }}
                              >
                                <i className="far fa-trash-alt"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <List listItem={listItem} />
    </motion.div>
  );
};

export default Contacts;
