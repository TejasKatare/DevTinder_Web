import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //console.log("NavBar user: ", user);

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/auth/logout", {}, {withCredentials: true});
      //reload the page after logout
      //window.location.reload();
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm" data-theme="cupcake">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl"> 🧑‍💻DevTinder</Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <div>Welcome, {user.firstName}!</div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick = {handleLogout} >Logout</a>
                </li>

              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
