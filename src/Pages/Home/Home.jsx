import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { BsThreeDots } from 'react-icons/bs';
import { BiLike, BiSend } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const [publicPost, setPublicPost] = useState([])
    const allPostData = useLoaderData();
    const [count, setCount] = useState(0)
    const [commentOpen, setCommentOpen] = useState(false)
    const [comments, setComments] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5011/comments')
        .then(res => res.json())
        .then(data => setComments(data))
        const remaining = allPostData.filter(post => post.privacy !== 'Private');
        setPublicPost(remaining);
    }, [allPostData])

    const commentHandle = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const userName = user?.displayName;
        const userImg = user?.photoURL;
        const sendComment = {comment, userName, userImg};
        console.log(sendComment)
        axios.post('http://localhost:5011/comments', sendComment)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                toast("Comment Successfully")
                form.reset();
            }
        })
        .catch(error => {
            console.log(error)
        })

    }
    return (
        <div className="my-10">
            <ToastContainer />
            <Helmet>
                <title>My Post | Home</title>
            </Helmet>

            <div className="max-w-xl mx-auto grid grid-cols-1 gap-10">
                {
                    publicPost.map(post => <div key={post._id} className="border-2">
                        <div className="flex items-center gap-32 md:gap-72 lg:gap-80">
                            <div className="flex items-center gap-2 px-4 py-4">
                                {post.userPhoto ? <img className="w-10 h-10 rounded-full" src={post.userPhoto} />
                                    :
                                    <img className="w-10 h-10 rounded-full" src="https://i.ibb.co/pL5zmrT/blank-profile-picture-973460-1280-removebg-preview.png" />}
                                <div className="">
                                    <h3 className="font-bold ml-1">{post.name}</h3>
                                    <p className="text-xs text-gray-500">{post.time}</p>
                                </div>
                            </div>
                            <div className="flex justify-end text-2xl">
                                <BsThreeDots></BsThreeDots>
                            </div>
                        </div>
                        <h3 className="my-4 text-xl font-medium px-4">{post.post}</h3>
                        {post.photo ? <img className="w-full h-[670px]" src={post.photo} alt="" /> : ''}
                        <hr className="mt-3" />
                        <div className="py-2 flex gap-36 md:gap-80 justify-center">
                            <p>Like {count}</p>
                            <p>Comment {comments.length}</p>
                        </div>
                        <hr className="mb-3" />
                        {
                            commentOpen ? <form onSubmit={commentHandle}>
                                <input type="text" name="comment" id="" className="w-full py-2 my-2 outline-none px-4 border" placeholder="Write a comment..." />
                                <div className="flex justify-end px-4 mb-2">
                                    <button className="text-2xl" type="submit"><BiSend></BiSend></button>
                                </div>
                            </form>
                                :
                                ''
                        }
                        <div className="flex items-center">
                            <button onClick={() => setCount((count) => count + 1)} className="w-1/2 btn font-semibold"><BiLike className="text-xl"></BiLike> Like</button>
                            <button onClick={() => setCommentOpen(!commentOpen)} className="w-1/2 btn font-semibold"><FaRegComment className="text-xl"></FaRegComment> Comment</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;