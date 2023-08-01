import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import loginAnimation from '../../../assets/5243320.json';

function Login() {
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken !== null) {
            setIsLoggedIn(true);
        }
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setError('');
        setLoading(true);
        if (loggedIn) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        axios
            .post('http://localhost:5000/users/login', { ...data })
            .then((res) => {
                if (res.data.status === true) {
                    localStorage.setItem('access_token', res.data.access_token);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${res.data.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
                    setIsLoggedIn(false);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (error) {
                    setError(error.response.data.message);
                    setLoading(false);
                }
            });
    };
    return (
        <div className="flex justify-center lg:h-screen items-center flex-col lg:flex-row  ">
            <div className="w-full lg:w-1/3 px-5 md:py-16">
                <Link to="/" className="cross ">
                    <ImCross className="absolute top-5 right-5 lg:top-[4.5rem] lg:right-20 text-orange-600" />
                </Link>
                <div className="mb-5">
                    <h1 className="text-2xl lg:text-3xl font-medium text-primary ">
                        Welcome To Code Nikki!
                    </h1>
                    <p className="text-gray-500 font-semibold">
                        Please login your existing account
                    </p>
                </div>
                {error && (
                    <div className="!bg-red-100 !border w-full border-red-400 py-2 text-center px-5 rounded-lg mb-5">
                        <p className="text-red-500 text-lg font-bold">{error}</p>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" border border-primary rounded-lg p-5"
                >
                    {/* Username or Email Field */}
                    <div>
                        <input
                            className="form_RL"
                            {...register('usernameOrEmail', {
                                required: 'Username or email is required',
                            })}
                            placeholder="Username or Email"
                        />
                        {errors.usernameOrEmail && (
                            <p className="mt-3 text-red-500">{errors.usernameOrEmail.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            className="form_RL"
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                            type={showPass ? 'text' : 'password'}
                        />
                        {errors.password && (
                            <p className="mt-3 text-red-500">{errors.password.message}</p>
                        )}
                        {showPass ? (
                            <span
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-2 text-2xl text-slate-500 cursor-pointer "
                            >
                                <BsEyeSlashFill />
                            </span>
                        ) : (
                            <span
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-2 text-2xl text-slate-500 cursor-pointer "
                            >
                                <BsEyeFill />
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="form-group items-center">
                            <div className="">
                                <input
                                    type="checkbox"
                                    id="html"
                                    checked={loggedIn}
                                    onChange={(e) => setIsLoggedIn(e.target.checked)}
                                />
                                <label htmlFor="html">Remember me</label>
                            </div>
                        </div>
                        <div>
                            <Link
                                className="text-primary hover:underline duration-300"
                                to="/user/forgot-password"
                            >
                                Forgot Password
                            </Link>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="form_btn mt-4 cursor-pointer"
                    >
                        {loading ? 'Please wait...' : 'Login'}
                    </button>

                    <p className="mt-4 text-center">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-primary hover:underline duration-300 cursor-pointer"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <div className="w-full lg:w-1/3 px-5 ">
                <div className=" max-w-[600px]" data-aos="fade-left" data-aos-duration="1000">
                    <Lottie animationData={loginAnimation} loop />
                </div>
            </div>
        </div>
    );
}

export default Login;
