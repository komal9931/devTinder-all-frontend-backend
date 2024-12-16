import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const response = await fetch(BASE_URL + "/profile/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is equivalent to { withCredentials: true } in Axios
      });

      if (!response.ok) {
        // If the status is 401, navigate to the login page
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        // Handle other errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      dispatch(addUser(data));
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchUser = async () => {
  //   if (userData) return;
  //   try {
  //     const res = await axios.get(BASE_URL + "/profile/view", {
  //       withCredentials: true,
  //     });
  //     dispatch(addUser(res.data));
  //   } catch (err) {
  //     if (err.status === 401) {
  //       navigate("/login");
  //     }
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
