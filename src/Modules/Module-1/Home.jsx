import { useState } from "react";
import { BookOpen, Sparkles, Library, Star, Quote, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-library.jpg";
import book1 from "../../assets/book-1.png";
import book2 from "../../assets/book-2.png";
import book3 from "../../assets/book-3.png";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quotes = [
    {
      text: "A room without books is like a body without a soul.",
      author: "Marcus Tullius Cicero",
    },
    {
      text: "The more that you read, the more things you will know.",
      author: "Dr. Seuss",
    },
    {
      text: "Reading is to the mind what exercise is to the body.",
      author: "Joseph Addison",
    },
  ];

  const pricingPlans = [
    {
      name: "Free Reader",
      price: "$0",
      period: "forever",
      features: [
        "Access to 1,000+ free books",
        "Standard reading interface",
        "Basic bookmarks",
        "Community forums",
      ],
      highlighted: false,
    },
    {
      name: "Premium Member",
      price: "$12.99",
      period: "per month",
      features: [
        "Unlimited access to 50,000+ books",
        "Ad-free experience",
        "Offline reading mode",
        "Audiobook collection",
        "Priority customer support",
        "Advanced reading statistics",
      ],
      highlighted: true,
    },
    {
      name: "Family Plan",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Premium",
        "Up to 6 family members",
        "Kids reading section",
        "Parental controls",
        "Shared library",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-amber-100/95 backdrop-blur-md z-50 border-b border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
              <span className="text-xl sm:text-2xl font-bold text-amber-900">BookNook</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
                Home
              </a>
              <a href="#books" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
                Books
              </a>
              <a href="#pricing" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#quotes" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
                Quotes
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <button className="px-4 py-2 border border-amber-300 rounded-md hover:bg-amber-200 transition-colors text-amber-800 text-sm font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm font-medium">
                  Sign Up
                </button>
              </Link>
              <Link to="/booksearch">
                <button className="px-4 py-2 rounded-md bg-amber-700 text-white hover:bg-amber-800 transition-colors text-sm font-medium">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-amber-800 hover:bg-amber-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-amber-200 pt-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4 mb-6">
                <a
                  href="#home"
                  className="text-amber-800 hover:text-amber-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#books"
                  className="text-amber-800 hover:text-amber-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Books
                </a>
                <a
                  href="#pricing"
                  className="text-amber-800 hover:text-amber-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#quotes"
                  className="text-amber-800 hover:text-amber-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quotes
                </a>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/login" className="flex-1">
                  <button 
                    className="w-full px-4 py-3 border border-amber-300 rounded-md hover:bg-amber-200 transition-colors text-amber-800 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register" className="flex-1">
                  <button 
                    className="w-full px-4 py-3 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to="/booksearch" className="flex-1">
                  <button 
                    className="w-full px-4 py-3 rounded-md bg-amber-700 text-white hover:bg-amber-800 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Bento Grid */}
      <section id="home" className="pt-20 sm:pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
            {/* Large hero image */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden group animate-fade-in-up min-h-[400px] md:min-h-0">
              <img
                src={heroImage}
                alt="Cozy library interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                  Welcome to BookNook
                </h1>
                <p className="text-lg sm:text-xl text-amber-100 mb-6 max-w-2xl">
                  Your personal digital library with thousands of books at your
                  fingertips
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/booksearch">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors text-lg font-medium">
                      Explore Library
                    </button>
                  </Link>
                  <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-white text-amber-800 hover:bg-amber-50 transition-colors text-lg font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Smaller grid items */}
            <div className="md:col-span-4 flex flex-col gap-4 mt-4 md:mt-0">
              <div className="bg-white rounded-2xl p-6 flex-1 flex flex-col justify-center items-center text-center hover:shadow-lg transition-all animate-scale-in border border-amber-200 min-h-[200px]">
                <Library className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">
                  50,000+ Books
                </h3>
                <p className="text-amber-700 text-sm sm:text-base">
                  Extensive collection across all genres
                </p>
              </div>

              <div className="bg-amber-200 rounded-2xl p-6 flex-1 flex flex-col justify-center items-center text-center hover:shadow-lg transition-all animate-scale-in border border-amber-300 min-h-[200px]">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-amber-700 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">
                  AI Recommendations
                </h3>
                <p className="text-amber-800 text-sm sm:text-base">
                  Personalized reading suggestions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books with Floating Animation */}
      <section id="books" className="py-16 px-4 bg-amber-100/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Featured This Month
            </h2>
            <p className="text-lg sm:text-xl text-amber-700">
              Discover our carefully curated selection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[book1, book2, book3].map((book, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer ${
                  index % 2 === 0 ? "animate-float" : "animate-float-delayed"
                }`}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-amber-200">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={book}
                      alt={`Featured book ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-500 text-amber-500"
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-lg text-amber-900">
                      Featured Title {index + 1}
                    </h3>
                    <p className="text-amber-700 text-sm">By Amazing Author</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg sm:text-xl text-amber-700">
              Join thousands of readers today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                  plan.highlighted
                    ? "bg-amber-600 text-white shadow-2xl border-2 border-amber-600 transform lg:-translate-y-4"
                    : "bg-white text-amber-900 border border-amber-200"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="text-sm font-semibold mb-4 text-amber-100">
                    MOST POPULAR
                  </div>
                )}
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-amber-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ml-2 ${
                      plan.highlighted ? "text-amber-100" : "text-amber-700"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Star
                        className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted
                            ? "fill-amber-200 text-amber-200"
                            : "fill-amber-500 text-amber-500"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-amber-50" : "text-amber-800"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full px-6 py-3 rounded-md text-base sm:text-lg font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-white text-amber-700 hover:bg-amber-50"
                      : "border border-amber-300 hover:bg-amber-100 text-amber-800"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quotes */}
      <section id="quotes" className="py-16 px-4 bg-amber-100/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Words of Wisdom
            </h2>
            <p className="text-lg sm:text-xl text-amber-700">
              Inspiration from great minds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up border border-amber-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mb-4" />
                <p className="text-base sm:text-lg text-amber-900 mb-4 italic">
                  "{quote.text}"
                </p>
                <p className="text-amber-700 font-semibold text-sm sm:text-base">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-amber-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
                <span className="text-xl sm:text-2xl font-bold">BookNook</span>
              </div>
              <p className="text-amber-200 text-sm sm:text-base">
                Your gateway to unlimited reading adventures
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Categories</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Fiction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Non-Fiction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Classics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Connect</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors text-sm sm:text-base"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-700 pt-8 text-center text-amber-200 text-sm sm:text-base">
            <p>
              &copy; 2024 BookNook. All rights reserved. Made with love for
              readers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaBook,
//   FaRocket,
//   FaGift,
//   FaStar,
//   FaUsers,
//   FaHeadphones,
//   FaCrown,
//   FaSearch,
//   FaHeart,
//   FaMobile,
//   FaComments,
//   FaBookOpen,
//   FaGraduationCap,
//   FaShieldAlt,
//   FaCalendarAlt
// } from "react-icons/fa";

// const Home = () => {
//     const navigate = useNavigate();

//     const floatingBooks = [
//         { icon: FaBook, delay: 0, size: "text-4xl", color: "text-red-400" },
//         { icon: FaBook, delay: 0.5, size: "text-3xl", color: "text-green-400" },
//         { icon: FaBook, delay: 1, size: "text-5xl", color: "text-blue-400" },
//         { icon: FaBook, delay: 1.5, size: "text-2xl", color: "text-yellow-400" },
//         { icon: FaBookOpen, delay: 2, size: "text-4xl", color: "text-purple-400" },
//         { icon: FaBook, delay: 2.5, size: "text-3xl", color: "text-indigo-400" },
//     ];

//     const pricingPlans = [
//         {
//             name: "Free Reader",
//             price: "$0",
//             period: "forever",
//             icon: FaBookOpen,
//             color: "from-amber-200 to-amber-300",
//             textColor: "text-amber-900",
//             features: [
//                 "Access to 1000+ free books",
//                 "Basic reading features",
//                 "Community discussions",
//                 "Book recommendations",
//                 "Reading challenges"
//             ],
//             buttonText: "Start Reading Free",
//             popular: false
//         },
//         {
//             name: "Book Explorer",
//             price: "$9.99",
//             period: "per month",
//             icon: FaSearch,
//             color: "from-amber-400 to-orange-400",
//             textColor: "text-white",
//             features: [
//                 "All Free features",
//                 "Unlimited book access",
//                 "Audiobook downloads",
//                 "Early book releases",
//                 "Advanced search filters",
//                 "Custom bookshelves"
//             ],
//             buttonText: "Start 7-Day Trial",
//             popular: true
//         },
//         {
//             name: "Premium Bibliophile",
//             price: "$19.99",
//             period: "per month",
//             icon: FaCrown,
//             color: "from-purple-500 to-pink-500",
//             textColor: "text-white",
//             features: [
//                 "All Explorer features",
//                 "Exclusive author events",
//                 "Personal book concierge",
//                 "Offline reading mode",
//                 "Priority support",
//                 "Book club hosting",
//                 "Custom reading plans"
//             ],
//             buttonText: "Go Premium",
//             popular: false
//         }
//     ];

//     const premiumBenefits = [
//         {
//             icon: FaHeadphones,
//             title: "Audiobooks",
//             description: "Listen to your favorite books anywhere"
//         },
//         {
//             icon: FaMobile,
//             title: "Offline Reading",
//             description: "Download books and read without internet"
//         },
//         {
//             icon: FaCrown,
//             title: "Exclusive Content",
//             description: "Early access to new releases and author events"
//         },
//         {
//             icon: FaSearch,
//             title: "Advanced Search",
//             description: "Find exactly what you want with smart filters"
//         },
//         {
//             icon: FaBook,
//             title: "Unlimited Library",
//             description: "Access our entire collection without limits"
//         },
//         {
//             icon: FaComments,
//             title: "Priority Support",
//             description: "Get help from our book experts 24/7"
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
//             {/* Animated Background Elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {floatingBooks.map((book, index) => {
//                     const IconComponent = book.icon;
//                     return (
//                         <motion.div
//                             key={index}
//                             className={`absolute ${book.size} ${book.color} opacity-20`}
//                             initial={{ y: 100, opacity: 0 }}
//                             animate={{
//                                 y: [100, -100, 100],
//                                 x: [0, Math.sin(index) * 50, 0],
//                                 rotate: [0, 180, 360]
//                             }}
//                             transition={{
//                                 duration: 8 + index,
//                                 repeat: Infinity,
//                                 delay: book.delay,
//                                 ease: "easeInOut"
//                             }}
//                             style={{
//                                 left: `${20 + index * 15}%`,
//                             }}
//                         >
//                             <IconComponent />
//                         </motion.div>
//                     );
//                 })}
//             </div>

//             {/* Navigation */}
//             <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-200">
//                 <div className="container mx-auto px-4 sm:px-6 py-3">
//                     <div className="flex items-center justify-between">
//                         {/* Logo */}
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex items-center space-x-2 sm:space-x-3"
//                         >
//                             <motion.div
//                                 whileHover={{ scale: 1.1, rotate: 360 }}
//                                 className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center"
//                             >
//                                 <FaBook className="text-white text-sm sm:text-lg" />
//                             </motion.div>
//                             <span className="text-xl sm:text-2xl font-bold text-amber-900">BookNook</span>
//                         </motion.div>

//                         {/* Navigation Buttons */}
//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 }}
//                             className="flex items-center space-x-2 sm:space-x-4"
//                         >
//                             <button
//                                 onClick={() => navigate('/login')}
//                                 className="px-3 sm:px-6 py-1 sm:py-2 text-amber-700 font-medium hover:text-amber-900 transition-colors duration-200 text-sm sm:text-base"
//                             >
//                                 Login
//                             </button>
//                             <button
//                                 onClick={() => navigate('/register')}
//                                 className="px-3 sm:px-6 py-1 sm:py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-200 font-medium text-sm sm:text-base"
//                             >
//                                 Sign Up
//                             </button>
//                             <button
//                                 onClick={() => navigate('/booksearch')}
//                                 className="px-3 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm sm:text-base"
//                             >
//                                 Explore
//                             </button>
//                         </motion.div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Hero Section with Bento Grid */}
//             <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                         {/* Left Content */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.7 }}
//                             className="space-y-6"
//                         >
//                             <motion.h1
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.3 }}
//                                 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight"
//                             >
//                                 Discover Your Next{" "}
//                                 <motion.span
//                                     className="text-amber-500"
//                                     animate={{
//                                         scale: [1, 1.1, 1],
//                                         rotate: [0, 5, -5, 0]
//                                     }}
//                                     transition={{ duration: 2, repeat: Infinity }}
//                                 >
//                                     Favorite
//                                 </motion.span>{" "}
//                                 Book
//                             </motion.h1>

//                             <motion.p
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.5 }}
//                                 className="text-lg sm:text-xl text-amber-700 leading-relaxed"
//                             >
//                                 Dive into a magical world of stories with BookNook. Explore thousands of books,
//                                 track your reading journey, and connect with fellow book lovers in our vibrant community.
//                             </motion.p>

//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.7 }}
//                                 className="flex flex-wrap gap-3 sm:gap-4 pt-4"
//                             >
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => navigate('/booksearch')}
//                                     className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
//                                 >
//                                     <FaRocket />
//                                     Start Exploring
//                                 </motion.button>
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => navigate('/register')}
//                                     className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-500 text-amber-600 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-50 transition-all duration-200 flex items-center gap-2"
//                                 >
//                                     <FaGift />
//                                     Join Free
//                                 </motion.button>
//                             </motion.div>
//                         </motion.div>

//                         {/* Bento Grid Right Content */}
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.7, delay: 0.3 }}
//                             className="grid grid-cols-2 gap-4 h-full"
//                         >
//                             {/* Bento Grid Items */}
//                             <motion.div
//                                 whileHover={{ y: -5, scale: 1.02 }}
//                                 className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl p-6 shadow-xl border-2 border-amber-300 col-span-2 row-span-2 flex flex-col justify-center items-center text-center"
//                             >
//                                 <motion.div
//                                     animate={{ y: [0, -10, 0] }}
//                                     transition={{ duration: 3, repeat: Infinity }}
//                                     className="text-6xl mb-4 text-white"
//                                 >
//                                     <FaBook />
//                                 </motion.div>
//                                 <h3 className="text-2xl font-bold text-white mb-2">10,000+ Books</h3>
//                                 <p className="text-amber-100">Curated collection waiting for you</p>
//                             </motion.div>

//                             <motion.div
//                                 whileHover={{ y: -5, scale: 1.02 }}
//                                 className="bg-white rounded-3xl p-4 shadow-lg border-2 border-amber-200 flex flex-col justify-center items-center text-center"
//                             >
//                                 <div className="text-4xl mb-2 text-amber-500">
//                                     <FaStar />
//                                 </div>
//                                 <h4 className="font-bold text-amber-900">4.9/5 Rating</h4>
//                             </motion.div>

//                             <motion.div
//                                 whileHover={{ y: -5, scale: 1.02 }}
//                                 className="bg-white rounded-3xl p-4 shadow-lg border-2 border-amber-200 flex flex-col justify-center items-center text-center"
//                             >
//                                 <div className="text-4xl mb-2 text-amber-500">
//                                     <FaUsers />
//                                 </div>
//                                 <h4 className="font-bold text-amber-900">50K+ Readers</h4>
//                             </motion.div>

//                             <motion.div
//                                 whileHover={{ y: -5, scale: 1.02 }}
//                                 className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-4 shadow-xl border-2 border-blue-300 col-span-2 flex items-center justify-center gap-3"
//                             >
//                                 <div className="text-3xl text-white">
//                                     <FaHeadphones />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-white">Audiobooks</h4>
//                                     <p className="text-blue-100 text-sm">Listen anywhere</p>
//                                 </div>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* Floating Books Section */}
//             <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-400/20 to-orange-400/20 relative overflow-hidden">
//                 <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="mb-12"
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
//                             Books That Come to Life! <FaStar className="inline text-amber-500" />
//                         </h2>
//                         <p className="text-lg sm:text-xl text-amber-700 max-w-2xl mx-auto">
//                             Watch our magical books float through your reading journey
//                         </p>
//                     </motion.div>

//                     <div className="relative h-64">
//                         {floatingBooks.map((book, i) => {
//                             const IconComponent = book.icon;
//                             return (
//                                 <motion.div
//                                     key={i}
//                                     className={`absolute ${book.size} ${book.color}`}
//                                     animate={{
//                                         y: [0, -100, 0],
//                                         x: [0, Math.sin(i) * 50, 0],
//                                         rotate: [0, 180, 360]
//                                     }}
//                                     transition={{
//                                         duration: 6 + i,
//                                         repeat: Infinity,
//                                         delay: i * 0.8,
//                                         ease: "easeInOut"
//                                     }}
//                                     style={{
//                                         left: `${i * 15}%`,
//                                     }}
//                                 >
//                                     <IconComponent />
//                                 </motion.div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* Pricing Section */}
//             <section className="py-16 sm:py-20 bg-white">
//                 <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-center mb-12"
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
//                             Choose Your Reading Adventure <FaBookOpen className="inline text-amber-500" />
//                         </h2>
//                         <p className="text-lg sm:text-xl text-amber-700 max-w-2xl mx-auto">
//                             Pick the perfect plan for your reading journey
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//                         {pricingPlans.map((plan, index) => {
//                             const IconComponent = plan.icon;
//                             return (
//                                 <motion.div
//                                     key={plan.name}
//                                     initial={{ opacity: 0, y: 30 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.2 }}
//                                     whileHover={{ y: -10, scale: 1.02 }}
//                                     className={`relative rounded-3xl p-6 sm:p-8 shadow-xl border-2 ${
//                                         plan.popular
//                                             ? 'border-amber-400 scale-105 z-10'
//                                             : 'border-amber-200'
//                                     }`}
//                                 >
//                                     {plan.popular && (
//                                         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
//                                             Most Popular! <FaStar className="inline ml-1" />
//                                         </div>
//                                     )}

//                                     <div className={`bg-gradient-to-r ${plan.color} rounded-2xl p-6 text-center mb-6`}>
//                                         <div className="text-4xl mb-4">
//                                             <IconComponent className={plan.textColor} />
//                                         </div>
//                                         <h3 className={`text-2xl font-bold ${plan.textColor} mb-2`}>{plan.name}</h3>
//                                         <div className="flex items-baseline justify-center gap-1">
//                                             <span className={`text-4xl font-bold ${plan.textColor}`}>{plan.price}</span>
//                                             <span className={`${plan.textColor} opacity-80`}>/{plan.period}</span>
//                                         </div>
//                                     </div>

//                                     <ul className="space-y-3 mb-8">
//                                         {plan.features.map((feature, idx) => (
//                                             <motion.li
//                                                 key={idx}
//                                                 initial={{ opacity: 0, x: -20 }}
//                                                 whileInView={{ opacity: 1, x: 0 }}
//                                                 transition={{ delay: index * 0.2 + idx * 0.1 }}
//                                                 className="flex items-center gap-3 text-amber-700"
//                                             >
//                                                 <span className="text-green-500 text-lg">✓</span>
//                                                 {feature}
//                                             </motion.li>
//                                         ))}
//                                     </ul>

//                                     <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         onClick={() => navigate('/register')}
//                                         className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
//                                             plan.popular
//                                                 ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-2xl'
//                                                 : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
//                                         }`}
//                                     >
//                                         {plan.buttonText}
//                                     </motion.button>
//                                 </motion.div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* Premium Benefits Section */}
//             <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-500 to-orange-500">
//                 <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-center mb-12"
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//                             Why Go Premium? <FaCrown className="inline" />
//                         </h2>
//                         <p className="text-amber-100 text-lg sm:text-xl max-w-2xl mx-auto">
//                             Unlock the ultimate reading experience with these amazing benefits
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {premiumBenefits.map((benefit, index) => {
//                             const IconComponent = benefit.icon;
//                             return (
//                                 <motion.div
//                                     key={benefit.title}
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     whileInView={{ opacity: 1, scale: 1 }}
//                                     whileHover={{ scale: 1.05, y: -5 }}
//                                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
//                                 >
//                                     <motion.div
//                                         animate={{
//                                             scale: [1, 1.2, 1],
//                                             rotate: [0, 10, -10, 0]
//                                         }}
//                                         transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
//                                         className="text-4xl mb-4 text-white"
//                                     >
//                                         <IconComponent />
//                                     </motion.div>
//                                     <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
//                                     <p className="text-amber-100">{benefit.description}</p>
//                                 </motion.div>
//                             );
//                         })}
//                     </div>

//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.4 }}
//                         className="text-center mt-12"
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => navigate('/register')}
//                             className="px-8 py-4 bg-white text-amber-600 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-200 flex items-center gap-2 mx-auto"
//                         >
//                             <FaRocket />
//                             Start Your Premium Journey
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Final CTA Section */}
//             <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-400 to-orange-400">
//                 <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//                             Ready to Begin Your Story? <FaBookOpen className="inline" />
//                         </h2>
//                         <p className="text-amber-100 text-xl mb-8">
//                             Join thousands of readers discovering new worlds every day
//                         </p>
//                         <div className="flex flex-wrap justify-center gap-4">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => navigate('/register')}
//                                 className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center gap-2"
//                             >
//                                 <FaBook />
//                                 Start Reading Free
//                             </motion.button>
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => navigate('/booksearch')}
//                                 className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
//                             >
//                                 <FaSearch />
//                                 Browse Books
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-amber-900 text-amber-100 py-12">
//                 <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
//                     <div className="flex flex-col md:flex-row justify-between items-center">
//                         <div className="flex items-center space-x-3 mb-4 md:mb-0">
//                             <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
//                                 <FaBook className="text-white" />
//                             </div>
//                             <span className="text-xl font-bold">BookNook</span>
//                         </div>
//                         <div className="text-amber-300 text-center md:text-right">
//                             <p>© 2024 BookNook. All rights reserved.</p>
//                             <p className="text-sm mt-1 flex items-center justify-center md:justify-end gap-1">
//                                 Made with <FaHeart className="text-red-400" /> for book lovers everywhere
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Home;
