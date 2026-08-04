import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      //console.log(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex-1 flex flex-col justify-top items-center m-10 bg-base-300 rounded-box">
        <h1 className="m-5 text-2xl bg-base-100 p-3 rounded-box">
          No Connections
        </h1>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col justify-top items-center m-10 bg-base-300 rounded-box">
      <h1 className="m-5 text-2xl bg-base-100 p-3 rounded-box">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl } = connection;
        return (
          <div
            key={_id}
            className="m-2 p-2 flex justify- w-150  bg-black items-center justify-evenly rounded-box"
          >
            <div className="">
              <img
                className=" w-30 h-30 object-cover rounded-full"
                src={photoUrl}
                alt="User Icon"
              ></img>
            </div>
            <div className="font-medium  font p-2">
              <h2 className="p-2">{firstName + " " + lastName}</h2>
              <h2 className="p-2">{"Age: " + age}</h2>
              <h2 className="p-2">{gender}</h2>
            </div>
            <div>
                <Link to ={"/chat/" + _id} state={{ targetPhotoUrl: photoUrl, targetFirstName: firstName}}>
                    <button className="btn btn-secondary">Chat</button>
                </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
