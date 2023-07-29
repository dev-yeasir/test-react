import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import loginAnimation from '../../assets/5243320.json';

function Login() {
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {};
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
                    <input
                        className="form_RL"
                        {...register('userName', {
                            required: true,
                            minLength: 6,
                            maxLength: 15,
                            pattern: /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$/,
                        })}
                        placeholder="User Name or Email"
                    />

                    <div className="text-red-500">
                        {errors.userName && errors.userName.type === 'required' && (
                            <p>Username or Email is required.</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            className="form_RL "
                            {...register('password', {
                                required: true,
                            })}
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                        />

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
                        <div className="text-red-500">
                            {errors.password && errors.password.type === 'required' && (
                                <p>Password is required.</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <div className="">
                            <input
                                type="checkbox"
                                id="html"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                            />
                            <label htmlFor="html">Remember me</label>
                        </div>
                    </div>
                    <input
                        disabled={loading}
                        className="form_btn mt-4 cursor-pointer"
                        type="submit"
                        value={loading ? 'Please wait...' : 'Login'}
                    />
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
