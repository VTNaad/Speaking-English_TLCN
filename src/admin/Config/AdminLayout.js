import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "../Screens/Home";
import ManagerUser from "../Screens/ManagerUser";
import DetailUser from "../Screens/DetailUser";
import ManagerLesson from "../Screens/ManagerLesson";
import New from "../Screens/New";
import { DarkModeContext } from "../Context/darkModeContext";
import { userInputs, lessonInputs, courseInputs, packageInputs } from "../Components/formData";
import "../Style/dark.scss";
import { useContext } from "react";
import ManagerCourse from "../Screens/ManagerCourse";
import ManagerPackgeInfor from "../Screens/ManagerPackageInfor";
import ManagerPackge from "../Screens/ManagerPackage";
import DetailPackageInfo from "../Screens/DetailPackageInfo";

const AdminLayout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="users" element={<ManagerUser />} />
        <Route path="users/:userId" element={<DetailUser />} />
        <Route path="users/:userId/new" element={<New inputs={userInputs} title={"Add New User"} />} />
        <Route path="lessons" element={<ManagerLesson />} />
        {/* <Route path="lessons/:lessonId/edit" element={<DetailLesson />} /> */}
        <Route path="lessons/:lessonId/new" element={<New inputs={lessonInputs} title={"Add New Lesson"} />} />
        <Route path="courses" element={<ManagerCourse />} />
        {/* <Route path="courses/:courseId/edit" element={<DetailCourse />} /> */}
        <Route path="courses/:courseId/new" element={<New inputs={courseInputs} title={"Add New Course"} />} />
        <Route path="packageinfors" element={<ManagerPackgeInfor />} />
        <Route path="packageinfors/:packageinforId" element={<DetailPackageInfo />} />
        <Route path="packageinfors/:packageinforId/new" element={<New inputs={packageInputs} title={"Add New Package Information"} />} />
        <Route path="packages" element={<ManagerPackge />} />
        {/* <Route path="packages/:packageId/edit" element={<DetailPackage />} /> */}
      </Routes>
    </div>
  );
};

export default AdminLayout;
