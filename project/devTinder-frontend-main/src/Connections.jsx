import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = ()=>{
    const dispatch = useDispatch();
    const connectionsFeed = useSelector((store) => store.connections);

    const fetchConnections = async()=>{
        
        try{
         
            const res = await axios.get("http://localhost:3000/user/connections",{withCredentials:true});
            dispatch(addConnections(res.data.data));
        }
        catch(err){
            console.error(err.message);
        }
    }
    
    useEffect(()=>{
        fetchConnections();
    },[]);

   
    if (!connectionsFeed) return;
    if(connectionsFeed.length === 0) return <div className="flex justify-center my-10">No Connections</div>
    return connectionsFeed && (
        <div className="flex flex-col justify-center my-5">
            <div className="m-auto">
                <h1 className="text-3xl text-white font-bold mb-5">Connections</h1>
            </div>
           <div className="m-auto ">
                {connectionsFeed.map((connection) => (<ConnectionCard connection={connection}/>))}
                
           </div>
            
        </div>
    )
}
export default Connections;