import React, { useEffect, useState } from "react";
import firebase from "../../utilities/firebase";
import classes from "./ControlDevice.module.css";

const ControlDevice = () => {
  const turnOnLed1 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d1_off");
  };

  const turnOnLed2 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d2_on");
  };

  const turnOnLed3 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d3_off");
  };

  const turnOnLed4 = () => {
    const onRef = firebase.database().ref("signUpFinger/control");
    onRef.set("d4_on");
  };

  const turnOffLed1 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d1_on");
  };

  const turnOffLed2 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d2_off");
  };

  const turnOffLed3 = () => {
    const offRef = firebase.database().ref("signUpFinger/control");
    offRef.set("d3_on");
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
    <div className="container">
      <h2>Control Devices</h2>
      <div className="row1-container">
        <div className="box box-down cyan">
          <h2>Light</h2>
          <p>Monitors activity to identify</p>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="light" onChange={checkboxLight} />
            <label htmlFor="light"></label>
          </div>
        </div>

        <div className="box red">
          <h2>Air Conditioner</h2>
          <p>Scans our talent network to create</p>

          <div className={classes.switchtoggle}>
            <input type="checkbox" id="air" onChange={checkboxAir} />
            <label htmlFor="air"></label>
          </div>
        </div>

        <div className="box box-down blue">
          <h2>Fan</h2>
          <p>Uses data from past projects to</p>
          <div className={classes.switchtoggle}>
            <input type="checkbox" id="fan" onChange={checkboxFan} />
            <label htmlFor="fan"></label>
          </div>
        </div>
        <div className="box orange">
          <h2>Curtain</h2>
          <p>Regularly evaluates our </p>
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
