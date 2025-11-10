import { useEffect, useState } from "react";
import Footer from "../../../common_components/Footer";
import login_info from "../../../login_info";
import MenuBar from "./subcomponents/MenuBar";
import MiddleSection from "./subcomponents/MiddleSection";
import { useLocation } from "react-router-dom";
import {
    _createShelf,
    _deleteShelf,
    _fetchBooks,
    _getShelves,
    _userInfo
} from "../../../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function BookLibrary() {
    // Fetch user information
    const { data, isLoading, refetch } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const { data: allBooks, isLoading: allBookLoading } = useQuery({ queryKey: ['books'], queryFn: _fetchBooks })

    // Mutations
    const addLibraryMutation = useMutation({
        mutationFn: _createShelf,
        onSuccess: () => {
            refetch()
        },
    })
    const deleteLibraryMutation = useMutation({
        mutationFn: _deleteShelf,
        onSuccess: () => {
            refetch()
        },
    })

    let user_name = data?.data?.firstName + " " + data?.data?.lastName;
    if (login_info.user_name) user_name = login_info.first_name;

    const [current_page, change_current_page] = useState(1);
    const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
    const [genres, set_genres] = useState(["All", "romance"]);
    const [newLibraryName, set_newLibraryName] = useState("");
    const [books, set_books_data] = useState();
    const [books_to_show, change_books_to_show] = useState(books);

    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };

    let bookpage_heading_text = `Personal Library • ${user_name}`;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-amber-200 border-t-amber-500 rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 left-4 sm:top-20 sm:left-10 text-amber-200 text-2xl sm:text-4xl opacity-20">📚</div>
                <div className="absolute bottom-4 right-4 sm:bottom-20 sm:right-10 text-amber-200 text-2xl sm:text-3xl opacity-20">📖</div>
                <div className="absolute top-1/2 right-4 sm:right-20 text-orange-200 text-xl sm:text-2xl opacity-20 hidden sm:block">🔖</div>
            </div>

            <div className="relative flex flex-col min-h-screen">
                <MenuBar
                    books={books}
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
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                            {/* Page Title */}
                            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                    <span className="text-white text-lg sm:text-2xl">📚</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 break-words">
                                        My Library
                                    </h1>
                                    <p className="text-amber-600 mt-1 text-sm sm:text-base">
                                        Welcome back, {user_name}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">
                                {/* Add Shelf Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium text-sm sm:text-base w-full xs:w-auto justify-center"
                                    onClick={() => document.getElementById('add_shelf_modal').showModal()}
                                >
                                    <span>➕</span>
                                    Add New Shelf
                                </motion.button>

                                {/* Delete Shelf Dropdown */}
                                <div className="dropdown dropdown-end w-full xs:w-auto">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        tabIndex={0}
                                        role="button"
                                        className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 font-medium shadow-sm text-sm sm:text-base w-full xs:w-auto justify-center"
                                    >
                                        <span>🗑️</span>
                                        Delete Shelf
                                    </motion.div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-3 sm:p-4 shadow-2xl bg-white rounded-xl sm:rounded-2xl border border-amber-200 w-56 sm:w-64 mt-2"
                                    >
                                        <li className="text-amber-600 font-medium mb-2 px-2 text-sm sm:text-base">Choose shelf to delete:</li>
                                        {data?.data?.shelves?.map((item) => (
                                            <motion.li
                                                key={item._id}
                                                whileHover={{ scale: 1.02 }}
                                                className="mb-1"
                                            >
                                                <button
                                                    onClick={() => deleteLibraryMutation.mutate(item._id)}
                                                    className="flex items-center justify-between text-amber-700 hover:bg-amber-100 rounded-lg p-2 sm:p-3 transition-colors duration-200 text-sm sm:text-base"
                                                >
                                                    <span className="truncate">{item.label}</span>
                                                    <span className="text-red-400 flex-shrink-0 ml-2">🗑️</span>
                                                </button>
                                            </motion.li>
                                        ))}
                                        {(!data?.data?.shelves || data.data.shelves.length === 0) && (
                                            <li className="text-amber-500 text-xs sm:text-sm p-2 sm:p-3 text-center">
                                                No shelves to delete
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200 shadow-sm"
                        >
                            <div className="grid grid-cols-3 gap-3 sm:gap-6">
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-amber-600">
                                        {data?.data?.shelves?.length || 0}
                                    </div>
                                    <div className="text-amber-700 text-xs sm:text-sm">Bookshelves</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-amber-600">
                                        {data?.data?.shelves?.reduce((total, shelf) => total + (shelf.books?.length || 0), 0) || 0}
                                    </div>
                                    <div className="text-amber-700 text-xs sm:text-sm">Total Books</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-amber-600">
                                        {genres.length - 1}
                                    </div>
                                    <div className="text-amber-700 text-xs sm:text-sm">Genres</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Books Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <MiddleSection
                            libraryFolder={data?.data?.shelves}
                            genres={genres}
                            all_books={allBooks}
                            books_to_show={books_to_show}
                            change_books_to_show={change_books_to_show}
                            current_page={current_page}
                            change_current_page={change_current_page}
                            change_is_sorted_by_rating={change_is_sorted_by_rating}
                        />
                    </motion.div>
                </div>

                <Footer />
            </div>

            {/* Add Shelf Modal */}
            <dialog id="add_shelf_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white border border-amber-200 rounded-t-2xl sm:rounded-2xl shadow-2xl p-0 overflow-hidden max-w-full sm:max-w-md mx-0 sm:mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 sm:p-6"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-amber-600 text-base sm:text-lg">📚</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-amber-900">Create New Bookshelf</h3>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-amber-600 text-sm sm:text-base">
                                Give your new bookshelf a name to organize your collection.
                            </p>
                            <input
                                value={newLibraryName}
                                onChange={handleInputChange(set_newLibraryName)}
                                type="text"
                                placeholder="e.g., Favorites, To Read, Classics..."
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-200 placeholder-amber-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Modal Actions */}
                        <div className="flex gap-2 sm:gap-3 justify-end mt-6 sm:mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 sm:px-6 sm:py-2 border-2 border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 font-medium text-sm sm:text-base"
                                onClick={() => document.getElementById('add_shelf_modal').close()}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium text-sm sm:text-base"
                                onClick={() => {
                                    if (newLibraryName.trim()) {
                                        addLibraryMutation.mutate(newLibraryName);
                                        set_newLibraryName("");
                                        document.getElementById('add_shelf_modal').close();
                                    }
                                }}
                            >
                                Create Shelf
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Modal Backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}



// import { useEffect, useState } from "react";
// import Footer from "../../../common_components/Footer";
// import login_info from "../../../login_info";
// import "./BookLibrary.css";
// import MenuBar from "./subcomponents/MenuBar";
// import MiddleSection from "./subcomponents/MiddleSection";

// // import { fetchBooks } from "../api_controller/loadBooks";
// import { useLocation } from "react-router-dom";
// import {
//     _createShelf,
//     _deleteShelf,
//     _fetchBooks,
//     _getShelves,
//     _userInfo
// } from "../../../utils/axios_controllers";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { queryClient } from "../../../main";

// export default function () {
//     // ! fetching user information
//     const { data, isLoading, refetch } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
//     const { data: allBooks, isLoading: allBookLoading } = useQuery({ queryKey: ['books'], queryFn: _fetchBooks })

//     console.log({ shelves: data?.data?.shelves });
//     console.log({ allBooks });

//     // ! mutation
//     const addLibraryMutation = useMutation({
//         mutationFn: _createShelf,
//         onSuccess: () => {
//             // Invalidate and refetch
//             refetch()

//         },
//     })
//     const deleteLibraryMutation = useMutation({
//         mutationFn: _deleteShelf,
//         onSuccess: () => {
//             // Invalidate and refetch
//             refetch()
//         },
//     })


//     let user_name = data?.data?.firstName + " " + data?.data?.lastName;

//     //     const { state } = useLocation();
//     //     user_name = state.user_name;
//     // } catch (e) {
//     //     // console.log(e);
//     //     user_name = "Ahsan Habib";
//     // }
//     if (login_info.user_name) user_name = login_info.first_name;

//     const [current_page, change_current_page] = useState(1);
//     const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
//     const [genres, set_genres] = useState(["All", "romance"]);


//     // const books_t = [
//     //     {
//     //         name: "The Foundation 1",
//     //         author: "Isaac Asimov",
//     //         rating: 4.8,
//     //         id: "foo",
//     //         genre: ["romance", "fiction"],
//     //         cover: "./src/assets/the_foundation_2.jpg",
//     //         description: "loren ipsam",
//     //     },
//     // ];
//     const [libraryFolder, change_libraryFolder] = useState();
//     const [libUpdateTriggered, set_libUpdateTriggered] = useState(0);

//     const [newLibraryName, set_newLibraryName] = useState("");
//     const [books, set_books_data] = useState();
//     // api changes
//     // const books = [];
//     const set_data = async () => {
//         const data = await _fetchBooks();
//         // console.log(data);
//         const tmp_books = [];
//         const tmp_genres = ["All"];
//         for (let i = 0; i < data.length; i++) {
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
//         // change_books_to_show(tmp_books);
//         tmp_books.sort((a, b) => a.name.localeCompare(b.name));
//         set_books_data(tmp_books);
//     };

//     const set_shelves = async () => {
//         if (login_info.user_name) {
//             _getShelves(login_info.user_name).then((data) => {
//                 const tmp_data = data.shelves.map((item) => {
//                     // console.log(item.books);
//                     return {
//                         name: item.label,
//                         books: item.books.map((elm) => elm.book),
//                     };
//                 });
//                 change_libraryFolder(tmp_data);
//                 // console.log(tmp_data);
//             });
//         } else {
//             console.log("Not logged in");
//         }
//     };



//     const handleInputChange = (set_func) => {
//         return (event) => set_func(event.target.value);
//     };

//     // end changes

//     const [books_to_show, change_books_to_show] = useState(books);
//     // let bookpage_heading_text = searched_keyword
//     //     ? 'Showing Search Result for Keyword "' + searched_keyword + '"'
//     //     : current_genre
//     //     ? current_genre === "All"
//     //         ? "Showing All Books"
//     //         : 'Showing Books Related to "' + current_genre + '"'
//     //     : "Showing Recommended Books for " + user_name;
//     let bookpage_heading_text = `Book Library for ${user_name}`;

//     return (
//         <>
//             {!isLoading ? <div className="flex flex-col">
//             <MenuBar
//                 books={books}
//                 change_current_page={change_current_page}
//                 change_books_to_show={change_books_to_show}
//                 change_is_sorted_by_rating={change_is_sorted_by_rating}
//             />
//             <div className="grid justify-items-stretch grid-cols-2">
//                 <div className="flex flex-row bi-bookpage-heading">
//                     <h2 className="text-2xl font-bold dark:text-white">
//                         {bookpage_heading_text}
//                         </h2>
//                     </div>
//                     {/*  adding book shelf and shelf display */}

//                 <div className="flex justify-self-end bi-toggle-button gap-2">
//                     <div>
//                         <button
//                             className="btn btn-sm btn-success rounded-none w-20 h-4"
//                             onClick={() =>
//                                 document
//                                     .getElementById("my_modal_1")
//                                     .showModal()
//                             }
//                         >
//                             Add Shelf
//                         </button>
//                         <dialog id="my_modal_1" className="modal">
//                             <div className="modal-box">
//                                 <div className="flex flex-col gap-4">
//                                     <h3 className="font-bold text-lg">
//                                         Add a Shelf
//                                     </h3>
//                                     <input
//                                         value={newLibraryName}
//                                         onChange={handleInputChange(
//                                             set_newLibraryName
//                                         )}
//                                         type="text"
//                                         placeholder="Type here"
//                                         className="input input-bordered input-success w-full max-w-xs"
//                                     />
//                                 </div>
//                                 <div className="modal-action">
//                                     <form method="dialog">
//                                         {/* if there is a button in form, it will close the modal */}
//                                         <button
//                                             className="btn btn-sm btn-error rounded-none w-20 h-4"
//                                             style={{ marginRight: 4 }}
//                                         >
//                                             Cancel
//                                         </button>
//                                             <button
//                                             className="btn btn-sm btn-success rounded-none w-20 h-4"
//                                                 // onClick={addLibraryMutation(newLibraryName)}
//                                                 onClick={() => addLibraryMutation.mutate(newLibraryName)}
//                                         >
//                                             OK
//                                         </button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </dialog>
//                     </div>
//                     <div className="dropdown dropdown-end">
//                         <div
//                             tabIndex={0}
//                             role="button"
//                             className="btn btn-sm btn-error rounded-none w-20 h-4"
//                         >
//                             Delete Shelf
//                         </div>
//                             <ul
//                             tabIndex={0}
//                             className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
//                         >
//                                 {data?.data?.shelves.map((item) => (
//                                     <li
//                                         onClick={() => deleteLibraryMutation.mutate(item._id)}
//                                     >
//                                         <a>{item.label}</a>
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//                 <div className="bg-[url('./src/assets/bookstore-bg.jpg')]">
//                 <MiddleSection
//                         libraryFolder={data?.data?.shelves}
//                     genres={genres}
//                         all_books={allBooks}
//                     books_to_show={books_to_show}
//                     change_books_to_show={change_books_to_show}
//                     current_page={current_page}
//                     change_current_page={change_current_page}
//                     change_is_sorted_by_rating={change_is_sorted_by_rating}
//                 />
//             </div>
//             <Footer />
//             </div> : <span className="loading loading-spinner loading-xs"></span>
//             }
//         </>

//     );
// }
