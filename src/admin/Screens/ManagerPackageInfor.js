import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import { Link } from "react-router-dom";
import PackageInfotable from "../Components/PackageInfortable";

const ManagerPackgeInfor = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Package Information</span>
            <Link
              to="/admin/packageinfors/packageinforId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Package Information</span>
            </Link>
          </div>
          <PackageInfotable />
        </div>
      </div>
    </div>
  );
};

export default ManagerPackgeInfor;
