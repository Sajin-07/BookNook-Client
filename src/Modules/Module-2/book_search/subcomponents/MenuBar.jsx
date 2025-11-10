import { useState } from "react";
import MenuDropdown from "../../../../common_components/MenuDropdown";
import "./styles/MenuBar.css";
import { motion } from "framer-motion";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MenuBar({
    books,
    change_searched_keyword,
    change_current_genre,
    change_current_page,
    change_books_to_show,
    change_is_sorted_by_rating,
}) {
    const [inputval, change_inputval] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200 shadow-sm"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg">📚</span>
                        </div>
                        {/* <span className="text-2xl font-bold text-amber-900">BookNook</span> */}
                        <span className="text-2xl font-bold text-amber-900 cursor-pointer" onClick={() => navigate("/")}>BookNook </span>
                    </motion.div>

                    {/* Search and Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <motion.div 
                            className="relative"
                            animate={{ width: isSearchFocused ? "320px" : "280px" }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search books, authors..."
                                    className={`w-full pl-12 pr-4 py-3 bg-amber-50 border-2 rounded-full focus:outline-none transition-all duration-300 placeholder-amber-400 ${
                                        isSearchFocused 
                                            ? "border-amber-500 shadow-lg" 
                                            : "border-amber-200"
                                    }`}
                                    value={inputval}
                                    onKeyDown={(key) => {
                                        if (key.code === "Enter" && inputval) {
                                            const filtered_book = books.filter((item) => {
                                                const exist_in =
                                                    item.name
                                                        .toLowerCase()
                                                        .includes(inputval.toLowerCase()) ||
                                                    item.author
                                                        .toLowerCase()
                                                        .includes(inputval.toLowerCase());
                                                return exist_in;
                                            });
                                            change_is_sorted_by_rating(false);
                                            change_searched_keyword(inputval);
                                            change_current_page(1);
                                            change_books_to_show(filtered_book);
                                            change_current_genre("");
                                            change_inputval("");
                                        }
                                    }}
                                    onChange={(evnt) => {
                                        if (evnt.nativeEvent.data == null) {
                                            change_inputval(
                                                inputval.slice(0, inputval.length - 1)
                                            );
                                        } else {
                                            change_inputval(
                                                inputval + evnt.nativeEvent.data
                                            );
                                        }
                                    }}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                                
                                {/* Search Icon */}
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg 
                                        className={`w-5 h-5 transition-colors duration-300 ${
                                            isSearchFocused ? "text-amber-600" : "text-amber-400"
                                        }`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                        />
                                    </svg>
                                </div>

                                {/* Clear Button */}
                                {inputval && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors"
                                        onClick={() => change_inputval("")}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                )}
                            </div>

                            {/* Search Hint */}
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-amber-200 p-2 text-xs text-amber-600"
                                >
                                    Press Enter to search
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Menu Dropdown */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MenuDropdown />
                        </motion.div>
                    </div>
                </div>

                {/* Quick Actions */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-amber-100"
                >
                    {["Fiction", "Mystery", "Science", "Romance", "All"].map((genre) => (
                        <motion.button
                            key={genre}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm text-amber-600 hover:text-amber-800 font-medium px-3 py-1 rounded-full hover:bg-amber-100 transition-all duration-200"
                            onClick={() => {
                                if (genre === "All") {
                                    change_current_genre("All");
                                    change_books_to_show(books);
                                } else {
                                    const filtered = books.filter(book => 
                                        book.genre?.includes(genre)
                                    );
                                    change_current_genre(genre);
                                    change_books_to_show(filtered);
                                }
                                change_current_page(1);
                                change_searched_keyword("");
                            }}
                        >
                            {genre}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </motion.nav>
    );
}


// import { useState } from "react";
// import MenuDropdown from "../../../../common_components/MenuDropdown";
// import "./styles/MenuBar.css";

// export default function ({
//     books,
//     change_searched_keyword,
//     change_current_genre,
//     change_current_page,
//     change_books_to_show,
//     change_is_sorted_by_rating,
// }) {
//     const [inputval, change_inputval] = useState("");
//     return (
//         <div className="navbar bg-base-100 bi-nav">
//             <div className="flex-1">
//                 <a className="btn btn-ghost text-xl">BookStore</a>
//             </div>
//             <div className="flex-none gap-2">
//                 <div className="form-control">
//                     <input
//                         type="text"
//                         placeholder="Search Books"
//                         className="input input-bordered w-24 md:w-auto bi-searchbox"
//                         value={inputval}
//                         onKeyDown={(key) => {
//                             if (key.code === "Enter" && inputval) {
//                                 const filtered_book = books.filter((item) => {
//                                     const exist_in =
//                                         item.name
//                                             .toLowerCase()
//                                             .includes(inputval.toLowerCase()) ||
//                                         item.author
//                                             .toLowerCase()
//                                             .includes(inputval.toLowerCase());
//                                     return exist_in;
//                                 });
//                                 change_is_sorted_by_rating(false);
//                                 change_searched_keyword(inputval);
//                                 change_current_page(1);
//                                 change_books_to_show(filtered_book);
//                                 change_current_genre("");
//                                 change_inputval("");
//                             }
//                         }}
//                         onChange={(evnt) => {
//                             if (evnt.nativeEvent.data == null) {
//                                 change_inputval(
//                                     inputval.slice(0, inputval.length - 2)
//                                 );
//                             } else {
//                                 change_inputval(
//                                     inputval + evnt.nativeEvent.data
//                                 );
//                             }
//                         }}
//                     />
//                 </div>
//                 <MenuDropdown />
//             </div>
//         </div>
//     );
// }
