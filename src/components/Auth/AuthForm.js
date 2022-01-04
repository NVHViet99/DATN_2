import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.scss";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../hooks/Loading";
import { authActions } from "../../hooks/auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -70, x: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [notify, setNotify] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forwardToLogin = () => {
    setIsLogin(true);
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    dispatch(loadingActions.startLoading());

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLsOVXhQeKlbqUwp-Ry4I_FF4o0WPWN9s";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLsOVXhQeKlbqUwp-Ry4I_FF4o0WPWN9s";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(loadingActions.stopLoading());
        setNotify(false);
        history.replace("/");
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            // alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.logginAct(data.idToken));
        emailRef.current.value = "";
        passwordRef.current.value = "";
        forwardToLogin();
      })
      .catch((err) => {
        // alert(err.message);
        setNotify(true);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login Here" : "Sign Up"}</h1>
      {notify ? (
        <motion.div
          className={classes.valid}
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: "linear", duration: 0.5 }}
        >
          <div>
            <span>
              <i className="fas fa-exclamation-triangle mr-1"></i>
            </span>
            Your email or password is incorrect.
          </div>
          <div>Please try agian.</div>
        </motion.div>
      ) : (
        ""
      )}
      <form onSubmit={submitHanlder}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            autoComplete="on"
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
