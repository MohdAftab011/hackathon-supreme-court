"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle } from "@/services/authService";
import Link from "next/link";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null); // For the file URL
    const { user, loading } = useAuth();

    const handleUploadPdf = async () => {
        if (!user) {
            await signInWithGoogle();
        }
        // Proceed with PDF upload logic here
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Create a URL for the file to preview
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setFileURL(url);
        }
    };

    const handlePreviewPdf = () => {
        if (fileURL) {
            window.open(fileURL, "_blank"); // Open the PDF in a new tab
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {user ? (
                <>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                    {fileURL && (
                        <div className="mt-4">
                            <button
                                onClick={handlePreviewPdf}
                                className="bg-blue-500 p-2 text-white"
                            >
                                View PDF
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <button
                    onClick={handleUploadPdf}
                    className="bg-blue-500 p-2 text-white"
                >
                    Sign In to Upload PDF
                </button>
            )}
        </main>
    );
}
