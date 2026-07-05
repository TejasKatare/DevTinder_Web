import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({user}) => { 
  if(!user) return;
  const dispatch = useDispatch();
  
  const requestHandler = async (status) => {
        try{
            const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + user._id, {}, {withCredentials: true});
            //console.log(status + " " + id);
            dispatch(removeFeed(user._id));
        }   
        catch(err){
            console.error(err.response);
        }
  };
  
  return (
    <div>
      <div className="card card-side bg-base-300 shadow-sm p-15" data-theme="cupcake rounded-box">
        <figure>
          <img
            src={user.photoUrl || null}
            alt={user.firstName + " " + user.lastName}
            className="w-64 h-64 object-cover rounded-full"
          />
        </figure>
        <div className="card-body flex flex-col justify-center items-center">
          <h2 className="card-title">{user.firstName} {user.lastName}</h2>
          <div className="flex flex-col m-10 gap-2"> 
            <p>{"Age: " + user.age}</p>
            <p>{"Gender: " + user.gender}</p>
          </div>
          <div className="card-actions justify-end gap-10">
            <button className="btn btn-secondary" onClick={() => requestHandler("interested")}>Interested</button>
            <button className="btn btn-primary" onClick={() => requestHandler("ignored")}>Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
