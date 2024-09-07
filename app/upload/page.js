"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle } from "@/services/authService";
import Link from "next/link";
import pdfToText from "react-pdftotext";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState("");
    const [fileURL, setFileURL] = useState(null); // For the file URL
    const { user, loading } = useAuth();

    const handleUploadPdf = async () => {
        if (!user) {
            await signInWithGoogle();
        }
        // Proceed with PDF upload logic here
    };

    function parsePdf(event) {
        const file = event.target.files[0];
        pdfToText(file)
            .then((text) => {
                console.log("pdf text:", text);
                setFileText(text);
            })
            .catch((error) => console.error("Failed to extract text from pdf"));
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // extract text from pdf
        parsePdf(e);

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
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-cover bg-center" style={{ backgroundImage: "/background-search.jpg" }}>
            {user ? (
                <>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="p-2 border border-gray-300 rounded-lg mt-4"
                    />
                    {fileURL && (
                        <div className="mt-4">
                            <button
                                onClick={handlePreviewPdf}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                View PDF
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
                    <p className="text-gray-600 mb-4">Please sign in to upload and view PDFs.</p>
                    <button
                        onClick={handleUploadPdf}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-10"
                    >
                        Sign In to Upload PDF
                    </button>
                </div>
            )}
        </main>
    );
}
