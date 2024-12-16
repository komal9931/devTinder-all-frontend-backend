import { useState } from "react";
// import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import ProfileCard from "./ProfileCard";

const ProfileEdit = ({user}) => {

    // const user = useSelector((store)=> store.user);
    
    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [gender, setGender] = useState(user.gender);
    const [userPhoto, setUserPhoto]  = useState(user.userPhoto);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [toast, setToast] = useState(false);

    const handleEdit = async()=>{
        try{
            setError("");
            const res = await axios.patch("http://localhost:3000/profile/edit",{
            lastName, firstName, age, gender, userPhoto, about
                },{withCredentials:true});
            dispatch(addUser(res.data));
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            }, 1000);
    }
    catch(err){
        setError(err.response.data);
    }
    }
    
    return user && (
        <div className="flex-row flex justify-center my-5">
            {toast && <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                    <span>User Updated Successfully!.</span>
                </div>
                
            </div>}
            <div className="">
                    <div className="card bg-base-300 mr-10 w-96 h-6/6 shadow-xl">
                        <div className="card-body p-5">
                            <h2 className="card-title">Edit Profile</h2>
                            <div>
                            <div className="flex">
                            <label className="form-control w-full max-w-xs my-1 mr-5">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    
                                    </div>
                                    <input value={firstName} onChange={(e)=>(setFirstName(e.target.value))} type="text" placeholder=""className="input input-bordered w-full" />
                                
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    
                                    </div>
                                    <input value={lastName} onChange={(e)=>(setLastName(e.target.value))} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                                
                            </label>
                            </div>
                            <label className="form-control w-full max-w-xs my-1">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    
                                    </div>
                                    <input value={age} onChange={(e)=>(setAge(e.target.value))} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                                
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    
                                    </div>
                                    <input value={gender} onChange={(e)=>(setGender(e.target.value))} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                                
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                    <div className="label">
                                        <span className="label-text">About</span>
                                    
                                    </div>
                                    <input value={about} onChange={(e)=>(setAbout(e.target.value))} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                                
                            </label>
                        
                            <label className="form-control w-full max-w-xs my-1">
                                    <div className="label">
                                        <span className="label-text">Photo URL</span>
                                    
                                    </div>
                                    <input value={userPhoto} onChange={(e)=>(setUserPhoto(e.target.value))} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                                
                            </label>
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm" onClick={handleEdit}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                    
            </div>
            <ProfileCard user={{lastName, firstName, age, gender, userPhoto, about}}/>

          
        </div>
     
   

    )
}
export default ProfileEdit;