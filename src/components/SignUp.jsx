import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const user = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    password: passwordInput,
    age: ageInput,
    gender: genderInput,
    photoUrl: photoUrlInput,
  };
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleSaveChanges = async () => {
    console.log("HandleSaveChanges");
    try {
      await axios.post(BASE_URL + "/auth/signup", user, {withCredentials: true});
      dispatch(addUser(user));
      setShowToast(true); // Show success toast
      navigator('/');
      setTimeout(() => {
        setShowToast(false); // Hide the toast after 3 seconds
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data || "An error occurred while updating the profile.",
      );
      console.error("Error updating profile:", err);
      setShowToast(false); // Hide success toast if there's an error
    }
  };

  return (
    <div
      className="flex-1 flex flex-row items-center justify-center gap-10"
      data-theme="cupcake"
    >
      {user && (
        <UserCard
          user={{
            firstName: firstNameInput,
            lastName: lastNameInput,
            age: ageInput,
            gender: genderInput,
            photoUrl: photoUrlInput,
          }}
        />
      )}

      <div
        className="flex flex-col items-center bg-base-300 p-10 rounded-box shadow-sm"
        data-theme="cupcake"
      >
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Create Profile</legend>

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

          <div className="m-5">
            <label>Email</label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={emailInput}
                placeholder="xyz@gmail.com"
                required
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          <div className="mb-5 ml-5 mr-5">
            <label>Password</label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={passwordInput}
                onChange={(p) => setPasswordInput(p.target.value)}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">Not a strong password nigga</p>
          </div>

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
        <div className="flex card-actions justify-evenly items-center w-full">
            <p className="text-error cursor-pointer p-2" onClick={() => navigator('/login')}>Login Here!</p>
            <button className="btn" onClick={handleSaveChanges}>SignUp</button>
          </div>
        {error && <p className="text-error mt-2">{error}</p>}
        {showToast && (
          <div className="toast toast-bottom toast-center">
            <div className="alert alert-info">
              <span>SignUp Successfull!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
