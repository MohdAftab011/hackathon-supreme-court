import React from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signOut } from "@/services/authService";

const Nav = () => {
    const { user, loading } = useAuth();

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    const handleGoogleSignOut = async () => {
        await signOut();
    };
    

    return (
        <>
            <header className="py-3 md:py-4 sticky top-0 bg-white z-2 shadow-md"> {/* Added background color here */}
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#home" title="Logo" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                            <img className="w-full h-12" src="logo.jpeg" alt="Logo" /> {/* Adjusted height */}
                        </a>
                    </div>


                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-900">
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
                            <a href="#feature" title="Solutions" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                Features
                            </a>
                            <a href="#" title="Industries" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                How it Works
                            </a>
                            <a href="#" title="About" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                About 
                            </a>
                        </div>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
                            {loading ? (
                                <div>Loading...</div>
                            ) : user ? (
                                <div className="flex items-center space-x-4">
                                    <span>Welcome, {user.displayName || "User"}!</span>
                                    <button
                                        onClick={handleGoogleSignOut}
                                        className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                    Sign In with Google
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Nav;


