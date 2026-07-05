import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/request/received", {withCredentials: true});
            dispatch(addRequests(res.data.data));
        }
        catch(err){
            console.log(err.response);
        }
    };
    
    useEffect(() => {
        fetchRequests();
    }, []);
    
    const requestHandler = async (status, id) => {
        try{
            const res = await axios.post(BASE_URL + '/request/review/' + status + '/' + id, {}, {withCredentials: true});
            //console.log(status + " " + id);
            dispatch(removeRequest(id));
        }   
        catch(err){
            console.error(err.response);
        }
    };

    if(!requests) return;

    if(requests.length === 0) 
        return (
            <div className="flex-1 flex flex-col justify-top items-center m-10 bg-base-300 rounded-box">
            <h1 className="m-5 text-2xl bg-base-100 p-3 rounded-box">No Requests Found</h1>
            </div>
        );

    return (
        <div className="flex-1 flex flex-col justify-top items-center m-10 bg-base-300 rounded-box">
            <h1 className="m-5 text-2xl bg-base-100 p-3 rounded-box">Requests</h1>
            {requests?.map((request) => {
                const {firstName, lastName, age, gender, photoUrl} = request.user || {};
                //console.log(request.user);
                const id = request._id;
                if(!photoUrl) photoUrl = null;
                return (
                    <div key={id} className="bg-black flex flex-col rounded-box p-3">
                    <div className="m-2 p-2 flex justify- w-150  bg-black items-center justify-evenly ">
                        <div className = "">
                            <img className=" w-30 h-30 object-cover rounded-full" src={photoUrl} alt="User Icon"></img>
                        </div>
                        <div className="font-medium  font p-2">
                            <h2 className="p-2">{firstName + " " + lastName}</h2>
                            <h2 className="p-2">{"Age: " + age}</h2>
                            <h2 className="p-2">{gender}</h2>
                        </div>
                        <div className="flex flex-col">
                       <button className="btn btn-success w-25 m-5" onClick={() => requestHandler("accepted", id)}>Accept</button>
                        <button className="btn btn-reject w-25 m-5" onClick={() => requestHandler("rejected", id)}>Reject</button> 
                    </div>
                    </div>
                    </div>
                )

            })}
        </div>
    );
};
export default Requests;