import { HiOutlineUserCircle } from 'react-icons/hi';

function UploadProfile() {
    return (
        <div className="border-2 border-dashed border-slate-800 w-[600px] text-center p-10">
            <span className=" text-primary flex justify-center">
                <HiOutlineUserCircle size={100} />
            </span>
            <h2 className="text-2xl mt-6">Upload Your Profile Picture </h2>
        </div>
    );
}

export default UploadProfile;
