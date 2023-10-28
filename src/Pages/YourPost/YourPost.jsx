import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import { BiMenu, BiWorld } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import moment from 'moment';

const YourPost = () => {
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(true)

    const postHandle = e => {
        e.preventDefault();
        const form = e.target;
        const privacy = form.privacy.value;
        const post = form.post.value;
        const photo = form.photo.value;
        const time = form.time.value;
        const name = user.displayName;
        const userPhoto = user.photoURL;
        const postData = {privacy, post, photo, time, name, userPhoto};
        console.log(postData);
        axios.post('http://localhost:5011/posts', postData)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                toast("Post Successfully")
                form.reset();
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <ToastContainer />
            <Helmet>
                <title>My Post</title>
            </Helmet>
            <div className="max-w-[500px] mx-auto mt-10 rounded-lg shadow-lg">
                <div>
                    <h4 className="text-xl font-bold text-center pb-2">Create Your Post</h4>
                    <div className="flex justify-end gap-32">
                        <p className="text-center justify-center">{open ? 'Click Menu Button' : ''}</p>
                        <div className="flex justify-end text-2xl px-4"><p onClick={() => setOpen(!open)}>{open ? <BiMenu></BiMenu> : <IoCloseSharp></IoCloseSharp>}</p></div>
                    </div>
                </div>
                <hr className="my-4" />

                <form onSubmit={postHandle} className={`${open ? 'absolute -mt-[999px] duration-1000 rounded-lg shadow-lg md:w-[500px] lg:w-[500px]' : 'absolute mb-[1000px] duration-1000 rounded-lg shadow-lg md:w-[500px] lg:w-[500px]'}`}>
                    <div className="flex items-center gap-2 px-4">
                        <img className="w-10 h-10 rounded-full" src={user?.photoURL} />
                        <div className="space-y-1">
                            <h3 className="font-bold ml-1">{user.displayName}</h3>
                            <div className="flex items-center text-sm justify-around bg-gray-300 rounded-lg w-24">
                                <BiWorld></BiWorld>
                                <select name="privacy" className="bg-gray-300 outline-none">
                                    <option>Public</option>
                                    <option>Private</option>
                                </select>
                            </div>
                        </div>
                        <input type="text" className="" name="time" value={moment().format("MMM Do YYYY, h:mm a")} id="" />
                    </div>
                    <textarea name="post" className="w-full text-3xl pt-5 px-4 outline-none" placeholder={`What's on your mind, ${user.displayName.split(' ')[0]}`}>
                    </textarea>
                    <input type="text" name="photo" className="w-full outline-none px-4 py-2 text-center border" placeholder="Photo URL" id="" />
                    <input type="submit" value="Post" className="w-full py-2 rounded-bl-lg rounded-br-lg bg-info hover:bg-[#5ba0e1] text-lg text-white font-bold" />
                </form>

            </div>
        </div>
    );
};

export default YourPost;