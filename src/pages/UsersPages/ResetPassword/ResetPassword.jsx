import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import forgotPass from '../../../assets/forgot-password.json';

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        setError('');
        axios
            .post(`http://localhost:5000/users/reset-password/${token}`, {
                password: data.password,
            })
            .then((res) => {
                if (res.data.status) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${res.data.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
                    setLoading(false);
                    navigate('/login', { replace: true });
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
        <div className="h-screen flex justify-center items-center bg-white ">
            <Link to="/login" className="cross ">
                <ImCross className="absolute top-5 right-5 lg:top-[4.5rem] lg:right-20 text-orange-600" />
            </Link>
            <div className="w-1/3 ">
                <div className=" max-w-[600px]" data-aos="fade-left" data-aos-duration="1000">
                    <Lottie animationData={forgotPass} loop />
                </div>
                {error && (
                    <div className="!bg-red-100 !border w-full border-red-400 py-2 text-center px-5 rounded-lg mb-5">
                        <p className="text-red-500 text-lg font-bold">{error}</p>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" border border-primary rounded-lg p-5 "
                >
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

                    <input
                        disabled={loading}
                        className="form_btn mt-4 cursor-pointer"
                        type="submit"
                        value={loading ? 'Please wait...' : 'Reset Password'}
                    />
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
