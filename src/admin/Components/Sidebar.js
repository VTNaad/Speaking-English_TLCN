import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "../Style/sidebar.scss";
import { Link , useNavigate} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // Hàm để xử lý logout
  const handleLogout = () => {
    // Xóa accessToken khỏi localStorage
    localStorage.removeItem('accessToken');
    // Điều hướng người dùng đến trang login
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Dardboard</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <li>
            <ManageAccountsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <CalendarMonthOutlinedIcon className="icon" />
            <span>Calendar</span>
          </li>
          <li>
            <DiamondOutlinedIcon className="icon" />
            <span>Helper</span>
          </li>

          <li onClick={handleLogout}>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>

          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/admin/lessons" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Lessons</span>
            </li>
          </Link>

          <Link to="/admin/courses" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Courses</span>
            </li>
          </Link>

          <Link to="/admin/packageinfors" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Package Informations</span>
            </li>
          </Link>
          
          <Link to="/admin/packages" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Packages</span>
            </li>
          </Link>

          <Link to="/admin/notifications" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsActiveOutlinedIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>

          <li>
            <InsertChartOutlinedSharpIcon className="icon" />
            <span>Stats</span>
          </li>

          {/* <p className="title">CHARTS</p>
                    
          <p className="title">SERVICE</p>
          <li>
            <DnsOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER INTERFACE</p> */}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
