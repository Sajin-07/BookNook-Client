export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-2xl">📚</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">BookNook</h3>
                            <p className="text-amber-100 text-sm">Your digital reading sanctuary</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-amber-100 font-medium">
                            © 2024 BookNook. All rights reserved.
                        </p>
                        {/* <p className="text-amber-200 text-sm mt-1">
                            Made with ❤️ for book lovers
                        </p> */}
                    </div>

                    {/* Social Links */}
                    <nav className="flex gap-4">
                        <a 
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110"
                            aria-label="Twitter"
                        >
                            <span className="text-lg">🐦</span>
                        </a>
                        <a 
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <span className="text-lg">📸</span>
                        </a>
                        <a 
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <span className="text-lg">👥</span>
                        </a>
                        <a 
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110"
                            aria-label="Email"
                        >
                            <span className="text-lg">✉️</span>
                        </a>
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-amber-400/30 mt-6 pt-6 text-center">
                    <div className="flex flex-wrap justify-center gap-6 text-amber-100 text-sm">
                        <a className="hover:text-white transition-colors duration-200 hover:underline">
                            Privacy Policy
                        </a>
                        <a className="hover:text-white transition-colors duration-200 hover:underline">
                            Terms of Service
                        </a>
                        <a className="hover:text-white transition-colors duration-200 hover:underline">
                            Contact Us
                        </a>
                        <a className="hover:text-white transition-colors duration-200 hover:underline">
                            About BookNook
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}