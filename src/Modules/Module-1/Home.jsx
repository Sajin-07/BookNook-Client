import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();

    const floatingBooks = [
        { emoji: "📕", delay: 0, size: "text-4xl" },
        { emoji: "📗", delay: 0.5, size: "text-3xl" },
        { emoji: "📘", delay: 1, size: "text-5xl" },
        { emoji: "📙", delay: 1.5, size: "text-2xl" },
        { emoji: "📖", delay: 2, size: "text-4xl" },
        { emoji: "📚", delay: 2.5, size: "text-3xl" },
    ];

    const pricingPlans = [
        {
            name: "Free Reader",
            price: "$0",
            period: "forever",
            emoji: "📖",
            color: "from-amber-200 to-amber-300",
            textColor: "text-amber-900",
            features: [
                "Access to 1000+ free books",
                "Basic reading features",
                "Community discussions",
                "Book recommendations",
                "Reading challenges"
            ],
            buttonText: "Start Reading Free",
            popular: false
        },
        {
            name: "Book Explorer",
            price: "$9.99",
            period: "per month",
            emoji: "🔍",
            color: "from-amber-400 to-orange-400",
            textColor: "text-white",
            features: [
                "All Free features",
                "Unlimited book access",
                "Audiobook downloads",
                "Early book releases",
                "Advanced search filters",
                "Custom bookshelves"
            ],
            buttonText: "Start 7-Day Trial",
            popular: true
        },
        {
            name: "Premium Bibliophile",
            price: "$19.99",
            period: "per month",
            emoji: "👑",
            color: "from-purple-500 to-pink-500",
            textColor: "text-white",
            features: [
                "All Explorer features",
                "Exclusive author events",
                "Personal book concierge",
                "Offline reading mode",
                "Priority support",
                "Book club hosting",
                "Custom reading plans"
            ],
            buttonText: "Go Premium",
            popular: false
        }
    ];

    const premiumBenefits = [
        {
            icon: "🎧",
            title: "Audiobooks",
            description: "Listen to your favorite books anywhere"
        },
        {
            icon: "📱",
            title: "Offline Reading",
            description: "Download books and read without internet"
        },
        {
            icon: "👑",
            title: "Exclusive Content",
            description: "Early access to new releases and author events"
        },
        {
            icon: "🔍",
            title: "Advanced Search",
            description: "Find exactly what you want with smart filters"
        },
        {
            icon: "📚",
            title: "Unlimited Library",
            description: "Access our entire collection without limits"
        },
        {
            icon: "💬",
            title: "Priority Support",
            description: "Get help from our book experts 24/7"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingBooks.map((book, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${book.size} text-amber-200 opacity-20`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ 
                            y: [100, -100, 100],
                            x: [0, Math.sin(index) * 50, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 8 + index,
                            repeat: Infinity,
                            delay: book.delay,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${20 + index * 15}%`,
                        }}
                    >
                        {book.emoji}
                    </motion.div>
                ))}
            </div>

            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center space-x-2 sm:space-x-3"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center"
                            >
                                <span className="text-white text-sm sm:text-lg">📚</span>
                            </motion.div>
                            <span className="text-xl sm:text-2xl font-bold text-amber-900">BookNook</span>
                        </motion.div>

                        {/* Navigation Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center space-x-2 sm:space-x-4"
                        >
                            <button 
                                onClick={() => navigate('/login')}
                                className="px-3 sm:px-6 py-1 sm:py-2 text-amber-700 font-medium hover:text-amber-900 transition-colors duration-200 text-sm sm:text-base"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/register')}
                                className="px-3 sm:px-6 py-1 sm:py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-200 font-medium text-sm sm:text-base"
                            >
                                Sign Up
                            </button>
                            <button 
                                onClick={() => navigate('/booksearch')}
                                className="px-3 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm sm:text-base"
                            >
                                Explore
                            </button>
                        </motion.div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Bento Grid */}
            <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-6"
                        >
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight"
                            >
                                Discover Your Next{" "}
                                <motion.span 
                                    className="text-amber-500"
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Favorite
                                </motion.span>{" "}
                                Book
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg sm:text-xl text-amber-700 leading-relaxed"
                            >
                                Dive into a magical world of stories with BookNook. Explore thousands of books, 
                                track your reading journey, and connect with fellow book lovers in our vibrant community.
                            </motion.p>
                            
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-3 sm:gap-4 pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/booksearch')}
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                                >
                                    <span>🚀</span>
                                    Start Exploring
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/register')}
                                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-500 text-amber-600 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-50 transition-all duration-200 flex items-center gap-2"
                                >
                                    <span>🎁</span>
                                    Join Free
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Bento Grid Right Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="grid grid-cols-2 gap-4 h-full"
                        >
                            {/* Bento Grid Items */}
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl p-6 shadow-xl border-2 border-amber-300 col-span-2 row-span-2 flex flex-col justify-center items-center text-center"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-6xl mb-4"
                                >
                                    📚
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">10,000+ Books</h3>
                                <p className="text-amber-100">Curated collection waiting for you</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white rounded-3xl p-4 shadow-lg border-2 border-amber-200 flex flex-col justify-center items-center text-center"
                            >
                                <div className="text-4xl mb-2">⭐</div>
                                <h4 className="font-bold text-amber-900">4.9/5 Rating</h4>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white rounded-3xl p-4 shadow-lg border-2 border-amber-200 flex flex-col justify-center items-center text-center"
                            >
                                <div className="text-4xl mb-2">👥</div>
                                <h4 className="font-bold text-amber-900">50K+ Readers</h4>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-4 shadow-xl border-2 border-blue-300 col-span-2 flex items-center justify-center gap-3"
                            >
                                <div className="text-3xl">🎧</div>
                                <div>
                                    <h4 className="font-bold text-white">Audiobooks</h4>
                                    <p className="text-blue-100 text-sm">Listen anywhere</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Floating Books Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-400/20 to-orange-400/20 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
                            Books That Come to Life! ✨
                        </h2>
                        <p className="text-lg sm:text-xl text-amber-700 max-w-2xl mx-auto">
                            Watch our magical books float through your reading journey
                        </p>
                    </motion.div>

                    <div className="relative h-64">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute text-4xl sm:text-5xl"
                                animate={{
                                    y: [0, -100, 0],
                                    x: [0, Math.sin(i) * 50, 0],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 6 + i,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    left: `${i * 15}%`,
                                }}
                            >
                                {["📕", "📗", "📘", "📙", "📖", "📚"][i - 1]}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
                            Choose Your Reading Adventure 📖
                        </h2>
                        <p className="text-lg sm:text-xl text-amber-700 max-w-2xl mx-auto">
                            Pick the perfect plan for your reading journey
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`relative rounded-3xl p-6 sm:p-8 shadow-xl border-2 ${
                                    plan.popular 
                                        ? 'border-amber-400 scale-105 z-10' 
                                        : 'border-amber-200'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular! 🎯
                                    </div>
                                )}
                                
                                <div className={`bg-gradient-to-r ${plan.color} rounded-2xl p-6 text-center mb-6`}>
                                    <div className="text-4xl mb-4">{plan.emoji}</div>
                                    <h3 className={`text-2xl font-bold ${plan.textColor} mb-2`}>{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-4xl font-bold ${plan.textColor}`}>{plan.price}</span>
                                        <span className={`${plan.textColor} opacity-80`}>/{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 + idx * 0.1 }}
                                            className="flex items-center gap-3 text-amber-700"
                                        >
                                            <span className="text-green-500 text-lg">✓</span>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/register')}
                                    className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-2xl'
                                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    }`}
                                >
                                    {plan.buttonText}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Benefits Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-500 to-orange-500">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Why Go Premium? 👑
                        </h2>
                        <p className="text-amber-100 text-lg sm:text-xl max-w-2xl mx-auto">
                            Unlock the ultimate reading experience with these amazing benefits
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {premiumBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
                            >
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                    className="text-4xl mb-4"
                                >
                                    {benefit.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-amber-100">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 bg-white text-amber-600 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-200"
                        >
                            🚀 Start Your Premium Journey
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-400 to-orange-400">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to Begin Your Story? 📖
                        </h2>
                        <p className="text-amber-100 text-xl mb-8">
                            Join thousands of readers discovering new worlds every day
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/register')}
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200"
                            >
                                📚 Start Reading Free
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/booksearch')}
                                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200"
                            >
                                🔍 Browse Books
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-amber-900 text-amber-100 py-12">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-white">📚</span>
                            </div>
                            <span className="text-xl font-bold">BookNook</span>
                        </div>
                        <div className="text-amber-300 text-center md:text-right">
                            <p>© 2024 BookNook. All rights reserved.</p>
                            <p className="text-sm mt-1">Made with ❤️ for book lovers everywhere</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;


// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Home = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
//             {/* Navigation */}
//             <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-200">
//                 <div className="container mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         {/* Logo */}
//                         <motion.div 
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex items-center space-x-3"
//                         >
//                             <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-lg">📚</span>
//                             </div>
//                             <span className="text-2xl font-bold text-amber-900">BookNook</span>
//                         </motion.div>

//                         {/* Navigation Buttons */}
//                         <motion.div 
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 }}
//                             className="flex items-center space-x-4"
//                         >
//                             <button 
//                                 onClick={() => navigate('/login')}
//                                 className="px-6 py-2 text-amber-700 font-medium hover:text-amber-900 transition-colors duration-200"
//                             >
//                                 Login
//                             </button>
//                             <button 
//                                 onClick={() => navigate('/register')}
//                                 className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-200 font-medium"
//                             >
//                                 Sign Up
//                             </button>
//                             <button 
//                                 onClick={() => navigate('/booksearch')}
//                                 className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
//                             >
//                                 Explore More
//                             </button>
//                         </motion.div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Hero Section */}
//             <section className="pt-32 pb-20 px-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                         {/* Left Content */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.7 }}
//                             className="space-y-6"
//                         >
//                             <h1 className="text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
//                                 Discover Your Next 
//                                 <span className="text-amber-500"> Favorite </span>
//                                 Book
//                             </h1>
//                             <p className="text-xl text-amber-700 leading-relaxed">
//                                 Dive into a world of stories with BookNook. Explore thousands of books, 
//                                 track your reading journey, and connect with fellow book lovers.
//                             </p>
//                             <div className="flex flex-wrap gap-4 pt-4">
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => navigate('/booksearch')}
//                                     className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
//                                 >
//                                     Start Exploring
//                                 </motion.button>
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => navigate('/register')}
//                                     className="px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all duration-200"
//                                 >
//                                     Join Free
//                                 </motion.button>
//                             </div>
//                         </motion.div>

//                         {/* Right Content - Book Showcase */}
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.7, delay: 0.3 }}
//                             className="relative"
//                         >
//                             <div className="grid grid-cols-2 gap-6">
//                                 {/* Floating Book Cards */}
//                                 <motion.div
//                                     whileHover={{ y: -10 }}
//                                     className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200"
//                                 >
//                                     <div className="w-12 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
//                                     <h3 className="font-semibold text-amber-900">Best Sellers</h3>
//                                     <p className="text-sm text-amber-600 mt-2">Top rated books</p>
//                                 </motion.div>

//                                 <motion.div
//                                     whileHover={{ y: -10 }}
//                                     transition={{ delay: 0.1 }}
//                                     className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200 mt-8"
//                                 >
//                                     <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
//                                     <h3 className="font-semibold text-amber-900">New Releases</h3>
//                                     <p className="text-sm text-amber-600 mt-2">Fresh stories</p>
//                                 </motion.div>

//                                 <motion.div
//                                     whileHover={{ y: -10 }}
//                                     transition={{ delay: 0.2 }}
//                                     className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200"
//                                 >
//                                     <div className="w-12 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg mb-4"></div>
//                                     <h3 className="font-semibold text-amber-900">Classics</h3>
//                                     <p className="text-sm text-amber-600 mt-2">Timeless reads</p>
//                                 </motion.div>

//                                 <motion.div
//                                     whileHover={{ y: -10 }}
//                                     transition={{ delay: 0.3 }}
//                                     className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200 mt-8"
//                                 >
//                                     <div className="w-12 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg mb-4"></div>
//                                     <h3 className="font-semibold text-amber-900">Audiobooks</h3>
//                                     <p className="text-sm text-amber-600 mt-2">Listen anywhere</p>
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section className="py-20 bg-white/50">
//                 <div className="container mx-auto px-6 max-w-6xl">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-center mb-16"
//                     >
//                         <h2 className="text-4xl font-bold text-amber-900 mb-4">
//                             Why Choose BookNook?
//                         </h2>
//                         <p className="text-xl text-amber-700 max-w-2xl mx-auto">
//                             Experience reading like never before with our curated features
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {[
//                             {
//                                 icon: "🔍",
//                                 title: "Smart Search",
//                                 description: "Find exactly what you're looking for with our advanced search and filters"
//                             },
//                             {
//                                 icon: "📱",
//                                 title: "Read Anywhere",
//                                 description: "Access your library across all devices, anytime, anywhere"
//                             },
//                             {
//                                 icon: "👥",
//                                 title: "Community",
//                                 description: "Join discussions, share reviews, and connect with readers"
//                             }
//                         ].map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 whileHover={{ scale: 1.05 }}
//                                 className="bg-white p-8 rounded-2xl shadow-lg border border-amber-200 text-center"
//                             >
//                                 <div className="text-4xl mb-4">{feature.icon}</div>
//                                 <h3 className="text-xl font-semibold text-amber-900 mb-3">
//                                     {feature.title}
//                                 </h3>
//                                 <p className="text-amber-700 leading-relaxed">
//                                     {feature.description}
//                                 </p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
//                 <div className="container mx-auto px-6 max-w-4xl text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <h2 className="text-4xl font-bold text-white mb-6">
//                             Ready to Start Your Reading Journey?
//                         </h2>
//                         <p className="text-amber-100 text-xl mb-8">
//                             Join thousands of readers discovering new stories every day
//                         </p>
//                         <div className="flex flex-wrap justify-center gap-4">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => navigate('/register')}
//                                 className="px-8 py-4 bg-white text-amber-600 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200"
//                             >
//                                 Get Started Free
//                             </motion.button>
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => navigate('/booksearch')}
//                                 className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200"
//                             >
//                                 Browse Books
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-amber-900 text-amber-100 py-12">
//                 <div className="container mx-auto px-6 max-w-6xl">
//                     <div className="flex flex-col md:flex-row justify-between items-center">
//                         <div className="flex items-center space-x-3 mb-4 md:mb-0">
//                             <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white">📚</span>
//                             </div>
//                             <span className="text-xl font-bold">BookNook</span>
//                         </div>
//                         <div className="text-amber-300">
//                             © 2024 BookNook. All rights reserved.
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Home;