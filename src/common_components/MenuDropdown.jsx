import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { _userInfo } from "../utils/axios_controllers";
import AddBookRequest from "./AddBookRequest";
import login_info from "../login_info";

export default function MenuDropdown() {
    const navigate_to = useNavigate();
    const [amount, setAmount] = useState(0);

    // User info
    const { data, isLoading } = useQuery({ 
        queryKey: ['userInfo'], 
        queryFn: _userInfo 
    });

    const isLoggedIn = login_info.user_name || data?.data;

    // Handle donation
    const handleDonate = async () => {
        console.log('click');
        const response = await fetch('https://book-store-server-lyart.vercel.app/init', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount }),
            credentials: 'include'
        });
        const jsonRes = await response.json();
        window.location.replace(jsonRes.GatewayPageURL);
    };

    const menuItems = [
        { 
            icon: "👤", 
            label: "Profile", 
            path: "/userprofile",
            badge: "Active"
        },
        { 
            icon: "📚", 
            label: "My Library", 
            path: "/booklibrary" 
        },
        { 
            icon: "🔍", 
            label: "Browse Books", 
            path: "/booksearch" 
        },
        { 
            icon: "🏆", 
            label: "Challenges", 
            path: "/challenges" 
        },
        { 
            icon: "❤️", 
            label: "Our Supporters", 
            path: "/donars" 
        },
        { 
            icon: "📖", 
            label: "Request a Book", 
            action: () => document.getElementById('addBookRequest_modal').showModal()
        },
        { 
            icon: "🏅", 
            label: "Leaderboard", 
            path: "/challange-leaderbord" 
        },
    ];

    const adminItems = [
        { 
            icon: "👥", 
            label: "User Management", 
            path: "/user-management" 
        },
        { 
            icon: "📝", 
            label: "Contest Responses", 
            path: "/contest-response" 
        },
        { 
            icon: "🎯", 
            label: "Create Contest", 
            path: "/create-contest" 
        },
        { 
            icon: "📗", 
            label: "Create Book", 
            path: "/create-book" 
        },
        { 
            icon: "📋", 
            label: "Book Requests", 
            path: "/book-requests" 
        },
    ];

    return (
        <div className="dropdown dropdown-end">
            {/* Trigger Button */}
            <label 
                tabIndex={0} 
                className="btn btn-ghost btn-circle avatar relative"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white font-bold text-lg">📚</span>
                </div>
            </label>

            {/* Dropdown Menu */}
            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-4 shadow-2xl menu dropdown-content bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 w-64 space-y-2"
            >
                {/* User Info Header */}
                <div className="pb-3 border-b border-amber-200 mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">👤</span>
                        </div>
                        <div>
                            <p className="font-bold text-amber-900 text-sm">
                                {data?.data?.username || "Book Lover"}
                            </p>
                            <p className="text-amber-600 text-xs">
                                {data?.data?.role === 'admin' ? '📊 Administrator' : '🌟 Reader'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Menu Items */}
                {menuItems.map((item) => (
                    <li key={item.label}>
                        <button
                            onClick={() => {
                                if (item.path) {
                                    navigate_to(item.path);
                                } else if (item.action) {
                                    item.action();
                                }
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 transition-colors duration-200"
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium text-amber-800 flex-1 text-left">
                                {item.label}
                            </span>
                            {item.badge && (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    </li>
                ))}

                {/* Admin Section */}
                {data?.data?.role === 'admin' && (
                    <>
                        <div className="pt-2 border-t border-amber-200">
                            <p className="text-amber-600 text-xs font-bold uppercase tracking-wider px-3 py-1">
                                🛠️ Admin Tools
                            </p>
                        </div>
                        {adminItems.map((item) => (
                            <li key={item.label}>
                                <button
                                    onClick={() => navigate_to(item.path)}
                                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-purple-100 border border-purple-200 hover:border-purple-400 transition-colors duration-200"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium text-purple-800 flex-1 text-left">
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </>
                )}

                {/* Donate Button */}
                <li className="pt-2 border-t border-amber-200">
                    <button
                        onClick={() => document.getElementById('donate_modal').showModal()}
                        className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold transition-colors duration-200"
                    >
                        <span className="text-lg">❤️</span>
                        <span>Support Our Story</span>
                    </button>
                </li>

                {/* Logout Button - Only show if logged in */}
                {isLoggedIn && (
                    <li className="pt-2">
                        <button
                            onClick={() => navigate_to("/login")}
                            className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-red-50 border border-red-200 hover:border-red-400 text-red-600 font-medium transition-colors duration-200"
                        >
                            <span className="text-lg">🚪</span>
                            <span>Logout</span>
                        </button>
                    </li>
                )}
            </ul>

            {/* Donate Modal */}
            <dialog id="donate_modal" className="modal">
                <div className="modal-box bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 rounded-2xl shadow-2xl p-0 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl">❤️</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-amber-900">Support Our Library</h3>
                                <p className="text-amber-600">Help us add more amazing books!</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-amber-700">
                                Your contribution helps us grow our collection and keep the stories flowing.
                            </p>
                            
                            <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
                                <label className="block text-amber-800 font-medium mb-2">
                                    Donation Amount ($)
                                </label>
                                <input
                                    className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    placeholder="Enter amount"
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors duration-200 font-medium"
                                    onClick={() => document.getElementById('donate_modal').close()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-colors duration-200 font-medium"
                                    onClick={handleDonate}
                                >
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <AddBookRequest />
        </div>
    );
}


// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { _userInfo } from "../utils/axios_controllers";
// import AddBookRequest from "./AddBookRequest";
// import login_info from "../login_info";
// import { motion, AnimatePresence } from "framer-motion";

// export default function MenuDropdown() {
//     const navigate_to = useNavigate();
//     const [amount, setAmount] = useState(0);
//     const [isOpen, setIsOpen] = useState(false);

//     // User info
//     const { data, isLoading } = useQuery({ 
//         queryKey: ['userInfo'], 
//         queryFn: _userInfo 
//     });

//     const isLoggedIn = login_info.user_name || data?.data;

//     // Handle donation
//     const handleDonate = async () => {
//         console.log('click');
//         const response = await fetch('https://book-store-server-lyart.vercel.app/init', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ amount }),
//             credentials: 'include'
//         });
//         const jsonRes = await response.json();
//         window.location.replace(jsonRes.GatewayPageURL);
//     };

//     const menuItems = [
//         { 
//             icon: "👤", 
//             label: "Profile", 
//             path: "/userprofile",
//             badge: "Active"
//         },
//         { 
//             icon: "📚", 
//             label: "My Library", 
//             path: "/booklibrary" 
//         },
//         { 
//             icon: "🔍", 
//             label: "Browse Books", 
//             path: "/booksearch" 
//         },
//         { 
//             icon: "🏆", 
//             label: "Challenges", 
//             path: "/challenges" 
//         },
//         { 
//             icon: "❤️", 
//             label: "Our Supporters", 
//             path: "/donars" 
//         },
//         { 
//             icon: "📖", 
//             label: "Request a Book", 
//             action: () => document.getElementById('addBookRequest_modal').showModal()
//         },
//         { 
//             icon: "🏅", 
//             label: "Leaderboard", 
//             path: "/challange-leaderbord" 
//         },
//     ];

//     const adminItems = [
//         { 
//             icon: "👥", 
//             label: "User Management", 
//             path: "/user-management" 
//         },
//         { 
//             icon: "📝", 
//             label: "Contest Responses", 
//             path: "/contest-response" 
//         },
//         { 
//             icon: "🎯", 
//             label: "Create Contest", 
//             path: "/create-contest" 
//         },
//         { 
//             icon: "📗", 
//             label: "Create Book", 
//             path: "/create-book" 
//         },
//         { 
//             icon: "📋", 
//             label: "Book Requests", 
//             path: "/book-requests" 
//         },
//     ];

//     return (
//         <div className="dropdown dropdown-end">
//             {/* Trigger Button */}
//             <motion.label 
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 tabIndex={0} 
//                 className="btn btn-ghost btn-circle avatar relative group"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white">
//                     <span className="text-white font-bold text-lg">📚</span>
//                 </div>
                
//                 {/* Animated Ping */}
//                 <div className="absolute -top-1 -right-1">
//                     <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
//                     <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0"></div>
//                 </div>
//             </motion.label>

//             {/* Dropdown Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.9 }}
//                         transition={{ duration: 0.2 }}
//                         tabIndex={0}
//                         className="mt-3 z-[1] p-4 shadow-2xl menu dropdown-content bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 w-64 space-y-2"
//                     >
//                         {/* User Info Header */}
//                         <div className="pb-3 border-b border-amber-200 mb-2">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
//                                     <span className="text-white text-xl">👤</span>
//                                 </div>
//                                 <div>
//                                     <p className="font-bold text-amber-900 text-sm">
//                                         {data?.data?.username || "Book Lover"}
//                                     </p>
//                                     <p className="text-amber-600 text-xs">
//                                         {data?.data?.role === 'admin' ? '📊 Administrator' : '🌟 Reader'}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Menu Items */}
//                         {menuItems.map((item, index) => (
//                             <motion.li
//                                 key={item.label}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                                 whileHover={{ x: 5 }}
//                                 className="group"
//                             >
//                                 <button
//                                     onClick={() => {
//                                         if (item.path) {
//                                             navigate_to(item.path);
//                                         } else if (item.action) {
//                                             item.action();
//                                         }
//                                         setIsOpen(false);
//                                     }}
//                                     className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 transition-all duration-200 group-hover:shadow-md"
//                                 >
//                                     <span className="text-lg">{item.icon}</span>
//                                     <span className="font-medium text-amber-800 flex-1 text-left">
//                                         {item.label}
//                                     </span>
//                                     {item.badge && (
//                                         <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//                                             {item.badge}
//                                         </span>
//                                     )}
//                                     <motion.span
//                                         whileHover={{ scale: 1.2 }}
//                                         className="text-amber-400 group-hover:text-amber-600"
//                                     >
//                                         →
//                                     </motion.span>
//                                 </button>
//                             </motion.li>
//                         ))}

//                         {/* Admin Section */}
//                         {data?.data?.role === 'admin' && (
//                             <>
//                                 <div className="pt-2 border-t border-amber-200">
//                                     <p className="text-amber-600 text-xs font-bold uppercase tracking-wider px-3 py-1">
//                                         🛠️ Admin Tools
//                                     </p>
//                                 </div>
//                                 {adminItems.map((item, index) => (
//                                     <motion.li
//                                         key={item.label}
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: (menuItems.length + index) * 0.05 }}
//                                         whileHover={{ x: 5 }}
//                                         className="group"
//                                     >
//                                         <button
//                                             onClick={() => {
//                                                 navigate_to(item.path);
//                                                 setIsOpen(false);
//                                             }}
//                                             className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-purple-100 border border-purple-200 hover:border-purple-400 transition-all duration-200 group-hover:shadow-md"
//                                         >
//                                             <span className="text-lg">{item.icon}</span>
//                                             <span className="font-medium text-purple-800 flex-1 text-left">
//                                                 {item.label}
//                                             </span>
//                                             <motion.span
//                                                 whileHover={{ scale: 1.2 }}
//                                                 className="text-purple-400 group-hover:text-purple-600"
//                                             >
//                                                 →
//                                             </motion.span>
//                                         </button>
//                                     </motion.li>
//                                 ))}
//                             </>
//                         )}

//                         {/* Donate Button */}
//                         <motion.li
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4 }}
//                             className="pt-2 border-t border-amber-200"
//                         >
//                             <button
//                                 onClick={() => document.getElementById('donate_modal').showModal()}
//                                 className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold transition-all duration-200 hover:shadow-lg group"
//                             >
//                                 <span className="text-lg">❤️</span>
//                                 <span>Support Our Story</span>
//                                 <motion.span
//                                     animate={{ scale: [1, 1.2, 1] }}
//                                     transition={{ duration: 2, repeat: Infinity }}
//                                     className="text-lg"
//                                 >
//                                     ✨
//                                 </motion.span>
//                             </button>
//                         </motion.li>

//                         {/* Logout Button - Only show if logged in */}
//                         {isLoggedIn && (
//                             <motion.li
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.5 }}
//                                 className="pt-2"
//                             >
//                                 <button
//                                     onClick={() => {
//                                         navigate_to("/login");
//                                         setIsOpen(false);
//                                     }}
//                                     className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-red-50 border border-red-200 hover:border-red-400 text-red-600 font-medium transition-all duration-200 hover:shadow-md group"
//                                 >
//                                     <span className="text-lg">🚪</span>
//                                     <span>Logout</span>
//                                     <motion.span
//                                         whileHover={{ scale: 1.2 }}
//                                         className="text-red-400 group-hover:text-red-600"
//                                     >
//                                         →
//                                     </motion.span>
//                                 </button>
//                             </motion.li>
//                         )}
//                     </motion.ul>
//                 )}
//             </AnimatePresence>

//             {/* Donate Modal */}
//             <dialog id="donate_modal" className="modal">
//                 <div className="modal-box bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 rounded-2xl shadow-2xl p-0 overflow-hidden">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="p-6"
//                     >
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-xl">❤️</span>
//                             </div>
//                             <div>
//                                 <h3 className="text-2xl font-bold text-amber-900">Support Our Library</h3>
//                                 <p className="text-amber-600">Help us add more amazing books!</p>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <p className="text-amber-700">
//                                 Your contribution helps us grow our collection and keep the stories flowing.
//                             </p>
                            
//                             <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
//                                 <label className="block text-amber-800 font-medium mb-2">
//                                     Donation Amount ($)
//                                 </label>
//                                 <input
//                                     className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200"
//                                     value={amount}
//                                     onChange={(e) => setAmount(e.target.value)}
//                                     type="number"
//                                     placeholder="Enter amount"
//                                 />
//                             </div>

//                             <div className="flex gap-3 justify-end pt-4">
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-all duration-200 font-medium"
//                                     onClick={() => document.getElementById('donate_modal').close()}
//                                 >
//                                     Cancel
//                                 </motion.button>
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
//                                     onClick={handleDonate}
//                                 >
//                                     Donate Now
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
                
//                 <form method="dialog" className="modal-backdrop">
//                     <button onClick={() => setIsOpen(false)}>close</button>
//                 </form>
//             </dialog>

//             <AddBookRequest />
//         </div>
//     );
// }




// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { _userInfo } from "../utils/axios_controllers";
// import AddBookRequest from "./AddBookRequest";
// import login_info from "../login_info";

// export default function () {
//     const navigate_to = useNavigate();
//     const [amount, setAmount] = useState(0)

//     // ! user info
//     const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
//     console.log({ data });


//     // ! handle donation
//     const handleValidate = async () => {
//         console.log('click');
//         const res = await fetch('https://book-store-server-lyart.vercel.app/validate')
//         const jsonRes = await res.json();
//         // console.log(jsonRes);
//         // window.location.replace(jsonRes.GatewayPageURL)
//         console.log({ jsonRes });
//     }
//     const handleDonate = async () => {
//         console.log('click');
//         const response = await fetch('https://book-store-server-lyart.vercel.app/init', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             // You can include a body if you need to send data with your request
//             body: JSON.stringify({
//                 amount
//             }),
//             credentials: 'include'
//         });
//         const jsonRes = await response.json();
//         // console.log(jsonRes);
//         window.location.replace(jsonRes.GatewayPageURL)
//         console.log({ jsonRes });
//     }
//     // useEffect(() => {
//     //     handleDonate();
//     // }, [])

//     return (
//         <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                 <div className="w-8 rounded-full">
//                     <img
//                         alt="Tailwind CSS Navbar component"
//                         src="./src/assets/user_icon.jpg"
//                     />
//                 </div>
//             </label>
//             <ul
//                 tabIndex={0}
//                 className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//             >
//                 <li
//                     key="profile"
//                     onClick={() => {
//                         navigate_to("/userprofile");
//                     }}
//                 >
//                     <a className="justify-between">
//                         Profile
//                         <span className="badge">Active</span>
//                     </a>
//                 </li>
//                 <li
//                     key="library"
//                     onClick={() => {
//                         navigate_to("/booklibrary");
//                     }}
//                 >
//                     <a>Library</a>
//                 </li>
//                 <li
//                     key="book-list"
//                     onClick={() => {
//                         navigate_to("/booksearch");
//                     }}
//                 >
//                     <a>Book List</a>
//                 </li>
//                 <li
//                     key="challenges"
//                     onClick={() => {
//                         navigate_to("/challenges");
//                     }}
//                 >
//                     <a>Challenges</a>
//                 </li>
//                 <li
//                     key="donars"
//                     onClick={() => {
//                         navigate_to("/donars");
//                     }}
//                 >
//                     <a>All Donar</a>
//                 </li>
//                 <li
//                     key="Request a book"
//                     typeof="btn"
//                     onClick={() => document.getElementById('addBookRequest_modal').showModal()}
//                 >
//                     {/* <button className="btn" > */}
//                     <p>Request Book</p>
//                     {/* </button> */}
//                 </li>

//                 <li
//                     key="challange-leaderbord"
//                     onClick={() => {
//                         navigate_to("/challange-leaderbord");
//                     }}
//                 >
//                     <a>Challenge Leaderboard</a>
//                 </li>
//                 {/* admin route start */}
//                 {
//                     data?.data?.role === 'admin' ? <li
//                         key="user-management"
//                         onClick={() => {
//                             navigate_to("/user-management");
//                         }}
//                     >
//                         <a>User Management</a>
//                     </li> : null
//                 }
//                 {
//                     data?.data?.role === 'admin' ? <li
//                         key="contest-response"
//                         onClick={() => {
//                             navigate_to("/contest-response");
//                         }}
//                     >
//                         <a>Contest Responses</a>
//                     </li> : null
//                 }
//                 {
//                     data?.data?.role === 'admin' ? <li
//                         key="create-contest"
//                         onClick={() => {
//                             navigate_to("/create-contest");
//                         }}
//                     >
//                         <a>Create Contest</a>
//                     </li> : null
//                 }
//                 {
//                     data?.data?.role === 'admin' ? <li
//                         key="create-book"
//                         onClick={() => {
//                             navigate_to("/create-book");
//                         }}
//                     >
//                         <a>Create Book</a>
//                     </li> : null
//                 }
//                 {
//                     data?.data?.role === 'admin' ? <li
//                         key="book-requests"
//                         onClick={() => {
//                             navigate_to("/book-requests");
//                         }}
//                     >
//                         <a>Book Requests</a>
//                     </li> : null
//                 }

//                 {/* admin route end */}
//                 <li
//                     key="logout"
//                     onClick={() => {
//                         navigate_to("/login");
//                     }}
//                 >
//                     <a>Logout</a>
//                 </li>
//                 <li
//                 // key="logout"
//                 // onClick={() => {
//                 //     navigate_to("/login");
//                 // }}
//                 >
//                     {/* <a href="https://book-store-server-lyart.vercel.app/init" > */}
//                     <button className="btn" onClick={() => document.getElementById('donate_modal').showModal()}>Donate us</button>
//                     <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
//                         <div className="modal-box">
//                             <h3 className="font-bold text-lg">Thanks for the Donation</h3>
//                             <p className="py-4">Your contribution matters </p>
//                             <div className="modal-action">
//                                 <form method="dialog">
//                                     <input
//                                         className="input input-bordered w-full max-w-xs"
//                                         value={amount}
//                                         onChange={(e) => setAmount(e.target.value)}
//                                         type="text" typeof="number"
//                                         placeholder="Enter the amount you want to pay" />
//                                     {/* if there is a button in form, it will close the modal */}
//                                     <button
//                                         onClick={() => handleDonate()}
//                                         className="btn">
//                                         Close</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </dialog>

//                     {/* <button >Donate us</button> */}
//                     {/* </a> */}
//                 </li>
//             </ul>
//             <AddBookRequest />
//         </div>
//     );
// }
