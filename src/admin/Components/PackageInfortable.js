import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const PackageInfotable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/packageinfo`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          const formattedData = data.data.map((packageinfo) => ({
            id: packageinfo._id,
            packageName: packageinfo.packageName,
            description: packageinfo.description,
            price: `${packageinfo.price} VNĐ`, 
            timeDuration: `${packageinfo.timeDuration} Day`, 
          }));
          setData(formattedData);
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
      const response = await fetch(`${apiUrl}/packageinfo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const datas = await response.json();
  
      if (response.ok && datas.success) {
        setData(data.filter((item) => item.id !== id));
        alert("User Deleted successfully!");
      } else {
        alert(datas.message || "Failed to delete the user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while trying to delete the user.");
    }
  };

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'packageName', headerName: 'Package Name', width: 250 },
    { field: 'description', headerName: 'Description', width: 350,
      renderCell: (params) => {
        return (
          <div className="cellScroll">
            {params.row.description}
          </div>
        );
      },
    },
    { field: 'price', headerName: 'price', width: 150 },
    { field: 'timeDuration', headerName: 'Time Duration', width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/packageinfors/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
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

export default PackageInfotable;
