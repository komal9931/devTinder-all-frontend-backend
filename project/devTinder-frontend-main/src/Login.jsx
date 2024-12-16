import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogin, setLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState();
    const handleSubmit = async()=>{
        try{
            const res = await axios.post("http://localhost:3000/login",
                {
                    email,
                    password
                },{withCredentials:true});
                
                dispatch(addUser(res.data));
          

                return navigate("/");
                
        }
        catch(err){
            setErrorMsg(err?.response?.data || "something wrong");
            console.error(err);
        }
    }

    const handleSignUp = async()=> {
            try{
                const res = await axios.post("http://localhost:3000/signup",
                    {
                        firstName,
                        lastName,
                        email,
                        password
                    },
                    {withCredentials:true}
                );
                dispatch(addUser(res.data));
                navigate("/profile");
                setErrorMsg("");
            }
            catch(err){
                setErrorMsg(err?.response?.data || "something wrong");

                console.error(err.message);
            }
    }
    const handleLogin = ()=>{
        isLogin == true? setLogin(false) : setLogin(true);
        return;
    }
    return (
        <div className="flex justify-center my-12">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{isLogin? "Login" :"Sign In"}</h2>
                    <div>
                    {!isLogin && <><label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">First Name</span>
                             
                            </div>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label> <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">LastName</span>
                             
                            </div>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label>
                    </>}
                    <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                             
                            </div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                             
                            </div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label>
                    </div>
                    <p className="text-red-500">{errorMsg}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-md w-8/12 mx-auto font-bold text-xl" onClick={isLogin? handleSubmit : handleSignUp}>{isLogin? "Log In":"Sign Up"}</button>
                    {isLogin? <p className="text-center">New User? <span className="cursor-pointer" onClick={() => {handleLogin();
                     setErrorMsg("");
                    }}>Sign Up</span></p>
                    :<p className="text-center">Existing User? <span className="cursor-pointer"  onClick={() =>{handleLogin();
                     setErrorMsg("");
                    }}>Log In</span></p>}

                    </div>
                </div>
                </div>
        </div>
    )
   
}
export default Login;