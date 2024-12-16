import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "./utils/requestSlice";

const RequestCard = ({_id, request})=>{
    const {firstName, lastName, gender, skills, about, userPhoto, age} = request;
    
    const dispatch = useDispatch();
    const handlingRequest = async(status, _id)=>{
        try{
            const res = await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));

        }
        catch(err){
            console.error(err.message);
        }

    }
    return (
        <div className="w-[34rem] max-w-xl">
        <div className="flex flex-row shadow bg-base-300 my-5 rounded-lg">
            <div className="p-4">
                <div className="avatar m-auto">
                    <div className="w-16 rounded-full ">
                    <img src={userPhoto} alt="dp"/>
                    </div>
                </div>

               
            </div>

            <div className="p-4 flex flex-col flex-wrap">
                
                <div className="stat-value text-lg text-secondary">{firstName + " " + lastName}</div>
                {age && gender && <div className="stat-desc text-xs">{age + ", "+gender}</div>}

                <div className="text-xs flex-1 break-words line-clamp-2">{about}</div>
                <div className="">
                    <button className="mr-2 mt-2 btn-sm rounded-lg bg-red-500 btn-error font-bold hover:bg-red-600" onClick={()=>handlingRequest("rejected",_id)}>Ignore</button>
                    <button className="btn-sm rounded-lg bg-green-500 btn-error font-bold hover:bg-green-700" onClick={()=>handlingRequest("accepted",_id)}>Accept</button>

                </div>
            </div>
            
        </div>
        
    </div>
    )
}
export default RequestCard;