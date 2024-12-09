import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const Coursetable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/course`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          const formattedData = data.data.map((course) => ({
            id: course._id,
            ...course,
          }));
          setData(formattedData);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/course/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const datas = await response.json();
  
      if (response.ok && datas.success) {
        setData(data.filter((item) => item.id !== id));
        alert("Course Deleted successfully!");
      } else {
        alert(datas.message || "Failed to delete the course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while trying to delete the course.");
    }
  };

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'lessons',
      headerName: 'Lessons',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellScroll" >
            {params.row.lessons?.map((lesson) => (
              <div key={lesson._id}>{lesson.title}</div>
            ))}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/courses/${params.row.id}/addlesson`} style={{ textDecoration: "none" }}>
              <div className="addButton">Add Lesson</div>
            </Link>
            <Link to={`/admin/courses/${params.row.id}/edit`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="productable">
      <Paper className="productContainer">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            "& .MuiTablePagination-root": {
              color: darkMode ? "white" : "black",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Coursetable;
