import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import verifyUnsuccess from '../../../assets/error.json';
import verifySuccess from '../../../assets/verifySuccess.json';

function EmailVerify() {
    const { token } = useParams();
    const [verifyStatus, setVerifyStatus] = useState({});
    useEffect(() => {
        axios
            .get(`http://localhost:5000/users/verify/${token}`)
            .then((res) => setVerifyStatus(res.data))
            .catch((error) => {
                if (error) {
                    setVerifyStatus(error.response.data);
                }
            });
    }, [token]);
    console.log(verifyStatus);
    return (
        <div className="flex justify-center items-center h-screen">
            {verifyStatus?.status === true ? (
                <div className="w-1/2  mx-auto ">
                    <div
                        className=" max-w-[500px] mx-auto"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <Lottie animationData={verifySuccess} loop={false} />
                    </div>
                    <h1 className="text-3xl text-center text-bold">{verifyStatus?.message}</h1>
                    <Link
                        className="text-center w-1/3 mx-auto mt-5 flex justify-center uppercase bg-primary py-2 px-5 rounded-lg text-white"
                        to="/"
                    >
                        Go back to profile
                    </Link>
                </div>
            ) : (
                <div className="w-1/2  mx-auto ">
                    <div
                        className=" max-w-[400px] mx-auto"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <Lottie animationData={verifyUnsuccess} loop={false} />
                    </div>
                    <h1 className="text-3xl text-center text-bold mt-5">{verifyStatus?.message}</h1>
                    <Link
                        className="text-center w-1/3 mx-auto mt-5 flex justify-center uppercase bg-primary py-2 px-5 rounded-lg text-white"
                        to="/"
                    >
                        Go back to home
                    </Link>
                </div>
            )}
        </div>
    );
}

export default EmailVerify;
