import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

 

 const Connections=()=>{
    const dispatch=useDispatch();
    const userConnection=useSelector(store=>store.connection)
    const connectionData=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            dispatch(addConnections(res.data.data));
            // console.log(res.data.data);
        }catch(error){
            console.log(error);
            
        }   
    }
    useEffect(()=>{
        connectionData();
    },[])

    if (!userConnection) return;

    if (userConnection.length === 0) return <h1> No Connections Found</h1>;
    
    return (
    <div  className="text-center my-10">
         <h1 className="text-bold text-black text-3xl shadow-xl w-1/2 m-auto">Connections</h1>
        {userConnection.map((connection)=>{
        const { _id, firstName, lastName, profilUrl, age, gender, about } =connection;     
        return(
        <div key={_id} className="bg-red-50 m-4 p-4 border flex w-1/2 mx-auto shadow-xl">
            <div>
            <img
            src={profilUrl}
            alt="Profile photo"
             className="w-20 h-20 rounded-full object-cover"
            />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            
         </div>
        )
 
 
 })}
    </div>
    )
 }

 export default Connections; 