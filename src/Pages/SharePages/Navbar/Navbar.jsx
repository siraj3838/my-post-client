import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const navList = <>
        <li>
            <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
            <NavLink to={'/mypost'}>My Post</NavLink>
        </li>
        <li>
            <NavLink to={'/profile'}>Profile</NavLink>
        </li>
    </>
    const handleLoggedOut = () => {
        logoutUser()
        .then(()=>{
            toast("Logout Successfully");
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    return (
        <div className="mt-5 bg-[#95f79561]">
            <ToastContainer />
            <div className="grid md:grid-cols-3 gap-5 items-center max-w-screen-xl mx-auto py-2 px-5 lg:px-0">
                <div className="flex justify-center md:justify-start">
                    <img className="w-16 h-20 rounded-2xl" src="https://i.ibb.co/SR0f3Pd/unnamed-removebg-preview.png" alt="" />
                </div>
                <div>
                    <ul className="flex justify-center gap-5 lg:gap-12 flex-row font-semibold text-lg">
                        {navList}
                    </ul>
                </div>
                <div className="flex justify-center md:justify-end">
                    {user ? <div className="flex justify-center items-center gap-4">
                        <h3 className="font-bold text-lg">{user.displayName}</h3>
                        <button onClick={handleLoggedOut} className="btn btn-outline btn-secondary font-bold">Logout</button>
                        {user.photoURL ? <img className="w-16 h-16 rounded-full" src={user.photoURL} alt="" />
                        :
                        <img className="w-16 h-16 rounded-full" src="https://i.ibb.co/pL5zmrT/blank-profile-picture-973460-1280-removebg-preview.png" alt="" />}
                    </div>
                        :
                        <Link to={'/login'}>
                            <button className="btn btn-outline btn-secondary font-bold">Login</button>
                        </Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;