import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserFeed from "./UserFeed";


const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector(store=>store.feed);
    const feedData=async()=>{
        if (feed) return;
        const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
        // console.log(res.data[2]);
        dispatch(addFeed(res.data));
    }
    useEffect(()=>{
        feedData();
    },[]);
    if (!feed) return;

    if (feed.length <= 0)
      return <h1 className="flex justify-center my-10">No new users founds!</h1>;
    return(
        feed&&(
        <div className="flex justify-center my-1">
            <UserFeed user={feed[0]}/>
        </div>
        )
    )
}


export default Feed;