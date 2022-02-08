import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const PeopleCaroul = () => {
  const [listItem, setListItem] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [values, setValues] = useState("Female");

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

  let x = [];
  let ageFilter = [];

  listItem.forEach((item) => {
    if (item.gender === `${values}`) {
      x.push(item);
    }

    if (+item.age > 20) {
      ageFilter.push(item);
    }

    if (values === "all") {
      x.push(item);
    }
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValues(value);
  };

  let people = (
    <div>
      <section className="slider">
        <Carousel breakPoints={breakPoints}>
          {x
            ? x.map((item, index) => {
                return (
                  <div key={item.Id}>
                    {imageUrl
                      ? imageUrl.map(({ id, url }) => {
                          if (item.Id === id) {
                            return (
                              <div key={index}>
                                {
                                  <div className="main-card">
                                    <div className="cards">
                                      <div className="card">
                                        <div className="content">
                                          <div className="img">
                                            <img src={url} alt="" />
                                          </div>
                                          <div className="details">
                                            <div className="name">
                                              {item.fullName}
                                            </div>
                                            <div className="job">
                                              {item.mobile}
                                            </div>
                                          </div>
                                          <div className="media-icons">
                                            <Link to="#">
                                              <i className="fab fa-facebook-f"></i>
                                            </Link>
                                            <Link to="#">
                                              <i className="fab fa-twitter"></i>
                                            </Link>
                                            <Link to="#">
                                              <i className="fab fa-instagram"></i>
                                            </Link>
                                            <Link to="#">
                                              <i className="fab fa-youtube"></i>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            );
                          }
                        })
                      : ""}
                  </div>
                );
              })
            : ""}
        </Carousel>
      </section>
    </div>
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.3 }}
    >
      <div className="option">
        <span> Sort by:</span>
        <select
          className="option__select"
          aria-label=".form-select-lg example"
          onChange={handleInputChange}
          value={values}
          name="gender"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="all">All</option>
        </select>
      </div>
      <div>{people}</div>
    </motion.div>
  );
};

export default PeopleCaroul;
