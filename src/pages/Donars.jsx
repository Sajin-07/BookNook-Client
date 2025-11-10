import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import MenuDropdown from '../common_components/MenuDropdown';
import { motion } from 'framer-motion';
import { FaHeart, FaCrown, FaStar, FaGift } from 'react-icons/fa';

const Donars = () => {
    const fetchAllDonars = async () => {
        const response = await axios.get('http://localhost:4000/api/v1/donar');
        return response?.data;
    };

    const { data, isLoading, error, refetch } = useQuery({ 
        queryKey: ['donars'], 
        queryFn: fetchAllDonars 
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full"
                />
            </div>
        );
    }

    // Sort donors by amount (highest first) and get top 3 for special badges
    const sortedDonars = data?.donars?.sort((a, b) => b.amount - a.amount) || [];
    const topDonars = sortedDonars.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 text-amber-200 text-4xl opacity-20">❤️</div>
                <div className="absolute bottom-20 left-10 text-amber-200 text-3xl opacity-20">🎁</div>
                <div className="absolute top-1/2 left-1/4 text-orange-200 text-2xl opacity-20">⭐</div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-lg">❤️</span>
                            </div>
                            <span className="text-2xl font-bold text-amber-900">Our Supporters</span>
                        </motion.div>
                        <MenuDropdown />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-amber-900 mb-4">
                            Amazing Book Lovers
                        </h1>
                        <p className="text-xl text-amber-700 max-w-2xl mx-auto">
                            These wonderful supporters help keep our community thriving and full of stories
                        </p>
                        
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-sm">
                                <div className="text-3xl font-bold text-amber-600">
                                    {data?.donars?.length || 0}
                                </div>
                                <div className="text-amber-700">Total Supporters</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-sm">
                                <div className="text-3xl font-bold text-amber-600">
                                    ${data?.donars?.reduce((sum, donar) => sum + donar.amount, 0) || 0}
                                </div>
                                <div className="text-amber-700">Total Donated</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-sm">
                                <div className="text-3xl font-bold text-amber-600">
                                    {data?.donars?.filter(d => d.success).length || 0}
                                </div>
                                <div className="text-amber-700">Successful Donations</div>
                            </div>
                        </div>
                    </div>

                    {/* Top Donors Section */}
                    {topDonars.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-amber-900 text-center mb-8">
                                🏆 Top Supporters
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {topDonars.map((donar, index) => (
                                    <motion.div
                                        key={donar._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        whileHover={{ y: -5 }}
                                        className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 text-center ${
                                            index === 0 ? 'border-yellow-400' : 
                                            index === 1 ? 'border-gray-400' : 
                                            'border-amber-600'
                                        }`}
                                    >
                                        {/* Rank Badge */}
                                        <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                            index === 0 ? 'bg-yellow-500' : 
                                            index === 1 ? 'bg-gray-500' : 
                                            'bg-amber-600'
                                        }`}>
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                        </div>
                                        
                                        <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaHeart className="text-white text-xl" />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-amber-900 mb-2">
                                            {donar.userId?.username}
                                        </h3>
                                        <div className="text-2xl font-bold text-amber-600 mb-2">
                                            ${donar.amount}
                                        </div>
                                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                            donar.success 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {donar.success ? '✅ Success' : '❌ Failed'}
                                        </div>
                                        <div className="text-amber-500 text-sm mt-2">
                                            {new Date(donar.createdAt).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Donors List */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-amber-200">
                            <h2 className="text-2xl font-bold text-amber-900">
                                All Supporters
                            </h2>
                            <p className="text-amber-600">
                                Every contribution helps us grow our book community
                            </p>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-amber-50">
                                        <th className="px-6 py-4 text-left text-amber-700 font-semibold">Supporter</th>
                                        <th className="px-6 py-4 text-left text-amber-700 font-semibold">Amount</th>
                                        <th className="px-6 py-4 text-left text-amber-700 font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-amber-700 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-100">
                                    {sortedDonars.map((donar, index) => (
                                        <motion.tr
                                            key={donar._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            whileHover={{ backgroundColor: "rgba(253, 230, 138, 0.3)" }}
                                            className="transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm">❤️</span>
                                                    </div>
                                                    <span className="font-medium text-amber-900">
                                                        {donar.userId?.username}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-amber-600">
                                                        ${donar.amount}
                                                    </span>
                                                    <FaGift className="text-amber-400" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                                    donar.success 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {donar.success ? '✅ Success' : '❌ Failed'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-amber-600">
                                                {new Date(donar.createdAt).toLocaleDateString()}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {(!sortedDonars || sortedDonars.length === 0) && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaHeart className="text-amber-500 text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                                    No Supporters Yet
                                </h3>
                                <p className="text-amber-600">
                                    Be the first to support our book community!
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Donars;


// import React from 'react';
// import { useQuery } from "@tanstack/react-query";
// import axios from 'axios';
// import MenuDropdown from '../common_components/MenuDropdown';
// const Donars = () => {


//     const fetchAllDonars = async () => {
//         const response = await axios.get('http://localhost:4000/api/v1/donar');
//         return response?.data;
//         console.log(response?.data, 8);
//     };

//     const { data, isLoading, error, refetch } = useQuery({ queryKey: ['donars'], queryFn: fetchAllDonars });



//     return (
//         <div className='bg-white'>
//             <div className="navbar bg-base-100">
//                 <div className="flex-1">
//                     <a className="btn btn-ghost text-xl">BookStore</a>
//                 </div>
//                 <div className="flex-none gap-2">
//                     <MenuDropdown />
//                 </div>
//             </div>
//             <div className="overflow-x-auto px-20 mx-20">
//                 <table className="table px-20 mx-20">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Donation Amount</th>
//                             <th>status</th>
//                             <th>Given At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {data?.donars?.map(donar => <tr>
//                             <th></th>
//                             <td>{donar?.userId?.username}</td>
//                             <td>{donar?.amount}</td>
//                             <td>{donar?.success}</td>
//                             <td>{donar?.createdAt}</td>
//                         </tr>)}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Donars;