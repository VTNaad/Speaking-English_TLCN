import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const Lessontable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/lesson`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          const formattedData = data.lessons.map((lesson) => ({
            id: lesson._id,
            ...lesson,
          }));
          setData(formattedData);
        } else {
          console.error('Failed to fetch lessons');
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
      const response = await fetch(`${apiUrl}/lesson/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const datas = await response.json();
  
      if (response.ok && datas.success) {
        setData(data.filter((item) => item.id !== id));
        alert("Lesson Deleted successfully!");
      } else {
        alert(datas.message || "Failed to delete the lesson.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while trying to delete the lesson.");
    }
  };

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'excelFile', headerName: 'Link File Excel', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 ,  
      renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },},
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/lessons/${params.row.id}/edit`} style={{ textDecoration: "none" }}>
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

export default Lessontable;
