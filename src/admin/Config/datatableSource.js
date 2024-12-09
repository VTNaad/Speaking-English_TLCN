export const userColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "Username",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 220 },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullname",
    headerName: "Fullname",
    width: 160,
  },
];
