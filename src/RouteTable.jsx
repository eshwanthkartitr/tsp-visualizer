import React from "react";
import "./RouteTable.css";

const RouteTable = ({ route, onRowHover, onRowLeave }) => {
  return (
    <div className="route-table-container">
      <h2>Route Instructions</h2>
      <table className="route-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Direction</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {route.map((step, index) => (
            <tr
              key={index}
              onMouseEnter={() => onRowHover(index)}
              onMouseLeave={onRowLeave}
            >
              <td>{index + 1}</td>
              <td>{step.direction}</td>
              <td>{step.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;
