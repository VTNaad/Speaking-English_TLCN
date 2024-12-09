import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const Packagetable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/package`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          const formattedData = data.data.map((packages) => {
            const registrationDate = new Date(packages.registrationDate).toLocaleDateString('en-GB');
            const expirationDate = new Date(packages.expirationDate); 
            expirationDate.setDate(expirationDate.getDate() + 1);
            // Định dạng expirationDate sau khi cộng 1 ngày
            const formattedExpirationDate = expirationDate.toLocaleDateString('en-GB');
            
            return {
              id: packages._id,
              registrationDate,
              expirationDate: formattedExpirationDate,
              isRenewal: packages.isRenewal,
              packageInfo: packages.packageInfo,
            };
          });
          setData(formattedData);
        } else {
          console.error('Failed to fetch packages');
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
      const response = await fetch(`${apiUrl}/package/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const datas = await response.json();
  
      if (response.ok && datas.success) {
        setData(data.filter((item) => item.id !== id));
        alert("Package Deleted successfully!");
      } else {
        alert(datas.message || "Failed to delete the package.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while trying to delete the package.");
    }
  };

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'registrationDate', headerName: 'Registration Date', width: 250 },
    { field: 'expirationDate', headerName: 'Expiration Date', width: 250 },
    { field: 'isRenewal', headerName: 'Renewal', width: 150 ,  
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.isRenewal} ? 'true' : 'false'`}>
            {params.row.isRenewal ? 'True' : 'False'}
          </div>
        );
      },
    },
    { field: 'packageInfo', headerName: 'Package Information', width: 250,
      renderCell: (params) => {
        const { packageName } = params.row.packageInfo || {};
        return (
          <div>{packageName}</div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/packages/${params.row.id}/edit`} style={{ textDecoration: "none" }}>
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

export default Packagetable;
