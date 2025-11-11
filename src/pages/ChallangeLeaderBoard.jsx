import React from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { useQuery } from '@tanstack/react-query';
import { _getLeaderBoard } from '../utils/axios_controllers';
import { FaTrophy, FaCrown, FaMedal, FaBook, FaBookOpen, FaUser, FaStar, FaAward } from 'react-icons/fa';

const ChallengeLeaderBoard = () => {
    const { data, isLoading, error, refetch } = useQuery({ 
        queryKey: ['users'], 
        queryFn: _getLeaderBoard 
    });

    // Sort users by progress in descending order
    const sortedUsers = data?.data?.sort((a, b) => b.progress - a.progress) || [];

    const getRankColor = (index) => {
        switch(index) {
            case 0: return 'from-yellow-400 to-amber-500'; // Gold
            case 1: return 'from-gray-400 to-gray-500';    // Silver
            case 2: return 'from-amber-700 to-orange-800'; // Bronze
            default: return 'from-amber-100 to-orange-100';
        }
    };

    const getRankIcon = (index) => {
        switch(index) {
            case 0: return <FaCrown className="text-yellow-400" />;
            case 1: return <FaTrophy className="text-gray-300" />;
            case 2: return <FaMedal className="text-amber-600" />;
            default: return <FaAward className="text-amber-400" />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="navbar bg-gradient-to-r from-amber-900 to-brown-800 text-amber-100">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 ml-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-white" />
                            </div>
                            <span className="text-xl font-serif font-bold">BookNook</span>
                        </div>
                    </div>
                    <div className="flex-none gap-2 mr-4">
                        <MenuDropdown />
                    </div>
                </div>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-amber-500 mb-4"></div>
                        <p className="text-amber-700 font-medium">Loading leaderboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="navbar bg-gradient-to-r from-amber-900 to-brown-800 text-amber-100">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 ml-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-white" />
                            </div>
                            <span className="text-xl font-serif font-bold">BookNook</span>
                        </div>
                    </div>
                    <div className="flex-none gap-2 mr-4">
                        <MenuDropdown />
                    </div>
                </div>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center text-amber-700">
                        <p>Error loading leaderboard. Please try again.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            {/* Header */}
            <div className="navbar bg-gradient-to-r from-amber-900 to-brown-800 text-amber-100 shadow-lg">
                <div className="flex-1">
                    <div className="flex items-center gap-3 ml-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                            <FaTrophy className="text-white text-lg" />
                        </div>
                        <div>
                            <span className="text-xl font-serif font-bold">BookNook</span>
                            <p className="text-amber-200 text-xs">Reading Challenge</p>
                        </div>
                    </div>
                </div>
                <div className="flex-none gap-2 mr-4">
                    <MenuDropdown />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <FaCrown className="text-xl" />
                        <h1 className="text-3xl font-serif font-bold">Reading Challenge Leaderboard</h1>
                        <FaCrown className="text-xl" />
                    </div>
                    <p className="text-amber-700 text-lg max-w-2xl mx-auto">
                        Track your reading progress and compete with fellow book lovers!
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 text-center">
                        <div className="flex justify-center mb-3">
                            <FaBook className="text-3xl text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">
                            {sortedUsers.reduce((sum, user) => sum + user.completedBooks, 0)}
                        </h3>
                        <p className="text-amber-600">Total Books Completed</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 text-center">
                        <div className="flex justify-center mb-3">
                            <FaUser className="text-3xl text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">
                            {sortedUsers.length}
                        </h3>
                        <p className="text-amber-600">Active Readers</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 text-center">
                        <div className="flex justify-center mb-3">
                            <FaStar className="text-3xl text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">
                            {Math.max(...sortedUsers.map(user => user.progress))}%
                        </h3>
                        <p className="text-amber-600">Top Progress</p>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                        <div className="grid grid-cols-12 gap-4 font-bold text-lg">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Reader</div>
                            <div className="col-span-3 text-center">Progress</div>
                            <div className="col-span-2 text-center">Target</div>
                            <div className="col-span-2 text-center">Completed</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-amber-100">
                        {sortedUsers.map((user, index) => (
                            <div 
                                key={index}
                                className={`p-6 hover:bg-amber-50 transition-colors duration-200 ${
                                    index < 3 ? 'bg-gradient-to-r ' + getRankColor(index) + ' text-white' : ''
                                }`}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    {/* Rank */}
                                    <div className="col-span-1 text-center">
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                                            index < 3 ? 'bg-white/20' : 'bg-amber-100'
                                        }`}>
                                            <span className={`font-bold ${
                                                index < 3 ? 'text-white' : 'text-amber-700'
                                            }`}>
                                                {index < 3 ? getRankIcon(index) : `#${index + 1}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="col-span-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                index < 3 ? 'bg-white/20' : 'bg-amber-100'
                                            }`}>
                                                <FaUser className={index < 3 ? 'text-white' : 'text-amber-600'} />
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg ${
                                                    index < 3 ? 'text-white' : 'text-amber-900'
                                                }`}>
                                                    {user.user[0]?.username || 'Anonymous Reader'}
                                                </h3>
                                                <p className={`text-sm ${
                                                    index < 3 ? 'text-amber-100' : 'text-amber-600'
                                                }`}>
                                                    Reading Enthusiast
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="col-span-3">
                                        <div className="text-center">
                                            <div className={`text-2xl font-bold mb-1 ${
                                                index < 3 ? 'text-white' : 'text-amber-700'
                                            }`}>
                                                {user.progress}%
                                            </div>
                                            <div className="w-full bg-amber-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${
                                                        index < 3 ? 'bg-white' : 'bg-amber-500'
                                                    }`}
                                                    style={{ width: `${user.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Target Books */}
                                    <div className="col-span-2 text-center">
                                        <div className={`text-xl font-bold ${
                                            index < 3 ? 'text-white' : 'text-amber-700'
                                        }`}>
                                            {user.targetBooks}
                                        </div>
                                        <div className={`text-sm ${
                                            index < 3 ? 'text-amber-100' : 'text-amber-600'
                                        }`}>
                                            Target
                                        </div>
                                    </div>

                                    {/* Completed Books */}
                                    <div className="col-span-2 text-center">
                                        <div className={`text-xl font-bold ${
                                            index < 3 ? 'text-white' : 'text-amber-700'
                                        }`}>
                                            {user.completedBooks}
                                        </div>
                                        <div className={`text-sm flex items-center justify-center gap-1 ${
                                            index < 3 ? 'text-amber-100' : 'text-amber-600'
                                        }`}>
                                            <FaBookOpen className="text-sm" />
                                            Completed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 text-amber-600">
                    <p className="flex items-center justify-center gap-2">
                        <FaTrophy className="text-amber-500" />
                        Keep reading to climb the leaderboard!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChallengeLeaderBoard;

// import React from 'react';
// import MenuDropdown from '../common_components/MenuDropdown';
// import { useQuery } from '@tanstack/react-query';
// import { _getLeaderBoard } from '../utils/axios_controllers';

// const ChallangeLeaderBoard = () => {

//     const { data, isLoading, error, refetch } = useQuery({ queryKey: ['users'], queryFn: _getLeaderBoard });

//     // console.log({ data: data?.data });
//     // !mutate
//     // const updateUserMutation = useMutation({
//     //     mutationFn: _updateUser,
//     //     onSuccess: () => {
//     //         refetch()
//     //     },
//     // })


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
//                             <th>Progress</th>
//                             <th>Target Book</th>
//                             <th>Completed Book</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {data?.data?.map(user => <tr>
//                             <th></th>
//                             <td className='font-black'>{user.user[0]?.username}</td>
//                             <td className='font-black'>{user.progress}</td>
//                             <td className='font-black'>{user.targetBooks}</td>
//                             <td className='font-black'>{user.completedBooks}</td>
//                         </tr>)}
//                     </tbody>
//                 </table>
//             </div>
//         </div >
//     );
// };

// export default ChallangeLeaderBoard;