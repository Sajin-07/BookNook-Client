import { useEffect, useState } from "react";
import Footer from "../../../common_components/Footer";
import MenuBar from "./subcomponents/MenuBar";
import MiddleSection from "./subcomponents/MiddleSection";
import { useLocation, useNavigate } from "react-router-dom";
import login_info from "../../../login_info";
import { _fetchBooks, _userInfo } from "../../../utils/axios_controllers";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function BookSearch() {
  const navigate = useNavigate();
  // --- Fetch user info (safe for both logged and guest users)
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: _userInfo,
    retry: false, // prevent infinite retry if unauthorized
  });

  // --- Basic user info setup
  let user_name = "Guest User";
  let recommended_genre = ["Thriller"];

  try {
    const { state } = useLocation();
    if (data?.data) {
      user_name = `${data.data.firstName} ${data.data.lastName}`;
    } else if (login_info?.first_name) {
      user_name = login_info.first_name;
    }
  } catch (e) {
    console.warn("Error parsing user info:", e);
  }

  // --- States
  const [searched_keyword, change_searched_keyword] = useState("");
  const [current_genre, change_current_genre] = useState("");
  const [current_page, change_current_page] = useState(1);
  const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
  const [genres, set_genres] = useState(["All"]);
  const [books, set_books_data] = useState([]);
  const [books_to_show, change_books_to_show] = useState([]);

  // --- Recommended list filter
  const recommended_book_list = (target) =>
    target.filter((item) => {
      return item.genre?.some((g) => recommended_genre.includes(g));
    });

  // --- Load books from API
  const set_data = async () => {
    try {
      const data = await _fetchBooks();
      const tmp_books = [];
      const tmp_genres = ["All"];

      for (let i = 0; i < data.length; i++) {
        const b = data[i];
        const tmp = {
          id: b._id,
          name: b.title,
          author: b.author,
          genre: b.genres,
          rating: parseFloat(b.avgRating),
          cover: b.image,
          description: b.description,
        };
        tmp_books.push(tmp);

        // collect unique genres
        tmp_genres.push(
          ...b.genres.filter((item) => !tmp_genres.includes(item))
        );
      }

      set_genres(tmp_genres);
      tmp_books.sort((a, b) => a.name.localeCompare(b.name));
      set_books_data(tmp_books);
      change_books_to_show(recommended_book_list(tmp_books));
    } catch (err) {
      console.error("Failed to load books:", err);
    }
  };

  useEffect(() => {
    set_data();
  }, []);

  // --- Determine heading text
  const bookpage_heading_text = searched_keyword
    ? `Showing Search Result for "${searched_keyword}"`
    : current_genre
    ? current_genre === "All"
      ? "All Books Collection"
      : `${current_genre} Books`
    : `Recommended for ${user_name}`;

  return (
    <>
      <div className="relative bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl p-5 shadow-xl border-4 border-amber-200 transform hover:rotate-1 transition-transform duration-300">
        {/* Floating elements */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-sm">
          📚
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-xs">
          ⚡
        </div>

        <div className="flex items-start gap-4">
          {/* Main icon */}
          <div className="flex-shrink-0 animate-bounce">
            <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/50">
              <span className="text-2xl">✍️</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-black text-white text-xl">Contest Time!</h3>
              <span className="animate-pulse">⭐</span>
            </div>
            <p className="text-amber-100 font-medium">
              Write your story and become the next champion!
            </p>
            <div className="flex items-center gap-2 mt-2 text-amber-200 text-sm">
              <span>🏆 Prizes await</span>
              <span>•</span>
              <span>📖 Book-themed rewards</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => navigate("/contest")}
            className="flex items-center gap-2 px-5 py-3 bg-white text-amber-700 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-200 border-2 border-amber-200"
          >
            <span>Let's Go!</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-amber-200 text-2xl sm:text-4xl opacity-20">
            📚
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-20 sm:right-20 text-amber-200 text-2xl sm:text-3xl opacity-20">
            📖
          </div>
          <div className="absolute top-1/3 right-1/4 text-orange-200 text-xl sm:text-2xl opacity-20 hidden sm:block">
            🔖
          </div>
        </div>

        <div className="relative flex flex-col min-h-screen">
          <MenuBar
            books={books}
            change_searched_keyword={change_searched_keyword}
            change_current_genre={change_current_genre}
            change_current_page={change_current_page}
            change_books_to_show={change_books_to_show}
            change_is_sorted_by_rating={change_is_sorted_by_rating}
          />

          {/* Main Content */}
          <div className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">📚</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-900 break-words">
                      {bookpage_heading_text}
                    </h2>
                    <p className="text-amber-600 mt-1 text-sm sm:text-base">
                      {books_to_show.length} books found
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">
                  {/* Clear Filters Button */}
                  {(searched_keyword || current_genre) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-200 text-xs sm:text-sm font-medium flex-shrink-0"
                      onClick={() => {
                        change_is_sorted_by_rating(false);
                        change_books_to_show(recommended_book_list(books));
                        change_current_page(1);
                        change_current_genre("");
                        change_searched_keyword("");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="hidden xs:inline">Clear Filters</span>
                      <span className="xs:hidden">Clear</span>
                    </motion.button>
                  )}

                  {/* Sort Toggle Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm flex-shrink-0"
                    onClick={() => {
                      change_current_page(1);
                      const books_to_sort = [...books_to_show];
                      if (is_sorted_by_rating) {
                        books_to_sort.sort((a, b) =>
                          a.name.localeCompare(b.name)
                        );
                      } else {
                        books_to_sort.sort((a, b) =>
                          a.rating === b.rating
                            ? 0
                            : a.rating > b.rating
                            ? -1
                            : 1
                        );
                      }
                      change_books_to_show(books_to_sort);
                      change_is_sorted_by_rating(!is_sorted_by_rating);
                    }}
                  >
                    {is_sorted_by_rating ? (
                      <>
                        <span className="text-xs sm:text-sm">⭐</span>
                        <span className="hidden sm:inline">
                          Sorted by Rating
                        </span>
                        <span className="sm:hidden">Rating</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs sm:text-sm">🔤</span>
                        <span className="hidden sm:inline">Sorted A-Z</span>
                        <span className="sm:hidden">A-Z</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Welcome Message */}
              {!searched_keyword && !current_genre && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm">👋</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-amber-900 text-sm sm:text-base">
                        Welcome back, {user_name}!
                      </h3>
                      <p className="text-amber-600 text-xs sm:text-sm truncate">
                        Discover your next favorite book from our curated
                        collection
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Books Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {books.length > 0 ? (
                <MiddleSection
                  genres={genres}
                  books={books}
                  change_current_genre={change_current_genre}
                  change_searched_keyword={change_searched_keyword}
                  books_to_show={books_to_show}
                  change_books_to_show={change_books_to_show}
                  current_page={current_page}
                  change_current_page={change_current_page}
                  change_is_sorted_by_rating={change_is_sorted_by_rating}
                />
              ) : (
                <div className="text-center py-12 sm:py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-amber-200 border-t-amber-500 rounded-full mx-auto mb-3 sm:mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-2">
                    Loading Your Library
                  </h3>
                  <p className="text-amber-600 text-sm sm:text-base">
                    Discovering amazing books for you...
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          <Footer />
        </div>

        {/* Optional: Show user info loading spinner (non-blocking) */}
        {isLoading && (
          <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 bg-amber-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs shadow-lg">
            Checking user info...
          </div>
        )}

        {/* Optional: Error message if user info fails */}
        {error && (
          <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 bg-amber-100 text-amber-700 px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs shadow-lg border border-amber-200">
            Guest mode active
          </div>
        )}
      </div>
    </>
  );
}

// import { useEffect, useState } from "react";
// import Footer from "../../../common_components/Footer";
// // import "./BookSearch.css";
// import MenuBar from "./subcomponents/MenuBar";
// import MiddleSection from "./subcomponents/MiddleSection";
// import { useLocation } from "react-router-dom";
// import login_info from "../../../login_info";
// import { _fetchBooks, _userInfo } from "../../../utils/axios_controllers";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";

// export default function BookSearch() {
//   // --- Fetch user info (safe for both logged and guest users)
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["userInfo"],
//     queryFn: _userInfo,
//     retry: false, // prevent infinite retry if unauthorized
//   });

//   // --- Basic user info setup
//   let user_name = "Guest User";
//   let recommended_genre = ["Thriller"];

//   try {
//     const { state } = useLocation();
//     if (data?.data) {
//       user_name = `${data.data.firstName} ${data.data.lastName}`;
//     } else if (login_info?.first_name) {
//       user_name = login_info.first_name;
//     }
//   } catch (e) {
//     console.warn("Error parsing user info:", e);
//   }

//   // --- States
//   const [searched_keyword, change_searched_keyword] = useState("");
//   const [current_genre, change_current_genre] = useState("");
//   const [current_page, change_current_page] = useState(1);
//   const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
//   const [genres, set_genres] = useState(["All"]);
//   const [books, set_books_data] = useState([]);
//   const [books_to_show, change_books_to_show] = useState([]);

//   // --- Recommended list filter
//   const recommended_book_list = (target) =>
//     target.filter((item) => {
//       return item.genre?.some((g) => recommended_genre.includes(g));
//     });

//   // --- Load books from API
//   const set_data = async () => {
//     try {
//       const data = await _fetchBooks();
//       const tmp_books = [];
//       const tmp_genres = ["All"];

//       for (let i = 0; i < data.length; i++) {
//         const b = data[i];
//         const tmp = {
//           id: b._id,
//           name: b.title,
//           author: b.author,
//           genre: b.genres,
//           rating: parseFloat(b.avgRating),
//           cover: b.image,
//           description: b.description,
//         };
//         tmp_books.push(tmp);

//         // collect unique genres
//         tmp_genres.push(...b.genres.filter((item) => !tmp_genres.includes(item)));
//       }

//       set_genres(tmp_genres);
//       tmp_books.sort((a, b) => a.name.localeCompare(b.name));
//       set_books_data(tmp_books);
//       change_books_to_show(recommended_book_list(tmp_books));
//     } catch (err) {
//       console.error("Failed to load books:", err);
//     }
//   };

//   useEffect(() => {
//     set_data();
//   }, []);

//   // --- Determine heading text
//   const bookpage_heading_text = searched_keyword
//     ? `Showing Search Result for "${searched_keyword}"`
//     : current_genre
//     ? current_genre === "All"
//       ? "All Books Collection"
//       : `${current_genre} Books`
//     : `Recommended for ${user_name}`;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 text-amber-200 text-4xl opacity-20">📚</div>
//         <div className="absolute bottom-20 right-20 text-amber-200 text-3xl opacity-20">📖</div>
//         <div className="absolute top-1/3 right-1/4 text-orange-200 text-2xl opacity-20">🔖</div>
//       </div>

//       <div className="relative flex flex-col min-h-screen">
//         <MenuBar
//           books={books}
//           change_searched_keyword={change_searched_keyword}
//           change_current_genre={change_current_genre}
//           change_current_page={change_current_page}
//           change_books_to_show={change_books_to_show}
//           change_is_sorted_by_rating={change_is_sorted_by_rating}
//         />

//         {/* Main Content */}
//         <div className="flex-1 container mx-auto px-4 py-8">
//           {/* Header Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8"
//           >
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
//                   <span className="text-white text-xl">📚</span>
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold text-amber-900">
//                     {bookpage_heading_text}
//                   </h2>
//                   <p className="text-amber-600 mt-1">
//                     {books_to_show.length} books found
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 {/* Clear Filters Button */}
//                 {(searched_keyword || current_genre) && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-200 text-sm font-medium"
//                     onClick={() => {
//                       change_is_sorted_by_rating(false);
//                       change_books_to_show(recommended_book_list(books));
//                       change_current_page(1);
//                       change_current_genre("");
//                       change_searched_keyword("");
//                     }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                     Clear Filters
//                   </motion.button>
//                 )}

//                 {/* Sort Toggle Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 text-sm font-medium shadow-sm"
//                   onClick={() => {
//                     change_current_page(1);
//                     const books_to_sort = [...books_to_show];
//                     if (is_sorted_by_rating) {
//                       books_to_sort.sort((a, b) => a.name.localeCompare(b.name));
//                     } else {
//                       books_to_sort.sort((a, b) =>
//                         a.rating === b.rating ? 0 : a.rating > b.rating ? -1 : 1
//                       );
//                     }
//                     change_books_to_show(books_to_sort);
//                     change_is_sorted_by_rating(!is_sorted_by_rating);
//                   }}
//                 >
//                   {is_sorted_by_rating ? (
//                     <>
//                       <span>⭐</span>
//                       Sorted by Rating
//                     </>
//                   ) : (
//                     <>
//                       <span>🔤</span>
//                       Sorted A-Z
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </div>

//             {/* Welcome Message */}
//             {!searched_keyword && !current_genre && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-sm"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">👋</span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-amber-900">
//                       Welcome back, {user_name}!
//                     </h3>
//                     <p className="text-amber-600 text-sm">
//                       Discover your next favorite book from our curated collection
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Books Section */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             {books.length > 0 ? (
//               <MiddleSection
//                 genres={genres}
//                 books={books}
//                 change_current_genre={change_current_genre}
//                 change_searched_keyword={change_searched_keyword}
//                 books_to_show={books_to_show}
//                 change_books_to_show={change_books_to_show}
//                 current_page={current_page}
//                 change_current_page={change_current_page}
//                 change_is_sorted_by_rating={change_is_sorted_by_rating}
//               />
//             ) : (
//               <div className="text-center py-20">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                   className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full mx-auto mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-amber-800 mb-2">
//                   Loading Your Library
//                 </h3>
//                 <p className="text-amber-600">
//                     Discovering amazing books for you...
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         <Footer />
//       </div>

//       {/* Optional: Show user info loading spinner (non-blocking) */}
//       {isLoading && (
//         <div className="fixed bottom-4 right-4 bg-amber-500 text-white px-3 py-2 rounded-full text-xs shadow-lg">
//           Checking user info...
//         </div>
//       )}

//       {/* Optional: Error message if user info fails */}
//       {error && (
//         <div className="fixed bottom-4 right-4 bg-amber-100 text-amber-700 px-3 py-2 rounded-full text-xs shadow-lg border border-amber-200">
//           Guest mode active
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import Footer from "../../../common_components/Footer";
// import "./BookSearch.css";
// import MenuBar from "./subcomponents/MenuBar";
// import MiddleSection from "./subcomponents/MiddleSection";
// import { useLocation } from "react-router-dom";
// import login_info from "../../../login_info";
// import { _fetchBooks, _userInfo } from "../../../utils/axios_controllers";
// import { useQuery } from "@tanstack/react-query";

// export default function BookSearch() {
//   // --- Fetch user info (safe for both logged and guest users)
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["userInfo"],
//     queryFn: _userInfo,
//     retry: false, // prevent infinite retry if unauthorized
//   });

//   // --- Basic user info setup
//   let user_name = "Guest User";
//   let recommended_genre = ["Thriller"];

//   try {
//     const { state } = useLocation();
//     if (data?.data) {
//       user_name = `${data.data.firstName} ${data.data.lastName}`;
//     } else if (login_info?.first_name) {
//       user_name = login_info.first_name;
//     }
//   } catch (e) {
//     console.warn("Error parsing user info:", e);
//   }

//   // --- States
//   const [searched_keyword, change_searched_keyword] = useState("");
//   const [current_genre, change_current_genre] = useState("");
//   const [current_page, change_current_page] = useState(1);
//   const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
//   const [genres, set_genres] = useState(["All"]);
//   const [books, set_books_data] = useState([]);
//   const [books_to_show, change_books_to_show] = useState([]);

//   // --- Recommended list filter
//   const recommended_book_list = (target) =>
//     target.filter((item) => {
//       return item.genre?.some((g) => recommended_genre.includes(g));
//     });

//   // --- Load books from API
//   const set_data = async () => {
//     try {
//       const data = await _fetchBooks();
//       const tmp_books = [];
//       const tmp_genres = ["All"];

//       for (let i = 0; i < data.length; i++) {
//         const b = data[i];
//         const tmp = {
//           id: b._id,
//           name: b.title,
//           author: b.author,
//           genre: b.genres,
//           rating: parseFloat(b.avgRating),
//           cover: b.image,
//           description: b.description,
//         };
//         tmp_books.push(tmp);

//         // collect unique genres
//         tmp_genres.push(...b.genres.filter((item) => !tmp_genres.includes(item)));
//       }

//       set_genres(tmp_genres);
//       tmp_books.sort((a, b) => a.name.localeCompare(b.name));
//       set_books_data(tmp_books);
//       change_books_to_show(recommended_book_list(tmp_books));
//     } catch (err) {
//       console.error("Failed to load books:", err);
//     }
//   };

//   useEffect(() => {
//     set_data();
//   }, []);

//   // --- Determine heading text
//   const bookpage_heading_text = searched_keyword
//     ? `Showing Search Result for Keyword "${searched_keyword}"`
//     : current_genre
//     ? current_genre === "All"
//       ? "Showing All Books"
//       : `Showing Books Related to "${current_genre}"`
//     : `Showing Recommended Books for ${user_name}`;

//   return (
//     <>
//       <div className="flex flex-col">
//         <MenuBar
//           books={books}
//           change_searched_keyword={change_searched_keyword}
//           change_current_genre={change_current_genre}
//           change_current_page={change_current_page}
//           change_books_to_show={change_books_to_show}
//           change_is_sorted_by_rating={change_is_sorted_by_rating}
//         />

//         <div className="grid justify-items-stretch grid-cols-2">
//           <div className="flex flex-row bi-bookpage-heading">
//             <h2 className="text-2xl font-bold dark:text-white">
//               {bookpage_heading_text}
//             </h2>

//             {(searched_keyword || current_genre) && (
//               <button
//                 className="btn btn-sm btn-square btn-outline"
//                 onClick={() => {
//                   change_is_sorted_by_rating(false);
//                   change_books_to_show(recommended_book_list(books));
//                   change_current_page(1);
//                   change_current_genre("");
//                   change_searched_keyword("");
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>

//           <div className="justify-self-end bi-toggle-button">
//             <button
//               className="btn btn-sm rounded-none w-48 h-4"
//               onClick={() => {
//                 change_current_page(1);
//                 const books_to_sort = [...books_to_show];
//                 if (is_sorted_by_rating) {
//                   books_to_sort.sort((a, b) => a.name.localeCompare(b.name));
//                 } else {
//                   books_to_sort.sort((a, b) =>
//                     a.rating === b.rating ? 0 : a.rating > b.rating ? -1 : 1
//                   );
//                 }
//                 change_books_to_show(books_to_sort);
//                 change_is_sorted_by_rating(!is_sorted_by_rating);
//               }}
//             >
//               {is_sorted_by_rating
//                 ? "Sorted By Rating"
//                 : "Sorted Alphabetically"}
//             </button>
//           </div>
//         </div>

//         {/* Background section */}
//         <div className="bg-[url('./src/assets/bookstore-bg.jpg')]">
//           {books.length > 0 ? (
//             <MiddleSection
//               genres={genres}
//               books={books}
//               change_current_genre={change_current_genre}
//               change_searched_keyword={change_searched_keyword}
//               books_to_show={books_to_show}
//               change_books_to_show={change_books_to_show}
//               current_page={current_page}
//               change_current_page={change_current_page}
//               change_is_sorted_by_rating={change_is_sorted_by_rating}
//             />
//           ) : (
//             <div className="text-center py-10 text-gray-400">
//               <span className="loading loading-spinner loading-md"></span>
//               <p>Loading books...</p>
//             </div>
//           )}
//         </div>

//         <Footer />
//       </div>

//       {/* Optional: Show user info loading spinner (non-blocking) */}
//       {isLoading && (
//         <div className="fixed bottom-4 right-4 text-xs text-gray-400">
//           Checking user info...
//         </div>
//       )}

//       {/* Optional: Error message if user info fails */}
//       {error && (
//         <div className="fixed bottom-4 right-4 text-xs text-red-400">
//           Guest mode active
//         </div>
//       )}
//     </>
//   );
// }

//main
// import { useEffect, useState } from "react";
// import Footer from "../../../common_components/Footer";
// import "./BookSearch.css";
// import MenuBar from "./subcomponents/MenuBar";
// import MiddleSection from "./subcomponents/MiddleSection";

// // import { fetchBooks } from "../api_controller/loadBooks";
// import { useLocation } from "react-router-dom";
// import login_info from "../../../login_info";
// import {
//     _fetchBooks,
//     _userInfo
// } from "../../../utils/axios_controllers";
// import { useQuery } from "@tanstack/react-query";

// export default function () {
//     const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
//     let user_name, recommended_genre;

//     try {
//         const { state } = useLocation();
//         user_name = data?.data?.firstName + " " + data?.data?.lastName;
//         recommended_genre = ["Thriller"];
//     } catch (e) {
//         console.log(e);
//         user_name = "Ahsan Habib";
//         recommended_genre = ["Thriller"];
//     }
//     if (login_info.user_name) user_name = login_info.first_name;

//     const [searched_keyword, change_searched_keyword] = useState("");
//     const [current_genre, change_current_genre] = useState("");
//     const [current_page, change_current_page] = useState(1);
//     const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
//     const [genres, set_genres] = useState(["All", "romance"]);

//     const books_t = [
//         {
//             name: "The Foundation 1",
//             author: "Isaac Asimov",
//             rating: 4.8,
//             id: "foo",
//             genre: ["romance", "fiction"],
//             cover: "./src/assets/the_foundation_2.jpg",
//             description: "loren ipsam",
//         },
//     ];
//     const [books, set_books_data] = useState([...books_t]);
//     const recommended_book_list = (target) =>
//         target.filter((item) => {
//             let choose = false;
//             for (let i = 0; i < recommended_genre.length; i++) {
//                 choose = item.genre.includes(recommended_genre[i]) | choose;
//             }
//             return choose;
//         });

//     // api changes
//     // const books = [];
//     const set_data = async () => {
//         const data = await _fetchBooks();
//         // console.log(data);
//         const tmp_books = [];
//         const tmp_genres = ["All"];
//         for (let i = 0; i < data.length; i++) {
//             // console.log(data);
//             const tmp = {};
//             tmp.id = data[i]._id;
//             tmp.name = data[i].title;
//             tmp.author = data[i].author;
//             tmp.genre = data[i].genres;
//             tmp.rating = parseFloat(data[i].avgRating);
//             tmp.cover = data[i].image;
//             tmp.description = data[i].description;
//             tmp_books.push(tmp);
//             tmp_genres.push(
//                 ...data[i].genres.filter((item) => !tmp_genres.includes(item))
//             );
//         }
//         // console.log(tmp_genres);
//         set_genres(tmp_genres);
//         tmp_books.sort((a, b) => a.name.localeCompare(b.name));
//         change_books_to_show(recommended_book_list(tmp_books));
//         return set_books_data(tmp_books);
//     };
//     // set_data();
//     useEffect(() => {
//         set_data();
//     }, []);

//     // end changes

//     const [books_to_show, change_books_to_show] = useState(
//         recommended_book_list(books)
//     );
//     let bookpage_heading_text = searched_keyword
//         ? 'Showing Search Result for Keyword "' + searched_keyword + '"'
//         : current_genre
//         ? current_genre === "All"
//             ? "Showing All Books"
//             : 'Showing Books Related to "' + current_genre + '"'
//         : "Showing Recommended Books for " + user_name;

//     return (
//         <>
//             {!isLoading ? <div className="flex flex-col">
//             <MenuBar
//                 books={books}
//                 change_searched_keyword={change_searched_keyword}
//                 change_current_genre={change_current_genre}
//                 change_current_page={change_current_genre}
//                 change_books_to_show={change_books_to_show}
//                 change_is_sorted_by_rating={change_is_sorted_by_rating}
//             />
//             <div className="grid justify-items-stretch grid-cols-2">
//                 <div className="flex flex-row bi-bookpage-heading">
//                     <h2 className="text-2xl font-bold dark:text-white">
//                         {bookpage_heading_text}
//                     </h2>
//                     {searched_keyword || current_genre ? (
//                         <button
//                             className="btn btn-sm btn-square btn-outline"
//                             onClick={() => {
//                                 change_is_sorted_by_rating(false);
//                                 change_books_to_show(
//                                     recommended_book_list(books)
//                                 );
//                                 change_current_page(1);
//                                 if (current_genre) {
//                                     change_current_genre("");
//                                 }
//                                 if (searched_keyword) {
//                                     change_searched_keyword("");
//                                 }
//                             }}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18L18 6M6 6l12 12"
//                                 />
//                             </svg>
//                         </button>
//                     ) : (
//                         ""
//                     )}
//                 </div>
//                 <div className="justify-self-end bi-toggle-button">
//                     <button
//                         className="btn btn-sm rounded-none w-48 h-4"
//                         onClick={() => {
//                             // console.log(is_sorted_by_rating);
//                             change_current_page(1);
//                             const books_to_sort = [...books_to_show];
//                             if (is_sorted_by_rating) {
//                                 books_to_sort.sort((a, b) =>
//                                     a.name.localeCompare(b.name)
//                                 );
//                             } else {
//                                 books_to_sort.sort((a, b) => {
//                                     return a.rating == b.rating
//                                         ? 0
//                                         : a.rating > b.rating
//                                         ? -1
//                                         : 1;
//                                 });
//                             }
//                             // console.log(books_to_sort);
//                             change_books_to_show(books_to_sort);
//                             change_is_sorted_by_rating(!is_sorted_by_rating);
//                         }}
//                     >
//                         {is_sorted_by_rating
//                             ? "Sorted By Rating"
//                             : "Sorted Alphabetically"}
//                     </button>
//                 </div>
//             </div>
//             <div className="bg-[url('./src/assets/bookstore-bg.jpg')]">
//                 <MiddleSection
//                     genres={genres}
//                     books={books}
//                     change_current_genre={change_current_genre}
//                     change_searched_keyword={change_searched_keyword}
//                     books_to_show={books_to_show}
//                     change_books_to_show={change_books_to_show}
//                     current_page={current_page}
//                     change_current_page={change_current_page}
//                     change_is_sorted_by_rating={change_is_sorted_by_rating}
//                 />
//             </div>
//             <Footer />
//             </div> :
//                 <span className="loading loading-spinner loading-xs"></span>
//             }
//         </>
//     );
// }
