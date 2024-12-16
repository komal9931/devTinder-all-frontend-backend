import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";


const UserFeed=({user})=>{
  const {_id,firstName,lastName,age,gender,about,profilUrl}=user;
    const dispatch=useDispatch();
  const userFeedDAta=async(status,userId)=>{
    const res=axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
    dispatch(removeUserFeed(userId));
  }
    return(
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={profilUrl}
      alt="Profile picture" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender && <p>{age + ", " +gender}</p>}
   {about&& <p>{about}</p>}
    <div className="card-actions justify-center gap-7 my-2">
      <button className="btn btn-primary" onClick={()=>userFeedDAta("ignored",_id)}>Ignore</button>
      <button className="btn btn-success " onClick={()=>userFeedDAta("interested",_id)}>Intereseted</button>
    </div>
  </div>
</div>
    )
}

export default UserFeed;