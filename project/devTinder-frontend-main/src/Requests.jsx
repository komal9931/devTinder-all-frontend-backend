import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "./utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = ()=> {
    const dispatch = useDispatch();
    const requestsFeed = useSelector((store) => store.requests);
    const fetchRequests = async()=>{
        try{
            const res = await axios.get("http://localhost:3000/user/requests",{withCredentials:true});
            dispatch(addRequests(res.data.requests));
            
        }
        catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[]);

    if (!requestsFeed) return;
    if(requestsFeed.length === 0) return <div className="flex justify-center my-10">No Requests Found!</div>

    return requestsFeed && ( 
        <div className="flex flex-col justify-center my-5">
        <div className="m-auto">
            <h1 className="text-2xl text-white font-bold mb-5">Requests</h1>
        </div>
       <div className="m-auto ">
            {requestsFeed.map((request) => <RequestCard _id = {request._id} request={request.fromUserId}/>)}
            {/* <RequestCard request={requestsFeed[0].fromUserId}/> */}
           
       </div>
        
    </div>
    )
}

export default Requests;