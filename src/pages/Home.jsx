import React from "react"
import axios from '../axios';
import { Navigate, useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { fechUsers } from "../redux/slices/users";
import { selectIsAuth, fechAuthMe } from "../redux/slices/auth";


export const Home = () => {
    const dispach = useDispatch();
    
    const isAuth = useSelector(selectIsAuth)
    React.useEffect(()=>{
        dispach(fechUsers())
      }, [])
    const  {users} = useSelector((state) => state.users);
    console.log(users.items);
    if(!isAuth){
        return<Navigate to="/login"/>
      }
    return (
        <div>
            <UserTable users={users.items}></UserTable>
        </div>
    )
        
    
}