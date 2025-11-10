// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ({
//     name,
//     author,
//     rating,
//     genre,
//     cover,
//     description,
//     b_id,
// }) {
//     const image_url = cover;
//     const name_mod = name.length > 20 ? name.slice(0, 16) + " ..." : name;
//     const author_mod =
//         author.length > 30 ? author.slice(0, 26) + " ..." : author;
//     const genre_mod =
//         genre.length > 2 ? [genre[0], genre[1], "..."] : [...genre];
//     const navigate = useNavigate();
//     return (
//         <div
//             className="card w-72 bg-base-50 shadow-xl cursor-pointer backdrop-blur-sm bg-black/40"
//             onClick={() => {
//                 console.log(name + " Clicked");
//                 navigate("/bookinfo", {
//                     state: {
//                         b_id: b_id,
//                         name: name,
//                         author: author,
//                         rating: rating,
//                         genre: [...genre],
//                         image_url: image_url,
//                         description: description,
//                     },
//                 });
//             }}
//         >
//             {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
//             <figure>
//                 <img
//                     src={image_url}
//                     alt="Cover"
//                     className="object-cover h-48 w-96"
//                 />
//             </figure>
//             <div className="card-body">
//                 <h2 className="card-title">
//                     {name_mod}
//                     <div className="badge badge-secondary">{rating}</div>
//                 </h2>
//                 <p>{author_mod}</p>
//                 <div className="card-actions justify-end">
//                     {genre_mod.map((item) => (
//                         <div className="badge badge-outline">{item}</div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BookCard({
    name,
    author,
    rating,
    genre,
    cover,
    description,
    b_id,
}) {
    const image_url = cover;
    const name_mod = name.length > 20 ? name.slice(0, 18) + "..." : name;
    const author_mod = author.length > 25 ? author.slice(0, 22) + "..." : author;
    const genre_mod = genre.length > 2 ? [genre[0], genre[1], "..."] : [...genre];
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: Math.random() * 0.3 }}
            whileHover={{ 
                y: -15,
                rotateZ: -2,
                transition: { type: "spring", stiffness: 400 }
            }}
            whileTap={{ scale: 0.9, rotateZ: 5 }}
            className="relative cursor-pointer group perspective-1000"
            onClick={() => {
                console.log(name + " Clicked");
                navigate("/bookinfo", {
                    state: {
                        b_id: b_id,
                        name: name,
                        author: author,
                        rating: rating,
                        genre: [...genre],
                        image_url: image_url,
                        description: description,
                    },
                });
            }}
        >
            {/* Main Card Container */}
            <div className="relative transform-gpu preserve-3d">
                
                {/* Card with Tilt Effect */}
                <motion.div 
                    className="bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden transform-gpu"
                    whileHover={{ 
                        rotateY: 10,
                        rotateX: -5,
                        boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {/* Book Cover with Fun Overlay */}
                    <div className="relative overflow-hidden">
                        <motion.img
                            src={image_url}
                            alt="Book Cover"
                            className="w-full h-52 object-cover transform-gpu"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                        />
                        
                        {/* Animated Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-300/0 to-amber-500/0 group-hover:from-amber-400/20 group-hover:via-orange-300/30 group-hover:to-amber-500/20 transition-all duration-700" />
                        
                        {/* Floating Rating Star */}
                        <motion.div 
                            className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white"
                            whileHover={{ 
                                scale: 1.2,
                                rotate: 360,
                                transition: { duration: 0.6 }
                            }}
                            animate={{ 
                                y: [0, -5, 0],
                                transition: { duration: 2, repeat: Infinity }
                            }}
                        >
                            <span className="font-bold text-sm flex items-center gap-1">
                                ⭐{rating}
                            </span>
                        </motion.div>

                        {/* Bouncing Emoji */}
                        <motion.div
                            className="absolute bottom-4 left-4 text-2xl opacity-0 group-hover:opacity-100"
                            animate={{ 
                                scale: [1, 1.3, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: 0.5 
                            }}
                        >
                            🤩
                        </motion.div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 bg-gradient-to-b from-white to-amber-50 space-y-4">
                        {/* Title with Hover Effect */}
                        <motion.h3 
                            className="font-black text-amber-900 text-xl leading-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                            whileHover={{ 
                                background: "linear-gradient(to right, #d97706, #ea580c)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {name_mod}
                        </motion.h3>

                        {/* Author with Fun Icon */}
                        <motion.div 
                            className="flex items-center gap-2 text-amber-700"
                            whileHover={{ x: 3 }}
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                ✍️
                            </motion.span>
                            <span className="font-medium">{author_mod}</span>
                        </motion.div>

                        {/* Animated Genre Tags */}
                        <motion.div 
                            className="flex flex-wrap gap-2"
                            layout
                        >
                            {genre_mod.map((item, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.2, type: "spring" }}
                                    className="px-3 py-1 bg-gradient-to-r from-amber-300 to-orange-300 text-amber-900 text-sm rounded-full font-bold border-2 border-amber-400 shadow-lg"
                                    whileHover={{ 
                                        scale: 1.2,
                                        y: -2,
                                        background: "linear-gradient(to right, #fbbf24, #f97316)"
                                    }}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Interactive CTA */}
                        <motion.div 
                            className="pt-3 border-t-2 border-dashed border-amber-200 flex items-center justify-between"
                            whileHover={{ borderColor: "#f59e0b" }}
                        >
                            <span className="text-amber-600 text-sm font-bold flex items-center gap-2">
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    🔥
                                </motion.span>
                                Read Now
                            </span>
                            <motion.div
                                className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white"
                                whileHover={{ 
                                    scale: 1.3,
                                    rotate: 90 
                                }}
                            >
                                →
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Particles */}
                <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
            </div>
        </motion.div>
    );
}