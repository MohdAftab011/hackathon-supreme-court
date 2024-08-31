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
        <main className="flex min-h-screen  gap-5 items-center justify-center p-24">
            <Link className="bg-blue-500 " href={"/upload"}>
                View PDF{" "}
            </Link>
            <Link className="bg-blue-500 " href={"/search"}>
                search
            </Link>
        </main>
    );
}
