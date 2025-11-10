import React, { useState } from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { _allContest, _createContest, _createContestResponse } from '../utils/axios_controllers';
import { useMutation, useQuery } from '@tanstack/react-query';
import ParticipateContest from '../common_components/ParticipateContest';
import { FaCrown, FaTrophy, FaCalendar, FaPenAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Contest = () => {
    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['contest'], queryFn: _allContest });

    const participateContestMutation = useMutation({
        mutationFn: _createContestResponse,
        onSuccess: () => {
            toast.success('🎉 Your entry has been submitted!');
            document.getElementById('contestParticipate_modal').close();
            refetch();
            setResponseInfo({
                contestId: '',
                userId: '',
                writings: '',
            });
        },
    });

    const [responseInfo, setResponseInfo] = useState({
        contestId: '',
        writings: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponseInfo({
            ...responseInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        participateContestMutation.mutate(responseInfo);
    };

    const openParticipationModal = (id) => {
        setResponseInfo({
            ...responseInfo,
            contestId: id,
        });
        document.getElementById('contestParticipate_modal').showModal();
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 text-amber-200 text-4xl opacity-20">🏆</div>
                <div className="absolute bottom-20 left-10 text-amber-200 text-3xl opacity-20">📝</div>
                <div className="absolute top-1/2 left-1/4 text-orange-200 text-2xl opacity-20">✍️</div>
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
                                <span className="text-white text-lg">🏆</span>
                            </div>
                            <span className="text-2xl font-bold text-amber-900">Writing Contests</span>
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
                            Writing Challenges
                        </h1>
                        <p className="text-xl text-amber-700 max-w-2xl mx-auto">
                            Showcase your writing skills and win amazing prizes in our book-themed contests
                        </p>
                    </div>

                    {/* Contest Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {data?.data?.map((contest, index) => (
                            <motion.div
                                key={contest._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white">
                                            {contest.contestName}
                                        </h3>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            contest.isActive 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-gray-500 text-white'
                                        }`}>
                                            {contest.isActive ? '🎯 Live' : '❌ Closed'}
                                        </div>
                                    </div>
                                    <div className="flex items-center text-amber-100 text-sm">
                                        <FaCalendar className="mr-2" />
                                        {new Date(contest.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <p className="text-amber-700 mb-4 line-clamp-3">
                                        {contest.details}
                                    </p>

                                    {/* Winner Section or Participate Button */}
                                    {contest.winnerId ? (
                                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-amber-600 text-sm">Winner</p>
                                                    <p className="font-semibold text-amber-900">
                                                        {contest.winnerId?.username}
                                                    </p>
                                                </div>
                                                <FaCrown className="text-amber-500 text-xl" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            {contest.isActive ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => openParticipationModal(contest._id)}
                                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                                                >
                                                    <FaPenAlt />
                                                    Participate
                                                </motion.button>
                                            ) : (
                                                <span className="text-amber-600 text-sm">
                                                    Contest ended
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!data?.data || data.data.length === 0) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTrophy className="text-amber-500 text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-amber-900 mb-2">
                                No Contests Available
                            </h3>
                            <p className="text-amber-600">
                                Check back later for new writing challenges!
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Participation Modal */}
            <dialog id="contestParticipate_modal" className="modal">
                <div className="modal-box bg-white border border-amber-200 rounded-2xl shadow-2xl p-0 overflow-hidden max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <FaPenAlt className="text-amber-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-amber-900">Enter the Contest</h3>
                                <p className="text-amber-600">Share your creative writing</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-amber-800 font-medium mb-2">
                                    Your Writing Submission
                                </label>
                                <textarea
                                    name="writings"
                                    value={responseInfo.writings}
                                    onChange={handleChange}
                                    placeholder="Write your creative piece here... (poem, short story, essay, etc.)"
                                    className="w-full h-64 px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 placeholder-amber-400 resize-none"
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end pt-4">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 font-medium"
                                    onClick={() => document.getElementById('contestParticipate_modal').close()}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                                >
                                    Submit Entry
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
                
                {/* Modal Backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Contest;

// import React, { useState } from 'react';
// import MenuDropdown from '../common_components/MenuDropdown';
// import { _allContest, _createContest, _createContestResponse } from '../utils/axios_controllers';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import ParticipateContest from '../common_components/ParticipateContest';
// import { FaCrown } from "react-icons/fa";
// const Contest = () => {

//     const { data, isLoading, error, refetch } = useQuery({ queryKey: ['contest'], queryFn: _allContest });

//     // console.log(data?.data);
//     // !mutate
//     const participateContestMutation = useMutation({
//         mutationFn: _createContestResponse,
//         onSuccess: () => {
//             toast.success('Received')
//             document.getElementById('contestParticipate_modal').close()
//             refetch()
//             setResponseInfo({
//                 contestId: '',
//                 userId: '',
//                 writings: '',
//             });
//         },
//     })
//     const [responseInfo, setResponseInfo] = useState({
//         contestId: '',
//         writings: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setResponseInfo({
//             ...responseInfo,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Call your function to handle the contest response here, passing responseInfo
//         console.log('Contest response data:', responseInfo);
//         // Reset the form after submission
//         participateContestMutation.mutate(responseInfo);

//     };

//     const openParticipationModal = (id) => {
//         setResponseInfo({
//             ...responseInfo,
//             contestId: id,
//         });
//         document.getElementById('contestParticipate_modal').showModal()
//     }
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
//                             <th>Contest Name</th>
//                             <th>Contest Details</th>
//                             <th>Active</th>
//                             <th>Created At</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {data?.data?.map(contest => <tr>
//                             <th></th>
//                             <th>{contest?.contestName}</th>
//                             {/* <td className='font-black'>{contest.contestName}</td> */}
//                             <td className='font-black'>{contest.details}</td>
//                             <td className='font-black'>{contest.isActive ? 'On Going' : 'Closed'}</td>
//                             <td className='font-black'>{contest.createdAt}</td>
//                             {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
//                             {!contest?.winnerId ? <td className='font-black'>
//                                 {contest.isActive ? <button
//                                     onClick={() => openParticipationModal(contest._id)}
//                                     className='mx-2 btn'>Participate</button> : null}
//                             </td> : <td className='font-black'>{contest.winnerId?.username} <FaCrown className='inline mx-2' /></td>
//                             }
//                             <ParticipateContest
//                                 responseInfo={responseInfo} setResponseInfo={setResponseInfo}
//                                 handleChange={handleChange}
//                                 id={contest._id}
//                                 handleSubmit={handleSubmit} />
//                         </tr>)}
//                     </tbody>
//                 </table>
//             </div>

//         </div >
//     );
// };

// export default Contest;