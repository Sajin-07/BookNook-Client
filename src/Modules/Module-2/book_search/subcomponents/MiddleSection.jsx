import BookCards from "../../../../common_components/BookCards";
import { motion } from "framer-motion";

export default function MiddleSection({
    genres,
    books,
    change_current_genre,
    change_searched_keyword,
    books_to_show,
    change_books_to_show,
    current_page,
    change_current_page,
    change_is_sorted_by_rating,
}) {
    return (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-lg">
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                
                {/* Main Content Area */}
                <div className="drawer-content flex flex-col p-6">
                    {/* Book Cards Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BookCards
                            books_to_show={books_to_show}
                            current_page={current_page}
                            change_current_page={change_current_page}
                        />
                    </motion.div>

                    {/* Mobile Drawer Toggle Button */}
                    <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        htmlFor="my-drawer-2"
                        className="btn lg:hidden mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:shadow-lg transition-all duration-200 rounded-full"
                    >
                        <span className="mr-2">📚</span>
                        Browse Genres
                    </motion.label>
                </div>
                
                {/* Sidebar */}
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    
                    <motion.div 
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="menu p-6 w-80 min-h-full bg-gradient-to-b from-amber-50 to-orange-50 border-r border-amber-200 shadow-xl"
                    >
                        {/* Sidebar Header */}
                        <div className="mb-8 pb-6 border-b border-amber-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg">📚</span>
                                </div>
                                <h3 className="text-xl font-bold text-amber-900">Genres</h3>
                            </div>
                            <p className="text-amber-600 text-sm">
                                Explore books by genre
                            </p>
                        </div>

                        {/* Genre List */}
                        <div className="space-y-2">
                            {genres.map((genre, index) => (
                                <motion.div
                                    key={genre}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="group"
                                >
                                    <button
                                        onClick={() => {
                                            change_current_page(1);
                                            change_current_genre(genre);
                                            change_is_sorted_by_rating(false);
                                            if (genre === "All") {
                                                change_books_to_show([...books]);
                                            } else {
                                                const filtered_book = books.filter(
                                                    (item) => item.genre.includes(genre)
                                                );
                                                change_books_to_show(filtered_book);
                                            }
                                            change_searched_keyword("");
                                        }}
                                        className="w-full text-left p-4 rounded-xl bg-white/80 border border-amber-200 group-hover:border-amber-400 group-hover:bg-amber-50 group-hover:shadow-md transition-all duration-200 flex items-center justify-between"
                                    >
                                        <span className="font-medium text-amber-800 group-hover:text-amber-900">
                                            {genre}
                                        </span>
                                        <motion.span
                                            whileHover={{ scale: 1.2 }}
                                            className="text-amber-400 group-hover:text-amber-500 text-lg"
                                        >
                                            →
                                        </motion.span>
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Sidebar Footer */}
                        <div className="mt-8 pt-6 border-t border-amber-200">
                            <div className="text-center">
                                <p className="text-amber-600 text-sm">
                                    {genres.length - 1} genres available
                                </p>
                                <p className="text-amber-500 text-xs mt-1">
                                    Discover your next favorite read
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}




// import BookCards from "../../../../common_components/BookCards";

// export default function ({
//     genres,
//     books,
//     change_current_genre,
//     change_searched_keyword,
//     books_to_show,
//     change_books_to_show,
//     current_page,
//     change_current_page,
//     change_is_sorted_by_rating,
// }) {
//     return (
//         <div className="shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative ">
//             <div className="drawer lg:drawer-open ">
//                 <input
//                     id="my-drawer-2"
//                     type="checkbox"
//                     className="drawer-toggle"
//                 />
//                 <div className="drawer-content flex flex-col items-center justify-center">
//                     {/* Page content here */}
//                     <BookCards
//                         books_to_show={books_to_show}
//                         current_page={current_page}
//                         change_current_page={change_current_page}
//                     />

//                     <label
//                         htmlFor="my-drawer-2"
//                         className="btn btn-neutral drawer-button lg:hidden"
//                     >
//                         Select Genre
//                     </label>
//                 </div>
//                 <div className="drawer-side bi-sidebar">
//                     <label
//                         htmlFor="my-drawer-2"
//                         aria-label="close sidebar"
//                         className="drawer-overlay"
//                     ></label>
//                     <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//                         {/* Sidebar content here */}
//                         {genres.map((genre, index) => (
//                             <li
//                                 onClick={() => {
//                                     change_current_page(1);
//                                     change_current_genre(genre);
//                                     change_is_sorted_by_rating(false);
//                                     if (genre === "All") {
//                                         change_books_to_show([...books]);
//                                     } else {
//                                         const filtered_book = books.filter(
//                                             (item) => item.genre.includes(genre)
//                                         );
//                                         // console.log(filtered_book);
//                                         change_books_to_show(filtered_book);
//                                     }
//                                     change_searched_keyword("");
//                                 }}
//                             >
//                                 <a>{genre}</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }
