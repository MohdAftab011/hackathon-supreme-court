"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { signInWithGoogle } from "@/services/authService";

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link className="bg-blue-500 " href={"/upload"}>
                View PDF{" "}
            </Link>
        </main>
    );
}
