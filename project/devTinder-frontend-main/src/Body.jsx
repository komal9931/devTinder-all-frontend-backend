import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar"
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import Error from "./Error";
// import { BackgroundBoxesDemo } from "./BG_UI";

const Body = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    const fetchingUser = async ()=>{
        if(userData) 
            {
                return navigate("/");
            };
        try{
            const res = await axios.get("http://localhost:3000/profile",
                {withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status === 401){
                navigate("/login");

            }
            else{
                {<Error/>}
            }
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchingUser();
    },[])

    return(
        <div className="h-screen m-0 p-0 overflow-auto" data-theme="dark">
            {/* <BackgroundBoxesDemo/> */}
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default Body;