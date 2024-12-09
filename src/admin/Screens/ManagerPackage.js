import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import { Link } from "react-router-dom";
import Packagetable from "../Components/Packagetable";

const ManagerPackge = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Package</span>
            {/* <Link
              to="/admin/lessons/lessonId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Lesson</span>
            </Link> */}
          </div>
          <Packagetable />
        </div>
      </div>
    </div>
  );
};

export default ManagerPackge;
