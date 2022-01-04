import React from "react";

const TableList = (props) => {
  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12"></div>
      </div>
      <div className="col-md-14">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title m-b-0 title">Employees History</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {props.result
                  ? props.result.map((item) => {
                      return (
                        <tr key={item.time}>
                          <td className="text-td">{item.id}</td>
                          <td className="text-td">{item.time}</td>
                          <td className="text-td">{item.date}</td>
                          <td className="text-td">{item.name}</td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableList;
