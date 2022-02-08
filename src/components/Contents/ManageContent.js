import React from "react";
import manage from "../../images/employee.svg";
import classes from "./ManageContent.module.scss";

const ManageContent = () => {
  return (
    <div>
      <div className={classes.image}>
        <img src={manage} alt="Logo" className={classes.image__detail} />
      </div>
      <h1>Employees</h1>
      <h5>Worthwhile</h5>
      <h6>
        We work hard to find the right and the high-tech skilled staff that
        meets your business needs whether it would be a short-term project with
        one staff member or a long-term engagement with an entire team. We
        always strive to be useful.
      </h6>
      <h5>Excellence</h5>
      <h6>
        We are passionate and committed to our work and solutions that we
        provide. We continuously look for new and innovative ways to improve our
        own and client’s targets and beyond what everyone expects of us.
      </h6>
      <h5>Communication</h5>
      <h6>
        We believe building open and honest relationships with communication is
        key to creating a valuable work environment.
      </h6>
    </div>
  );
};

export default ManageContent;
