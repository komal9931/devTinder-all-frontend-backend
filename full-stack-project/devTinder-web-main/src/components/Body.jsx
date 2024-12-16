import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";





const Body=()=>{
    const dispatch=useDispatch();
    const userData=useSelector((store)=>store.user);
    const navigate=useNavigate();

    const fetchData=async()=>{
        if(userData) return;
        try{
        const res=await axios.get(BASE_URL+"/profile/view",{
            withCredentials:true
        });
        dispatch(addUser(res.data));
        // console.log(res.data);
        
    }catch(error){
        if(error.status===401){
            navigate("/login");
        }
        // console.error(error);
        
    }
    }

    useEffect(()=>{
        fetchData();
    },[])
    return(
        
        <div> 
            <Navbar/>
            <Outlet/>
            <Footer/>

        </div>

    )
}

export default Body;