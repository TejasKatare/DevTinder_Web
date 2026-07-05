import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(null);
  useEffect(() => {
    if (user) {
      setFirstNameInput(user.firstName);
      setLastNameInput(user.lastName);
      setAgeInput(user.age);
      setGenderInput(user.gender);
      setPhotoUrlInput(user.photoUrl);
    }
  }, [user]);

  const dispatch = useDispatch();
  const handleSaveChanges = async () => {
    try {
      const updatedUser = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        age: ageInput,
        gender: genderInput,
        photoUrl: photoUrlInput,
      };
      const res = await axios.patch(BASE_URL + "/profile/update", updatedUser, {
        withCredentials: true,
      });
      const user = res.data.data;
      dispatch(addUser(user));
      setError(null); // Clear any previous errors
      setShowToast(true); // Show success toast
      setTimeout(() => {
        setShowToast(false); // Hide the toast after 3 seconds
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred while updating the profile.");
      console.error("Error updating profile:", err);
      setShowToast(false); // Hide success toast if there's an error
    }
  };

  return (
    <div
      className="flex-1 flex flex-row items-center justify-center gap-10"
      data-theme="cupcake"
    >
        
    {user && <UserCard user={{firstName: firstNameInput, lastName: lastNameInput, age: ageInput, gender: genderInput, photoUrl: photoUrlInput}}/>}

    <div className="flex flex-col items-center bg-base-300 p-10 rounded-box shadow-sm"
      data-theme="cupcake">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="First Name"
          value={firstNameInput}
          onChange={(e) => setFirstNameInput(e.target.value)}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastNameInput}
          onChange={(e) => setLastNameInput(e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={ageInput}
          onChange={(e) => setAgeInput(e.target.value)}
        />

        <label className="label">Gender</label>
        <select
          className="select select-bordered"
          value={genderInput}
          onChange={(e) => setGenderInput(e.target.value)}
        >
          <option value="">"Select Gender"</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="label">Photo URL</label>
        <input
          type="url"
          className="input"
          placeholder="Photo URL"
          value={photoUrlInput}
          onChange={(e) => setPhotoUrlInput(e.target.value)}
        />
      </fieldset>
      <button className="btn btn-neutral mt-4" onClick={handleSaveChanges}>
        Save Changes
      </button>
      {error && <p className="text-error mt-2">{error}</p>}
      {showToast && (
        <div className="toast toast-bottom toast-center">
  <div className="alert alert-info">
    <span>Profile updated successfully!</span>
  </div>
</div>
      )}
    </div>
    </div>
  );
};

export default EditProfile;
