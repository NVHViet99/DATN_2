import React, { useState, useEffect, useRef } from "react";
import firebase from "../../utilities/firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import classes from "./UploadedImage.module.scss";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";

export default function UploadImage(props) {
  const [imageUrl, setImageUrl] = useState([]);

  const dispatch = useDispatch();
  const id = props.id;
  let idTest = id;
  const target = useRef(null);

  // read image
  const readImages = async (e) => {
    dispatch(loadingActions.startLoading());
    const file = e.target.files[0];
    if (file === undefined) {
      dispatch(loadingActions.stopLoading());
    }
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref("images").child("daily").child(id);
    if (file) {
      await storageRef.put(file);
      storageRef.getDownloadURL().then((url) => {
        imageRef.set(url);
        const newState = [...imageUrl, { id, url }];
        setImageUrl(newState);
      });
    }
  };

  // get imageUrl
  const getImageUrl = () => {
    const imageRef = firebase.database().ref("images").child("daily");
    imageRef.on("value", (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...imageUrl, ...urls];
      setImageUrl(newState);

      if (imageUrl) {
        // setStatusLoading(false);
        dispatch(loadingActions.stopLoading());
      }
    });
  };

  const deleteImage = (id) => {
    dispatch(loadingActions.startLoading());
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref("images").child("daily").child(id);
    storageRef.delete().then(() => {
      imageRef.remove();
    });
  };

  useEffect(() => {
    getImageUrl();
  }, []);

  const chooseFileHandler = () => {
    target.current.click();
  };
  return (
    <div className="container-upload">
      <div>
        <input
          ref={target}
          id="input"
          type="file"
          accept="image/*"
          onChange={readImages}
        />

        <button
          className={classes.btn__uploaded}
          onClick={() => {
            chooseFileHandler();
          }}
        >
          <i className="far fa-arrow-alt-circle-up"></i>
          Upload
        </button>
      </div>

      <div className="image-container">
        {imageUrl
          ? imageUrl.map(({ id, url }) => {
              if (idTest === id) {
                return (
                  <div key={id}>
                    <img src={url} alt="" className="image" />
                    <div className="wrapped">
                      <AiOutlineCloseCircle
                        className={classes.btn__delete}
                        onClick={() => {
                          deleteImage(id);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            })
          : ""}
      </div>
      {/* {loading} */}
    </div>
  );
}
