import React, { useState } from 'react';
import { _createBookRequest } from '../utils/axios_controllers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaBook, FaPenFancy, FaUser, FaTags, FaPaperPlane, FaTimes } from 'react-icons/fa';

const AddBookRequest = () => {
    const addBookRequestMutation = useMutation({
        mutationFn: _createBookRequest,
        onSuccess: () => {
            toast.success("Your book request has been added to our library queue!");
            setRequestInfo({
                userId: '',
                isbn: '',
                title: '',
                author: '',
                genres: [],
            });
            document.getElementById('addBookRequest_modal').close()
        },
    })

    const [requestInfo, setRequestInfo] = useState({
        isbn: '',
        title: '',
        author: '',
        genres: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestInfo({
            ...requestInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBookRequestMutation.mutate(requestInfo)
    };

    return (
        <dialog id="addBookRequest_modal" className="modal">
            <div className="modal-box p-0 bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300 rounded-2xl shadow-2xl overflow-hidden max-w-2xl">
                {/* Book Cover Inspired Header */}
                <div className="bg-gradient-to-r from-amber-700 to-brown-800 p-6 relative">
                    {/* Decorative Book Elements */}
                    <div className="absolute top-4 right-4 text-amber-200/30">
                        <FaBook className="text-4xl" />
                    </div>
                    
                    {/* Book Spine Effect */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-24 bg-amber-900 rounded-r-lg shadow-lg"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-300">
                            <FaPenFancy className="text-white text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-amber-100">
                                Request a New Book
                            </h3>
                            <p className="text-amber-200 font-light">
                                Help us grow our collection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Book Page Inspired Content */}
                <div className="p-8 relative">
                    {/* Page Curl Effect */}
                    <div className="absolute top-0 left-8 right-8 h-2 bg-gradient-to-b from-amber-200/50 to-transparent"></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ISBN Field */}
                        <div className="form-group">
                            <label className="block mb-3">
                                <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">1</span>
                                    </div>
                                    <span>ISBN Number</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="isbn"
                                        value={requestInfo.isbn}
                                        onChange={handleChange}
                                        placeholder="Enter 13-digit ISBN"
                                        className="w-full px-4 py-4 pl-12 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 shadow-sm font-mono"
                                        required
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                                        <FaBook className="text-lg" />
                                    </div>
                                </div>
                                <p className="text-amber-600 text-xs mt-1 ml-8">
                                    Unique book identifier
                                </p>
                            </label>
                        </div>

                        {/* Title Field */}
                        <div className="form-group">
                            <label className="block mb-3">
                                <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">2</span>
                                    </div>
                                    <span>Book Title</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="title"
                                        value={requestInfo.title}
                                        onChange={handleChange}
                                        placeholder="Enter the full book title"
                                        className="w-full px-4 py-4 pl-12 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 shadow-sm font-serif"
                                        required
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                                        <FaPenFancy className="text-lg" />
                                    </div>
                                </div>
                                <p className="text-amber-600 text-xs mt-1 ml-8">
                                    The complete title as it appears on the cover
                                </p>
                            </label>
                        </div>

                        {/* Author Field */}
                        <div className="form-group">
                            <label className="block mb-3">
                                <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">3</span>
                                    </div>
                                    <span>Author Name</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="author"
                                        value={requestInfo.author}
                                        onChange={handleChange}
                                        placeholder="Author's full name"
                                        className="w-full px-4 py-4 pl-12 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 shadow-sm"
                                        required
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                                        <FaUser className="text-lg" />
                                    </div>
                                </div>
                                <p className="text-amber-600 text-xs mt-1 ml-8">
                                    The author or authors of the book
                                </p>
                            </label>
                        </div>

                        {/* Genres Field */}
                        <div className="form-group">
                            <label className="block mb-3">
                                <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">4</span>
                                    </div>
                                    <span>Genres & Categories</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="genres"
                                        value={requestInfo.genres.join(',')}
                                        onChange={(e) => setRequestInfo({ ...requestInfo, genres: e.target.value.split(',') })}
                                        placeholder="Fiction, Mystery, Science Fiction..."
                                        className="w-full px-4 py-4 pl-12 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 shadow-sm"
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                                        <FaTags className="text-lg" />
                                    </div>
                                </div>
                                <p className="text-amber-600 text-xs mt-1 ml-8">
                                    Separate multiple genres with commas
                                </p>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end pt-6 border-t border-amber-200">
                            <button
                                type="button"
                                onClick={() => document.getElementById('addBookRequest_modal').close()}
                                className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors duration-200 font-medium flex items-center gap-2"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={addBookRequestMutation.isPending}
                                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {addBookRequestMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Send Book Request
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Decorative Footer */}
                <div className="bg-amber-100/50 border-t border-amber-200 px-8 py-4">
                    <div className="flex items-center justify-between text-amber-600 text-sm">
                        <div className="flex items-center gap-2">
                            <FaBook className="text-amber-400" />
                            <span>Your suggestion helps our library grow</span>
                        </div>
                        <div className="text-xs font-mono">
                            Page 1 of 1
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Backdrop */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default AddBookRequest;

// import React, { useState } from 'react';
// import { _createBookRequest } from '../utils/axios_controllers';
// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';

// const AddBookRequest = () => {

//     const addBookRequestMutation = useMutation({
//         mutationFn: _createBookRequest,
//         onSuccess: () => {
//             toast.success("Your request has been saved successfully")
//             setRequestInfo({
//                 userId: '',
//                 isbn: '',
//                 title: '',
//                 author: '',
//                 genres: [],
//             });
//             document.getElementById('addBookRequest_modal').close()
//             // // Invalidate and refetch
//             // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
//             // navigate(-1)
//         },
//     })

//     const [requestInfo, setRequestInfo] = useState({
//         isbn: '',
//         title: '',
//         author: '',
//         genres: [],
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setRequestInfo({
//             ...requestInfo,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Call your function to handle the book request here, passing requestInfo
//         console.log('Request info:', requestInfo);
//         // Reset the form after submission
//         addBookRequestMutation.mutate(requestInfo)


//     };

//     return (
//         <dialog id="addBookRequest_modal" className="modal">
//             <div className="modal-box">
//                 <h3 className="font-bold text-lg">Hello!</h3>
//                 <p className="py-4">Press ESC key or click outside to close</p>

//                 <form method="dialog" className="">
//                     <label className="block mb-2">
//                         <span className="text-gray-700">ISBN:</span>
//                         <input
//                             type="text"
//                             name="isbn"
//                             value={requestInfo.isbn}
//                             onChange={handleChange}
//                             className="form-input mt-1 block w-full p-5 rounded-xl"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Title:</span>
//                         <input
//                             type="text"
//                             name="title"
//                             value={requestInfo.title}
//                             onChange={handleChange}
//                             className="form-input mt-1 block w-full p-5 rounded-xl"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Author:</span>
//                         <input
//                             type="text"
//                             name="author"
//                             value={requestInfo.author}
//                             onChange={handleChange}
//                             className="form-input mt-1 block w-full p-5 rounded-xl"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Genres:</span>
//                         <input
//                             type="text"
//                             name="genres"
//                             value={requestInfo.genres.join(',')}
//                             onChange={(e) => setRequestInfo({ ...requestInfo, genres: e.target.value.split(',') })}
//                             className="form-input mt-1 block w-full p-5 rounded-xl"
//                         />
//                     </label>
//                     {/* </div> */}
//                     {/* <div

//                         className="modal-action">
//                         <label htmlFor="my_modal_6" onClick={handleSubmit} className="btn">Send Request</label> */}
//                     {/* </div> */}
//                     <button
//                         // type="btn"
//                         onClick={handleSubmit}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
//                     >
//                         Send Request
//                     </button>
//                 </form>
//             </div >
//         </dialog >
//     );
// };

// export default AddBookRequest;