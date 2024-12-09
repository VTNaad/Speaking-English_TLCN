import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import { Link } from "react-router-dom";
import Coursetable from "../Components/Coursetable";

const ManagerCourse = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Course</span>
            <Link
              to="/admin/courses/courseId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Course</span>
            </Link>
          </div>
          <Coursetable />
        </div>
      </div>
    </div>
  );
};

export default ManagerCourse;
