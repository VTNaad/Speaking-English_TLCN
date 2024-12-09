import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import Lessontable from "../Components/Lessontable";
import { Link } from "react-router-dom";

const ManagerLesson = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Lesson</span>
            <Link
              to="/admin/lessons/lessonId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Lesson</span>
            </Link>
          </div>
          <Lessontable />
        </div>
      </div>
    </div>
  );
};

export default ManagerLesson;
