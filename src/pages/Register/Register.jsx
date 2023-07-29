import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import loginAnimation from '../../assets/5243320.json';
import './register.css';

function Register() {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    console.log(acceptTerms);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setError('');
        if (!acceptTerms) {
            return setError('Please acceptb  our terms and conditions.');
        }
        setLoading(true);
        axios
            .post('https://api.estiak.one/users/register', { ...data })
            .then((res) => {
                if (res.data.status === true) {
                    Swal.fire(
                        `${res.data.message}`,
                        'Please check your email, a verification mail has been sent to you.',
                        'success'
                    );
                    reset();
                    setAcceptTerms(false);
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
                    <p className="text-gray-500 font-semibold">Create your code nikki account</p>
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
                        placeholder="User Name"
                    />

                    <div className="text-red-500">
                        {errors.userName && errors.userName.type === 'required' && (
                            <p>Username is required.</p>
                        )}

                        {errors.userName && errors.userName.type === 'minLength' && (
                            <p>Username must be at least 6 characters long.</p>
                        )}

                        {errors.userName && errors.userName.type === 'maxLength' && (
                            <p>Username must not exceed 15 characters.</p>
                        )}

                        {errors.userName && errors.userName.type === 'pattern' && (
                            <p>
                                Username must be alphanumeric (letters and numbers) and should not
                                contain any spaces or special characters.
                            </p>
                        )}
                    </div>

                    <input
                        className="form_RL"
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        })}
                        placeholder="Email"
                    />
                    <div className="mt-3">
                        {errors.email && errors.email.type === 'required' && (
                            <p className="text-red-500">Email is required.</p>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <p className="text-red-500">Invalid email format.</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            className="form_RL "
                            {...register('password', {
                                required: true,
                                minLength: 8,
                                maxLength: 12,
                                pattern:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
                    </div>
                    <div className="mt-3">
                        {errors.password && errors.password.type === 'required' && (
                            <p className="text-red-500">Password is required.</p>
                        )}
                        {errors.password && errors.password.type === 'minLength' && (
                            <p className="text-red-500">
                                Password must be at least 8 characters long.
                            </p>
                        )}
                        {errors.password && errors.password.type === 'maxLength' && (
                            <p className="text-red-500">Password must not exceed 12 characters.</p>
                        )}
                        {errors.password && errors.password.type === 'pattern' && (
                            <p className="text-red-500">
                                Password must contain at least one uppercase letter, one lowercase
                                letter, one digit, and one special character.
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            className="form_RL"
                            {...register('confirmPassword', {
                                validate: (value) =>
                                    value ===
                                    document.querySelector("input[name='password']").value,
                            })}
                            type={showPass ? 'text' : 'password'}
                            placeholder="Confirm Password"
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
                        <div className="mt-3">
                            {errors.confirmPassword && (
                                <p className="text-red-500">
                                    Confirm Password must match the Password field.
                                </p>
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
                            <label htmlFor="html">I agree to the terms and privacy policy</label>
                        </div>
                    </div>
                    <input
                        disabled={loading}
                        className="form_btn mt-4 cursor-pointer"
                        type="submit"
                        value={loading ? 'Please wait...' : 'Register'}
                    />
                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-primary hover:underline duration-300 cursor-pointer"
                        >
                            Login
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

export default Register;
