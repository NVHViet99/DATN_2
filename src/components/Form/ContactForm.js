import React, { useState, useEffect } from "react";
import classes from "./ContactForm.module.scss";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";
import Modal from "../UI/Modal";

const ContactForm = ({
  currentId,
  listItem,
  addOrEdit,
  setShowForm,
  onClose,
}) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    Id: "",
    age: "",
    gender: "",
  };
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialFieldValues);

  // add or edit
  useEffect(() => {
    if (currentId === "") {
      setValues({
        ...initialFieldValues,
      });
    } else {
      let result = listItem.find((user) => currentId == user.Id);

      setValues({ ...result });
    }
  }, [currentId, listItem]);

  // date input changes
  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values);
  };

  const loadingAct = () => {
    dispatch(loadingActions.startLoading());
  };

  const closeFormHandler = () => {
    setShowForm(false);
  };

  // return UI
  return (
    <>
      <Modal className={classes.container} onClose={onClose}>
        <div className={classes.container__form}>
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <div className={classes.form__close} onClick={closeFormHandler}>
              <i className="fas fa-times"></i>
            </div>
            <div className={classes.form__title}>Registration</div>
            <div className={classes.form__details}>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Full Name</span>
                <input
                  type="text"
                  className={classes.form__box__input}
                  placeholder="Enter your name"
                  required
                  name="fullName"
                  value={values.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Age</span>
                <input
                  type="number"
                  className={classes.form__box__input}
                  placeholder="Enter your age"
                  required
                  name="age"
                  value={values.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Address</span>
                <input
                  type="text"
                  className={classes.form__box__input}
                  placeholder="Enter your address"
                  required
                  name="address"
                  value={values.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Mobile</span>
                <input
                  type="number"
                  className={classes.form__box__input}
                  placeholder="Enter your number"
                  required
                  name="mobile"
                  value={values.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Email</span>
                <input
                  className={classes.form__box__input}
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.form__box}>
                <span className={classes.form__box__name}>Gender</span>

                <select
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  onChange={handleInputChange}
                  value={values.gender}
                  name="gender"
                >
                  <option defaultValue>choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="submit">
              {currentId === "" ? (
                <div className={classes.btn}>
                  <button
                    type="submit"
                    className={classes.btn__submit}
                    onClick={loadingAct}
                  >
                    Create
                  </button>
                </div>
              ) : (
                <div className={classes.btn}>
                  <button type="submit" className={classes.btn__submit}>
                    Update
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ContactForm;
