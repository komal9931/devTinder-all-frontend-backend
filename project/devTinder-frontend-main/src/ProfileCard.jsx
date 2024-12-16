import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({user})=> {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const navigate = useNavigate();
   

     

    
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
                
            </div>
    </div>
        </div>
    )
}
export default ProfileCard;