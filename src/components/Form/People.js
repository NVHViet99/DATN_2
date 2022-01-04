import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -200, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const People = () => {
  const [listItem, setListItem] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const dispatch = useDispatch();

  const getImageUrl = () => {
    dispatch(loadingActions.startLoading());
    const imageRef = firebase.database().ref("images").child("daily");
    imageRef.on("value", (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...imageUrl, ...urls];
      setImageUrl(newState);
      dispatch(loadingActions.stopLoading());
    });
  };

  useEffect(() => {
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

  useEffect(() => {
    getImageUrl();
  }, []);

  let people = (
    <div className="test">
      {listItem
        ? listItem.map((item) => {
            return (
              <div key={item.Id} className="item">
                {imageUrl
                  ? imageUrl.map(({ id, url }) => {
                      if (item.Id === id) {
                        return (
                          <div key={id}>
                            <img src={url} alt="" className="image" />
                          </div>
                        );
                      }
                    })
                  : ""}
                <p>FullName: {item.fullName}</p>
                <p>Age: {item.age}</p>
                <p>Email: {item.email}</p>
                <p>Phone Number: {item.mobile}</p>
              </div>
            );
          })
        : ""}
    </div>
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      {people}
    </motion.div>
  );
};

export default People;
