import { useState } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

export default function BookCards({ books_to_show, current_page, change_current_page }) {
    if (books_to_show.length !== 0) {
        const number_of_page = Math.ceil(books_to_show.length / 6);
        let current_books = books_to_show.slice(
            current_page * 6 - 6,
            current_page * 6
        );

        return (
            <div className="space-y-8">
                {/* Books Grid with Fun Animations */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
                >
                    <AnimatePresence mode="popLayout">
                        {current_books.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${current_page}`}
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: 50,
                                    rotateY: 90 
                                }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    y: 0,
                                    rotateY: 0 
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: -50,
                                    rotateY: -90 
                                }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100 
                                }}
                                whileHover={{ 
                                    scale: 1.05,
                                    y: -10,
                                    rotateZ: index % 2 === 0 ? 2 : -2 
                                }}
                                className="transform-gpu"
                            >
                                <Card
                                    name={item.name}
                                    author={item.author}
                                    rating={item.rating}
                                    genre={item.genre}
                                    cover={item.cover}
                                    description={item.description}
                                    b_id={item.id}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Fun Pagination */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center space-y-4"
                >
                    {/* Page Info */}
                    <motion.div 
                        className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-lg">📖</span>
                        <span className="font-bold">
                            Page {current_page} of {number_of_page}
                        </span>
                        <span className="text-lg">📚</span>
                    </motion.div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-4">
                        {/* Previous Button */}
                        <motion.button
                            whileHover={{ 
                                scale: 1.1,
                                x: -5 
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all duration-300 ${
                                current_page > 1 
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-2xl cursor-pointer" 
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={() => {
                                if (current_page > 1) {
                                    change_current_page(current_page - 1);
                                }
                            }}
                            disabled={current_page <= 1}
                        >
                            <motion.span
                                animate={current_page > 1 ? { x: [-2, 2, -2] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ⬅️
                            </motion.span>
                            Previous
                        </motion.button>

                        {/* Page Dots */}
                        <div className="flex gap-2">
                            {Array.from({ length: Math.min(5, number_of_page) }, (_, i) => {
                                let pageNum;
                                if (number_of_page <= 5) {
                                    pageNum = i + 1;
                                } else if (current_page <= 3) {
                                    pageNum = i + 1;
                                } else if (current_page >= number_of_page - 2) {
                                    pageNum = number_of_page - 4 + i;
                                } else {
                                    pageNum = current_page - 2 + i;
                                }

                                return (
                                    <motion.button
                                        key={pageNum}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.8 }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                            current_page === pageNum
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-110"
                                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                        }`}
                                        onClick={() => change_current_page(pageNum)}
                                    >
                                        {pageNum}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <motion.button
                            whileHover={{ 
                                scale: 1.1,
                                x: 5 
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all duration-300 ${
                                current_page < number_of_page 
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-2xl cursor-pointer" 
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={() => {
                                if (current_page < number_of_page) {
                                    change_current_page(current_page + 1);
                                }
                            }}
                            disabled={current_page >= number_of_page}
                        >
                            Next
                            <motion.span
                                animate={current_page < number_of_page ? { x: [-2, 2, -2] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ➡️
                            </motion.span>
                        </motion.button>
                    </div>

                    {/* Fun Progress Indicator */}
                    <motion.div 
                        className="w-64 bg-amber-200 rounded-full h-3 overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ 
                                width: `${(current_page / number_of_page) * 100}%` 
                            }}
                            transition={{ duration: 0.8, type: "spring" }}
                        />
                    </motion.div>

                    {/* Books Counter */}
                    <motion.div
                        className="text-amber-600 font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-lg">📊</span>
                        Showing {current_books.length} of {books_to_show.length} books
                    </motion.div>
                </motion.div>
            </div>
        );
    } else {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-6"
            >
                <motion.div
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                    className="text-8xl"
                >
                    📚
                </motion.div>
                <motion.h1 
                    className="text-4xl font-bold text-amber-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    No Books Found!
                </motion.h1>
                <motion.p 
                    className="text-xl text-amber-600 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Looks like our bookshelf is empty. Try a different search or filter!
                </motion.p>
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity 
                    }}
                    className="text-4xl"
                >
                    🔍
                </motion.div>
            </motion.div>
        );
    }
}

// import { useState } from "react";
// import Card from "./Card";

// export default function ({ books_to_show, current_page, change_current_page }) {
//     // console.log(books_to_show);
//     if (books_to_show.length != 0) {
//         const number_of_page = Math.ceil(books_to_show.length / 6);
//         let current_books = books_to_show.slice(
//             current_page * 6 - 6,
//             current_page * 6
//         );

//         return (
//             <div className="grid gap-4">
//                 <div className="grid grid-cols-3 grid-rows-2 gap-4">
//                     {current_books.map((item) => (
//                         <Card
//                             name={item.name}
//                             author={item.author}
//                             rating={item.rating}
//                             genre={item.genre}
//                             cover={item.cover}
//                             description={item.description}
//                             b_id={item.id}
//                         />
//                     ))}
//                 </div>
//                 <div className="join place-self-center">
//                     <button
//                         className="join-item btn"
//                         onClick={() => {
//                             if (current_page > 1) {
//                                 change_current_page(current_page - 1);
//                             }
//                         }}
//                     >
//                         «
//                     </button>
//                     <button className="join-item btn">
//                         Page {current_page}
//                     </button>
//                     <button
//                         className="join-item btn"
//                         onClick={() => {
//                             if (current_page < number_of_page) {
//                                 change_current_page(current_page + 1);
//                             }
//                         }}
//                     >
//                         »
//                     </button>
//                 </div>
//             </div>
//         );
//     } else {
//         return <h1>No Books Found</h1>;
//     }
// }
