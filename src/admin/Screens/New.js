import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { userId, lessonId, courseId, packageinforId } = useParams();

  const resourceType = userId ? "user" : lessonId ? "lesson" : courseId ? "course" : packageinforId ? "packageinfo" : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (resourceType === "lesson") {
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Add form data fields to FormData object
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (file) {
      data.append(resourceType === "user" ? "avatar" : "excelFile", file);
    }
    data.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      let response;

      // Send request based on resourceType
      if (resourceType === "user") {
        response = await fetch(`${apiUrl}/user/register`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        });
      } else if (resourceType === "lesson") {
        response = await fetch(`${apiUrl}/lesson/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        });
      } else if (resourceType === "course") {
        response = await fetch(`${apiUrl}/course/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        });
      } else if (resourceType === "packageinfo") {
        response = await fetch(`${apiUrl}/packageinfo/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        });
      }

      const responseData = await response.json();

      if (response.ok) {
        alert("Resource created successfully!");
      } else {
        alert(responseData.message || "Failed to create resource");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during submission " + error.message);
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
          {resourceType === "user" && (
              <img
                src={file ? URL.createObjectURL(file) : "/assets/person/DefaultProfile.jpg"}
                alt="user image"
                className="image"
              />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                /> 
                </div>*/}
                {resourceType === "user" && (
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlined className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  </div>
                )}
                {resourceType === "lesson" && (
                  <div className="formInput">
                    <label htmlFor="excelFile">
                      Excel File: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input
                      type="file"
                      id="excelFile"
                      accept=".xls,.xlsx"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {fileName && <p>Selected File: {fileName}</p>} {/* Hiển thị tên file */}
                  </div>
                )}
                
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  </div>
                ))}

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
