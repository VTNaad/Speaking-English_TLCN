import React from "react";
import Chart from "../Config/Chart.js";
import Featured from "../Components/Featured";
import List from "../Components/List";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Widget from "../Config/Widget.js";
import "../Style/home.scss";

const Home = () => {
  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="customer" />
            <Widget type="package" />
            <Widget type="earnings" />
            {/* <Widget type="balance" /> */}
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            {/* <List /> */}
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
