// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import { _updateUser, _userInfo } from "../../../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const navigate_to = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo });

    const [firstName, set_firstName] = useState("");
    const [lastName, set_lastName] = useState("");

    const handleInputChange = (set_func) => (event) => set_func(event.target.value);

    const updateUserMutation = useMutation({
        mutationFn: _updateUser,
        onSuccess: () => {
            navigate_to('/userprofile')
        },
    });

    useEffect(() => {
        if (data?.data?._id) {
            set_firstName(data.data.firstName);
            set_lastName(data.data.lastName);
        }
    }, [data]);

    return (
        <div className="flex flex-col min-h-screen bg-[url('/images/parchment-bg.jpg')] bg-cover text-gray-900">
            {/* Navbar */}
            <div className="navbar bg-amber-100/80 shadow-md backdrop-blur-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-2xl font-serif tracking-wide text-amber-900">
                        📚 BIntellegent
                    </a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex justify-center items-center flex-1 p-6">
                <div className="relative w-full max-w-md bg-yellow-50/90 border-l-4 border-amber-400 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
                    {/* Fun Book Decorations */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-200/50 rounded-full rotate-12 pointer-events-none"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-200/50 rounded-full -rotate-12 pointer-events-none"></div>

                    <h1 className="text-4xl font-serif font-bold text-amber-900 mb-8 text-center">
                        ✍️ Edit Profile
                    </h1>

                    <div className="space-y-6">
                        {/* First Name */}
                        <div className="relative">
                            <input
                                type="text"
                                value={firstName}
                                onChange={handleInputChange(set_firstName)}
                                className="block w-full py-2.5 px-0 text-gray-900 bg-transparent border-0 border-b-2 border-amber-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer"
                                placeholder=" "
                            />
                            <label className="absolute text-sm text-amber-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                                First Name
                            </label>
                        </div>

                        {/* Last Name */}
                        <div className="relative">
                            <input
                                type="text"
                                value={lastName}
                                onChange={handleInputChange(set_lastName)}
                                className="block w-full py-2.5 px-0 text-gray-900 bg-transparent border-0 border-b-2 border-amber-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer"
                                placeholder=" "
                            />
                            <label className="absolute text-sm text-amber-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                                Last Name
                            </label>
                        </div>

                        {/* Update Button */}
                        <button
                            className="w-full py-2 text-lg rounded-full bg-amber-400 text-white font-semibold hover:bg-amber-500 transition-colors"
                            onClick={() => updateUserMutation.mutate({ firstName, lastName, id: data?.data?._id })}
                        >
                            ✅ Done
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserProfile;
