import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) {
            return;
        }
        try{
            const res = await axios.get(BASE_URL + "/profile/getinfo",{withCredentials: true});
            dispatch(addUser(res.data));

        }catch(err){
            if(err.status === 401){
                navigate("/login");
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>            
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Body;