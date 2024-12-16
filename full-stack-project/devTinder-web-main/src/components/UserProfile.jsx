import { useState } from "react";
import UserFeed from "./UserFeed";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const UserProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilUrl, setPhotoUrl] = useState(user.profilUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setshowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, profilUrl, age, gender, about },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center gap-10">
        <div className="flex justify-center">
          <div className="flex justify-center">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <label className="form-control w-full max-w-xs my-2">
                      <div className="label">
                        <span className="label-text">Last Name:</span>
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                    <div className="label">
                      <span className="label-text">Photo URL :</span>
                    </div>
                    <input
                      type="text"
                      value={profilUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Age:</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Gender:</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled value="">
                        Select Gender
                      </option>{" "}
                      {/* Use an empty value here */}
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">About:</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
                <p className="text-red-600">{error}</p>
                <div className="card-actions justify-center m-2">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserFeed
          user={{ firstName, lastName, profilUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
