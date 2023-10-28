import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Registration = () => {
    const { createUser, googleLogin } = useContext(AuthContext)
    const [passwordError, setPasswordError] = useState('');
    const [createSuccess, setCreateSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const registerUser = e => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const user = {firstName, lastName, email, photo, password}
        console.log(user)
        const fullName = firstName+' '+lastName 
         setPasswordError('')
        if (password.length < 6) {
            setPasswordError('At least 6 or more characters Please');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setPasswordError('password most be one uppercase characters');
            return;
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            setPasswordError('At least one special characters');
            return;
        }
        createUser(email, password)
            .then(res => {
                console.log(res.user)
                setCreateSuccess('Registration SuccessFully');
                updateProfile(res.user, {
                    displayName: fullName,
                    photoURL: photo,
                })
                    .then(() => {
                        Swal.fire(
                            'Thank You',
                            'Registration Successfully please log in',
                            'success'
                        )
                        form.reset()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    const googleLoginHandle = () => {
        googleLogin()
            .then(response => {
                navigate(location.state ? location?.state : '/')
                console.log(response.user)
            })
            .catch(error => {
                console.log(error)
                setPasswordError(error.message)
            })
    }
    return (
        <div className="px-5 lg:px-0">
            <Helmet>
                <title>My Post | Registration</title>
            </Helmet>
            <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-400 to-90% my-8 p-10 rounded-lg">
                <h3 className="text-center text-3xl font-bold mb-5 italic">Create Your Account</h3>
                <form onSubmit={registerUser} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your First Name</span>
                            </label>
                            <input type="text" name="firstName" placeholder="first name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your Last Name</span>
                            </label>
                            <input type="text" name="lastName" placeholder="last name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="URL" className="input input-bordered" />
                        </div>
                        
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
                        <p>Already have an account? Please <Link to={'/login'}><span className="text-lg font-bold text-red-950">Login</span></Link></p>
                    </div>
                    {
                            passwordError && <p className="text-red-800 text-lg font-medium text-center">{passwordError}</p>
                        }
                        {
                            createSuccess && <p className="text-green-700 text-lg font-medium text-center">{createSuccess}</p>
                        }
                    <div className="flex flex-col mt-6 mb-0">
                        <button type="submit" className="btn glass font-bold text-base italic">Registration</button>
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

export default Registration;