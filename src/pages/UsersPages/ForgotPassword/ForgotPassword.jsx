import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import forgotPass from '../../../assets/forgot-password.json';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        setError('');
        setLoading(true);
        axios
            .post('http://localhost:5000/users/forgot-password', { ...data })
            .then((res) => {
                if (res.data.status) {
                    Swal.fire(
                        `${res.data.message}`,
                        'Please check your email, password reset mail has been sent to you.',
                        'success'
                    );
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
    console.log(error);
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

                    <input
                        disabled={loading}
                        className="form_btn mt-4 cursor-pointer"
                        type="submit"
                        value={loading ? 'Please wait...' : 'Forgot Password'}
                    />
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
