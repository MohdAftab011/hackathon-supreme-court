import React from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signOut } from "@/services/authService"; // Ensure signOut is imported

const Nav = () => {
    const { user, loading } = useAuth();

    const handleGoogleSignIn = async () => {
        await signInWithGoogle(); // Assuming signInWithGoogle handles redirection or other actions upon success
    };

    const handleGoogleSignOut = async () => {
        await signOut(); // Assuming signInWithGoogle handles redirection or other actions upon success
    };

    return (
        <section className="w-full flex justify-end">
            {loading ? (
                <div>Loading...</div> // Show a loading indicator while checking auth status
            ) : user ? (
                <div>
                    <h2>Welcome, {user.displayName || "User"}!</h2>
                    <button onClick={handleGoogleSignOut}>Sign Out</button>{" "}
                </div>
            ) : (
                <div>
                    <button onClick={handleGoogleSignIn}>
                        Sign In with Google
                    </button>
                </div>
            )}
        </section>
    );
};

export default Nav;
