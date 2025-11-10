// // UserProfile.jsx
// import React from "react";
// import Footer from "../../../common_components/Footer";
// import MenuDropdown from "../../../common_components/MenuDropdown";
// import ChallengeDetails from "./subcomponents/ChallengeDetails";
// import UserDetails from "./subcomponents/UserDetails";
// import { _userInfo } from "../../../utils/axios_controllers";

// const UserProfile = () => {


//     return (
//         <div className="flex flex-col">
//             <div className="navbar bg-base-100">
//                 <div className="flex-1">
//                     <a className="btn btn-ghost text-xl">BookStore</a>
//                 </div>
//                 <div className="flex-none gap-2">
//                     <MenuDropdown />
//                 </div>
//             </div>
//             <div className="m-auto p-4 w-screen">
//                 <div className="grid grid-cols-2 items-">
//                     <div>
//                         <UserDetails />
//                     </div>

//                     <div>
//                         <ChallengeDetails />
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default UserProfile;
// UserProfile.jsx
import React from "react";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import ChallengeDetails from "./subcomponents/ChallengeDetails";
import UserDetails from "./subcomponents/UserDetails";

const UserProfile = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[url('/images/parchment-bg.jpg')] bg-cover bg-center text-gray-800">
            {/* Navbar */}
            <div className="navbar bg-amber-100/80 shadow-md backdrop-blur-md">
                <div className="flex-1">
                    <a className="btn btn-ghost text-2xl font-serif tracking-wider text-amber-900">
                        📖 BookStore
                    </a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>

            {/* Main Content */}
            <div className="m-auto p-6 max-w-6xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Details Card */}
                    <div className="bg-amber-50/90 border-l-4 border-amber-400 rounded-xl shadow-lg p-6 relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-200/50 rounded-full rotate-12 pointer-events-none"></div>
                        <h2 className="font-serif text-xl font-bold mb-4 text-amber-900">👤 Your Profile</h2>
                        <UserDetails />
                    </div>

                    {/* Challenge Details Card */}
                    <div className="bg-amber-50/90 border-l-4 border-yellow-400 rounded-xl shadow-lg p-6 relative overflow-hidden">
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-200/50 rounded-full -rotate-12 pointer-events-none"></div>
                        <h2 className="font-serif text-xl font-bold mb-4 text-yellow-800">🏆 Current Challenges</h2>
                        <ChallengeDetails />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserProfile;
