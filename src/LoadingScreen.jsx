import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <h2>Computing the optimal route...</h2>
    </div>
  );
};

export default LoadingScreen;
