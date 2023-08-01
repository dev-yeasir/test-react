import React from 'react';
import { useForm } from 'react-hook-form';
import UploadProfile from './UploadProfile';

function UserProfile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col justify-center items-center my-16">
            <UploadProfile />
            <form
                className="w-[80%] mx-auto text-center mt-16"
                onSubmit={handleSubmit(onSubmit)}
                action=""
            >
                <div className="grid grid-cols-2 gap-20 ">
                    <div className="flex flex-col gap-6">
                        <div>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                placeholder="Yeasir Arafat"
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            />
                            {errors.name && (
                                <p className="mt-3 text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register('email', { required: 'Email is required' })}
                                placeholder="arafat.yeasir@codetikki.in"
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            />
                            {errors.email && (
                                <p className="mt-3 text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register('division', { required: 'Division is required' })}
                                placeholder="Division"
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            />
                            {errors.division && (
                                <p className="mt-3 text-red-500">{errors.division.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <select
                                name=""
                                id=""
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            >
                                <option value="india">India</option>
                                <option value="bangladesh">Bangladesh</option>
                                <option value="nepal">Nepal</option>
                            </select>
                        </div>
                        <div>
                            <select
                                name=""
                                id=""
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            >
                                <option value="india">Developer</option>
                                <option value="bangladesh">Engineer</option>
                                <option value="nepal">Student</option>
                            </select>
                        </div>
                        <div>
                            <select
                                name=""
                                id=""
                                className="w-full h-11 border border-slate-300 outline-none rounded-lg px-3"
                            >
                                <option value="india">Institute</option>
                                <option value="bangladesh">Bangladesh</option>
                                <option value="nepal">Nepal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Update Profile"
                    className="py-2 px-3 bg-primary text-white text-lg font-medium  rounded-lg mt-10 w-[40%] mx-auto"
                />
            </form>
        </div>
    );
}

export default UserProfile;
