import React, { useEffect, useState } from "react";
import firebase from "../../utilities/firebase";
import classes from "./ControlDevice.module.css";

const ControlDevice = () => {
  const turnOnLed1 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d1_on");
  };

  const turnOnLed2 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d2_on");
  };

  const turnOnLed3 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d3_on");
  };

  const turnOnLed4 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d4_on");
  };

  const turnOffLed1 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d1_off");
  };

  const turnOffLed2 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d2_off");
  };

  const turnOffLed3 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d3_off");
  };

  const turnOffLed4 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d4_off");
  };

  // Handler onChange checkbox
  const checkboxLight = (e) => {
    const value = e.target.checked;
    if (value) {
      turnOnLed1();
    } else {
      turnOffLed1();
    }
  };

  const checkboxFan = (e) => {
    const value = e.target.checked;
    if (value) {
      turnOnLed2();
    } else {
      turnOffLed2();
    }
  };

  const checkboxAir = (e) => {
    const value = e.target.checked;
    if (value) {
      turnOnLed3();
    } else {
      turnOffLed3();
    }
  };

  const checkboxCurtain = (e) => {
    const value = e.target.checked;
    if (value) {
      turnOnLed4();
    } else {
      turnOffLed4();
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">Control Led</h2>
      <div className={classes.container}>
        <div className={classes.switchholder}>
          <div className={classes.switchlabel}>
            <i className="far fa-lightbulb"></i>
            <span>Light</span>
          </div>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="light" onChange={checkboxLight} />
            <label htmlFor="light"></label>
          </div>
        </div>
        <div className={classes.switchholder}>
          <div className={classes.switchlabel}>
            <i className="far fa-lightbulb"></i>
            <span>Fan</span>
          </div>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="fan" onChange={checkboxFan} />
            <label htmlFor="fan"></label>
          </div>
        </div>
        <div className={classes.switchholder}>
          <div className={classes.switchlabel}>
            <i className="far fa-lightbulb"></i>
            <span>Air Conditioner</span>
          </div>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="air" onChange={checkboxAir} />
            <label htmlFor="air"></label>
          </div>
        </div>
        <div className={classes.switchholder}>
          <div className={classes.switchlabel}>
            <i className="far fa-lightbulb"></i>
            <span>Curtain</span>
          </div>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="curtain" onChange={checkboxCurtain} />
            <label htmlFor="curtain"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlDevice;
