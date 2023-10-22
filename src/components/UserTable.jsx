import { Navigate, useNavigate } from "react-router-dom";
import React from "react"
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector} from 'react-redux';
import { blockUsers, deleteUsers, fechUsers, unblockUsers } from '../redux/slices/users';
import { fechAuthMe } from "../redux/slices/auth";



export default function UserTable (users) {
  const columns = [
    { field: 'fullName', headerName: 'Name', width: 250},
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'lastLoginDate', headerName: 'Last Login', width: 200 },
    { field: 'status', headerName: 'Status', width: 160 }
  ];
  console.log(users);
  let selectedIds = [];
  const dispach = useDispatch();

  const OnClickDelete = async () => {
    const obj = {userIds: selectedIds}
    await dispach(deleteUsers(obj));
    await dispach(fechAuthMe());
  };

  const OnClickBlock = async () => {
    const obj = {userIds: selectedIds}
    await dispach(blockUsers(obj));
    await dispach(fechAuthMe());
  };

  const OnClickUnblock = async () => {
    const obj = {userIds: selectedIds}
    await dispach(unblockUsers(obj));
    await dispach(fechAuthMe());
  };
  return (
    <div style={{width: '100%'}}>
    <Button onClick={OnClickDelete} style={{margin: 10}} variant="contained">Delete</Button>
    <Button onClick={OnClickBlock} style={{margin: 10}} variant="contained">Block</Button>
    <Button onClick={OnClickUnblock} style={{margin: 10}} variant="contained">Unblock</Button>
    <DataGrid className='dataGrid'
      rows={users.users}
      columns={columns}
      selec
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize:  20},
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      onRowSelectionModelChange={(ids) => {
        selectedIds = ids;
      }}
      
    />
    
  </div>
  )

}