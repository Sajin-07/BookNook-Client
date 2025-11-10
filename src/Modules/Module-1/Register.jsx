// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { _userSignup } from "../../utils/axios_controllers";

// const Register = () => {
//     const navigate_to_select_genre = useNavigate();
//     const [error_in_input, change_error_in_input] = useState(false);
//     const [submission_attempt, change_submission_attempt] = useState(0);

//     let error_msg = "";
//     const [error_state, change_error_state] = useState(error_msg);

//     const [username, set_username] = useState("");
//     const [firstName, set_firstName] = useState("");
//     const [lastName, set_lastName] = useState("");
//     const [email, set_email] = useState("");
//     const [password, set_password] = useState("");
//     const [confirm_password, set_confirm_password] = useState("");

//     const handleInputChange = (set_func) => {
//         return (event) => set_func(event.target.value);
//     };

//     useEffect(() => {
//         if (submission_attempt > 0 && !error_in_input) {
//             const newUser = {
//                 username: username,
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: password,
//             };
//             _userSignup(newUser)
//                 .then((data) => {
//                     if (data.success) {
//                         navigate_to_select_genre("/selectgenre");
//                     } else {
//                         error_msg = "Username or password already taken!";
//                         change_error_state(error_msg);
//                         change_error_in_input(true);
//                     }
//                 })
//                 .catch((err) => {
//                     error_msg = "400 Bad Request";
//                     change_error_state(error_msg);
//                     change_error_in_input(true);
//                     console.log(err);
//                 });
//         }
//     }, [submission_attempt]);

//     return (
//         <div
//             className="text-white h-[100vh] flex justify-center items-center bg-cover"
//             style={{ backgroundImage: "url('../src/assets/bookstore-bg.jpg')" }}
//         >
//             <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
//                 <h1 className="text-4xl font-bold text-center mb-8">
//                     Register
//                 </h1>
//                 <div>
//                     <div className="relative my-4">
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={handleInputChange(set_username)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             User Name
//                         </label>
//                         {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <div className="relative my-4">
//                         <input
//                             type="text"
//                             value={firstName}
//                             onChange={handleInputChange(set_firstName)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             First Name
//                         </label>
//                         {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <div className="relative my-4">
//                         <input
//                             type="text"
//                             value={lastName}
//                             onChange={handleInputChange(set_lastName)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             Last Name
//                         </label>
//                         {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <div className="relative my-4">
//                         <input
//                             type="text"
//                             value={email}
//                             onChange={handleInputChange(set_email)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             Email
//                         </label>
//                         {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <div className="relative my-4">
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={handleInputChange(set_password)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             Your Password
//                         </label>
//                         {/* <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <div className="relative my-4">
//                         <input
//                             type="password"
//                             value={confirm_password}
//                             onChange={handleInputChange(set_confirm_password)}
//                             className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
//                             placeholder=" "
//                         />
//                         <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                             Your Confirm Password
//                         </label>
//                         {/* <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" /> */}
//                     </div>
//                     <button
//                         className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
//                         // type="submit"
//                         onClick={() => {
//                             if (username == "") {
//                                 error_msg = "Username can't be empty";
//                             } else if (firstName == "") {
//                                 error_msg = "First name can't be empty";
//                             } else if (lastName == "") {
//                                 error_msg = "Last name can't be empty";
//                             } else if (email == "") {
//                                 error_msg = "Email can't be empty";
//                             } else if (password.length < 6) {
//                                 error_msg =
//                                     "Password have to be at least 6 digit long";
//                             } else if (password != confirm_password) {
//                                 error_msg = "Password don't match";
//                             } else {
//                                 error_msg = "";
//                             }
//                             change_error_state(error_msg);
//                             if (error_msg) {
//                                 change_error_in_input(true);
//                             } else {
//                                 change_submission_attempt(
//                                     submission_attempt + 1
//                                 );
//                                 change_error_in_input(false);
//                             }
//                         }}
//                     >
//                         {" "}
//                         Register
//                         {/* <Link to="/SelectGenre">Register</Link> */}
//                     </button>
//                     {error_in_input && (
//                         <div role="alert" className="alert alert-warning">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="stroke-current shrink-0 h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                                 />
//                             </svg>
//                             <span>{error_state}</span>
//                         </div>
//                     )}
//                     <div className="mt-2 items-center">
//                         <div className="my-4">
//                             <span>
//                                 Already Register?{" "}
//                                 <span className="text-blue-500">
//                                     {" "}
//                                     <Link to="/Login">Login</Link>
//                                 </span>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { _userSignup } from "../../utils/axios_controllers";
import { BiUser, BiEnvelope, BiLock } from "react-icons/bi";

const Register = () => {
    const navigate_to_select_genre = useNavigate();
    const [error_in_input, change_error_in_input] = useState(false);
    const [submission_attempt, change_submission_attempt] = useState(0);

    let error_msg = "";
    const [error_state, change_error_state] = useState(error_msg);

    const [username, set_username] = useState("");
    const [firstName, set_firstName] = useState("");
    const [lastName, set_lastName] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");

    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };

    useEffect(() => {
        if (submission_attempt > 0 && !error_in_input) {
            const newUser = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            _userSignup(newUser)
                .then((data) => {
                    if (data.success) {
                        navigate_to_select_genre("/selectgenre");
                    } else {
                        error_msg = "Username or email already taken!";
                        change_error_state(error_msg);
                        change_error_in_input(true);
                    }
                })
                .catch((err) => {
                    error_msg = "Registration failed. Please try again.";
                    change_error_state(error_msg);
                    change_error_in_input(true);
                    console.log(err);
                });
        }
    }, [submission_attempt]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
                
                {/* Floating book icons */}
                <div className="absolute top-20 right-10 text-amber-300 text-6xl opacity-10">📚</div>
                <div className="absolute bottom-20 left-10 text-amber-300 text-6xl opacity-10">📖</div>
                <div className="absolute top-1/2 right-20 text-orange-200 text-4xl opacity-10">🔖</div>
                <div className="absolute top-1/3 left-32 text-amber-300 text-5xl opacity-10">📗</div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Header with bookstore branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4 shadow-lg">
                        <span className="text-2xl text-white">📚</span>
                    </div>
                    <h1 className="text-3xl font-bold text-amber-900 mb-2">Join BookNook</h1>
                    <p className="text-amber-700">Start your reading adventure today</p>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                Username *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiUser className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleInputChange(set_username)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="Choose a username"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiEnvelope className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleInputChange(set_email)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                First Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiUser className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={handleInputChange(set_firstName)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="Your first name"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                Last Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiUser className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={handleInputChange(set_lastName)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="Your last name"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiLock className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handleInputChange(set_password)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="At least 6 characters"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-amber-800 text-sm font-medium mb-2">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BiLock className="h-5 w-5 text-amber-400" />
                                </div>
                                <input
                                    type="password"
                                    value={confirm_password}
                                    onChange={handleInputChange(set_confirm_password)}
                                    className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-200 placeholder-amber-300"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error_in_input && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-red-700 text-sm">{error_state}</span>
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        onClick={() => {
                            if (username === "") {
                                error_msg = "Username can't be empty";
                            } else if (firstName === "") {
                                error_msg = "First name can't be empty";
                            } else if (lastName === "") {
                                error_msg = "Last name can't be empty";
                            } else if (email === "") {
                                error_msg = "Email can't be empty";
                            } else if (password.length < 6) {
                                error_msg = "Password must be at least 6 characters long";
                            } else if (password !== confirm_password) {
                                error_msg = "Passwords don't match";
                            } else {
                                error_msg = "";
                            }
                            change_error_state(error_msg);
                            if (error_msg) {
                                change_error_in_input(true);
                            } else {
                                change_submission_attempt(submission_attempt + 1);
                                change_error_in_input(false);
                            }
                        }}
                        className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        Create Your BookNook Account
                    </button>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-amber-700">
                            Already have an account?{" "}
                            <Link 
                                to="/Login" 
                                className="text-amber-600 font-semibold hover:text-amber-700 underline transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 text-center">
                        <p className="text-amber-600 text-xs">
                            By registering, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-amber-600 text-sm">
                        📚 Join thousands of readers in our community
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;