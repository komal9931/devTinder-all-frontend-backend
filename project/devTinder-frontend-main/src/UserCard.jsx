import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "./utils/feedslice";
import { useNavigate } from "react-router-dom";

const UserCard = ({user})=> {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const navigate = useNavigate();
    const handleRequest = async (status, userId)=>  {
        try{
          
            const res = await axios.post("http://localhost:3000/request/send/"+status+"/"+userId,{},{withCredentials:true});
            dispatch(removeUserFromFeed(userId));

            //i called here feed api here. coz, after sending the request to first user, redux feed slice is not updating and the new user is not coming into the feed. hence i called feed api again to dispatch the feed again into the redux store.
            
            const Res = await axios.get("http://localhost:3000/feed",{withCredentials:true});
            dispatch(addFeed(Res.data));
        }

        catch(err){
            console.error(err.message);
        }
      

    }
    // console.log(user._id);
    const {_id} = user;
    return user && (
        <div className="">
            <div className="card card-compact bg-base-300 w-80 shadow-xl max-h-[41rem]">
            <figure>
                <img
                className="h-80 w-full object-top "
                src={user.userPhoto}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName +" "+ user.lastName}</h2>
                {user.age && user.gender && <p>{user.age + ", "+user.gender}</p>}
                <p className="break-words line-clamp-2">{user.about}</p>
                <div className="card-actions justify-center my-2">
                <button 
                className="btn btn-primary" 
                onClick={()=>handleRequest("ignored",_id)}
                >
                Ignore
                </button>
                <button className="btn btn-secondary"
                onClick={()=>handleRequest("interested",_id)}
                >
                Interested</button>
                </div>
            </div>
    </div>
        </div>
    )
}
export default UserCard;