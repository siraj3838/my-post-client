import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { loggedInUser, googleLogin } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [createSuccess, setCreateSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const loginHandle = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)


        loggedInUser(email, password)
            .then(response => {
                const loggedInUser = response.user;
                console.log(loggedInUser)

                setCreateSuccess('Login SuccessFully');
                Swal.fire(
                    'Thank You',
                    'Login Successfully',
                    'success'
                )


            })
            .catch(error => {
                console.log(error)
                setPasswordError(error.message)
            })
    }

    const googleLoginHandle = () => {
        googleLogin()
            .then(response => {
                Swal.fire(
                    'Thank You',
                    'Login Successfully',
                    'success'
                )
                navigate(location.state ? location?.state : '/');
                console.log(response.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="px-5 lg:px-0">
            <Helmet>
                <title>My Post | Login</title>
            </Helmet>
            <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-400 to-90% my-8 p-10 rounded-lg">
                <h3 className="text-center text-3xl font-bold mb-5 italic">Please Login</h3>
                <form onSubmit={loginHandle} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Your Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Your Password</span>
                        </label>
                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered relative" required />
                        <h2 className="absolute mt-12 ml-52 md:ml-96 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</h2>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div>
                        <p>You Are New Hare? Please <Link to={'/register'}><span className="text-lg font-bold text-red-950">Registration</span></Link></p>
                    </div>
                    {
                        passwordError && <p className="text-red-800 text-lg font-medium text-center">{passwordError}</p>
                    }
                    {
                        createSuccess && <p className="text-green-700 text-lg font-medium text-center">{createSuccess}</p>
                    }
                    <div className="flex flex-col mt-6 mb-0">
                        <button type="submit" className="btn glass font-bold text-base italic">Login</button>
                    </div>
                    <h2 className="text-center">or</h2>
                </form>
                <div className="flex flex-col mt-3">
                    <button onClick={googleLoginHandle} className="btn glass btn-neutral text-blue-600 font-bold text-base italic">Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;