import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  _addBookToShelf,
  _getShelves,
  _removeFromShelf,
  _fetchBookById,
  _userInfo,
} from "../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function BookCard({ id }) {
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const navigate = useNavigate();

    // Mutations
    const addBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _addBookToShelf(bookId, shelfId),
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })

    const deleteBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _removeFromShelf(bookId, shelfId),
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })

    const { data: book, isLoading: bookLoading } = useQuery(
        {
            queryKey: ['book', id],
            queryFn: () => _fetchBookById(id),
            enabled: !!id
        }
    )

    if (bookLoading) {
        return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-lg p-6 w-full max-w-sm mx-auto">
                <div className="animate-pulse">
                    <div className="bg-amber-200 rounded-xl h-48 w-full mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                        <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                        <div className="flex gap-2">
                            <div className="h-6 bg-amber-200 rounded w-16"></div>
                            <div className="h-6 bg-amber-200 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-xl border-2 border-amber-200 overflow-hidden hover:shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto"
        >
            {/* Book Cover */}
            <div className="relative overflow-hidden">
                <motion.img
                    src={book?.book?.image}
                    alt={book?.book?.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                />
                {/* Rating Badge */}
                <motion.div 
                    className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    ⭐ {book?.book?.avgRating || "N/A"}
                </motion.div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 space-y-4">
                {/* Title and Author */}
                <div className="space-y-2">
                    <motion.h3 
                        className="font-bold text-amber-900 text-lg sm:text-xl leading-tight line-clamp-2"
                        whileHover={{ x: 2 }}
                    >
                        {book?.book?.title}
                    </motion.h3>
                    <motion.p 
                        className="text-amber-700 text-sm sm:text-base flex items-center gap-2"
                        whileHover={{ x: 2 }}
                    >
                        <span className="text-amber-500">✍️</span>
                        {book?.book?.author}
                    </motion.p>
                </div>

                {/* Description */}
                <motion.p 
                    className="text-amber-600 text-xs sm:text-sm leading-relaxed line-clamp-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {book?.book?.description}
                </motion.p>

                {/* Genres */}
                <motion.div 
                    className="flex flex-wrap gap-1 sm:gap-2"
                    layout
                >
                    {book?.book?.genres?.slice(0, 3).map((item, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-2 sm:px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 text-xs rounded-full font-medium border border-amber-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            {item}
                        </motion.span>
                    ))}
                    {book?.book?.genres?.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-600 text-xs rounded-full border border-amber-300">
                            +{book?.book?.genres?.length - 3}
                        </span>
                    )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Add to Library Dropdown */}
                    <div className="dropdown dropdown-top sm:dropdown-end w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            tabIndex={0}
                            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium text-sm sm:text-base w-full"
                        >
                            <span>➕</span>
                            Add to Shelf
                        </motion.button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-3 shadow-2xl bg-white rounded-xl border border-amber-200 w-56 sm:w-64 mt-2 space-y-1"
                        >
                            <li className="text-amber-600 font-medium mb-2 px-2 text-sm">Choose a shelf:</li>
                            {data?.data?.shelves?.map((item) => (
                                <motion.li
                                    key={item._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="mb-1"
                                >
                                    <button
                                        onClick={() => addBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
                                        className="flex items-center justify-between text-amber-700 hover:bg-amber-100 rounded-lg p-2 transition-colors duration-200 w-full text-sm"
                                    >
                                        <span className="truncate">{item.label}</span>
                                        <span className="text-amber-400 text-lg">📚</span>
                                    </button>
                                </motion.li>
                            ))}
                            {(!data?.data?.shelves || data.data.shelves.length === 0) && (
                                <li className="text-amber-500 text-xs p-2 text-center">
                                    No shelves yet
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Remove from Library Dropdown */}
                    <div className="dropdown dropdown-top sm:dropdown-end w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            tabIndex={0}
                            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-4 sm:py-2 bg-white border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-all duration-200 font-medium text-sm sm:text-base w-full"
                        >
                            <span>🗑️</span>
                            Remove
                        </motion.button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-3 shadow-2xl bg-white rounded-xl border border-amber-200 w-56 sm:w-64 mt-2 space-y-1"
                        >
                            <li className="text-amber-600 font-medium mb-2 px-2 text-sm">Remove from shelf:</li>
                            {data?.data?.shelves?.map((item) => (
                                <motion.li
                                    key={item._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="mb-1"
                                >
                                    <button
                                        onClick={() => deleteBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
                                        className="flex items-center justify-between text-amber-700 hover:bg-amber-100 rounded-lg p-2 transition-colors duration-200 w-full text-sm"
                                    >
                                        <span className="truncate">{item.label}</span>
                                        <span className="text-red-400">🗑️</span>
                                    </button>
                                </motion.li>
                            ))}
                            {(!data?.data?.shelves || data.data.shelves.length === 0) && (
                                <li className="text-amber-500 text-xs p-2 text-center">
                                    No shelves yet
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Reviews Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 px-4 py-2 sm:px-4 sm:py-2 bg-white border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-all duration-200 font-medium text-sm sm:text-base w-full sm:w-auto"
                        onClick={() => {
                            navigate("/bookreview", {
                                state: {
                                    b_id: id,
                                    name: book?.book?.title,
                                    image_url: book?.book?.image,
                                },
                            });
                        }}
                    >
                        <span>💬</span>
                        Reviews
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   _addBookToShelf,
//   _getShelves,
//   _removeFromShelf,
//   _fetchBookById,
//   _userInfo,
// } from "../utils/axios_controllers";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export default function ({ id }) {
//     const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
//     console.log(id);
//     // !mutate
//     const addBookToShelfMutation = useMutation({
//         mutationFn: ({ bookId, shelfId }) => _addBookToShelf(bookId, shelfId),
//         onSuccess: () => {
//             // Invalidate and refetch
//             // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
//             // navigate(-1)
//         },
//     })

//     const deleteBookToShelfMutation = useMutation({
//         mutationFn: ({ bookId, shelfId }) => _removeFromShelf(bookId, shelfId),
//         onSuccess: () => {
//             // Invalidate and refetch
//             // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
//             // navigate(-1)
//         },
//     })
//     const { data: book, isLoading: bookLoading } = useQuery(
//         {
//             queryKey: ['book', id],
//             queryFn: () => _fetchBookById(id),
//             enabled: !!id
//         })
//     console.log({ book });
//     const navigate = useNavigate();
//     return (
//         <div
//             className="card w-72 bg-base-50 shadow-xl cursor-pointer backdrop-blur-sm bg-black/40"
//         // // onClick={() => {
//         // //     console.log(book?.book?.title + " Clicked");
//         // //     navigate("/bookinfo");
//         // }}
//         >
//             {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
//             <>
//                 <img
//                     src={book?.book?.image}
//                     alt="Cover"
//                     className="object-cover h-48 w-96"
//                 />
//             </ >
//             <div className="card-body">
//                 <h2 className="card-title">
//                     {book?.book?.description}
//                     <div className="badge badge-secondary">{book?.book?.avgRating}</div>
//                 </h2>
//                 <p>{book?.book?.author}</p>
//                 <div className="card-actions justify-end">
//                     {book?.book?.genres?.map((item) => (
//                         <div className="badge badge-outline">{item}</div>
//                     ))}
//                 </div>
//                 <div className="flex gap-2">
//                     <div className="dropdown dropdown-end dropdown-top">
//                         <div
//                             tabIndex={0}
//                             role="button"
//                             className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
//                         >
//                             Add to Library
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
//                         >
//                             {data?.data?.shelves?.map((item) => (
//                                 <li
//                                     onClick={() => addBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
//                                 >
//                                     <a>{item.label}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="dropdown dropdown-end dropdown-top">
//                         <div
//                             tabIndex={0}
//                             role="button"
//                             className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
//                         >
//                             Delete from Library
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
//                         >
//                             {data?.data?.shelves?.map((item) => (
//                                 <li
//                                     onClick={() => deleteBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
//                                 >
//                                     <a>{item.label}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <button
//                             className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
//                             onClick={() => {
//                                 navigate_to("/bookreview", {
//                                     state: {
//                                         b_id: b_id,
//                                         name: name,
//                                         image_url: image_url,
//                                     },
//                                 });
//                             }}
//                         >
//                             Reviews
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
