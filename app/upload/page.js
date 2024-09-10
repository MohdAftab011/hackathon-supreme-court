"use client";
import axios from "axios";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle } from "@/services/authService";
import Link from "next/link";
import pdfToText from "react-pdftotext";
import ResultsArea from "@/components/ResultsArea";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState("");
    const [fileURL, setFileURL] = useState(null); // For the file URL
    // const { user, loading } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [articleResults, setArticleResults] = useState([]);
    const [googleResults, setGoogleResults] = useState([]);

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    function parsePdf(event) {
        const file = event.target.files[0];
        pdfToText(file)
            .then((text) => {
                if (text === "") return;
                console.log("pdf text:", text);
                setFileText(text);

                handleFetchData(text);
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

    const handleFetchData = async (text) => {
        setIsLoading(true);
        setError(null);
        setArticleResults([]);
        setGoogleResults([]);

        try {
            // Search your API for articles
            const articleRes = await fetch(`/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: text }),
            });

            const articleData = await articleRes.json();
            console.log("API response:", articleData.data);

            // Ensure articleData is an array
            const resultsArray = articleData.data;
            setArticleResults(resultsArray);

            // Perform Google search using the article titles
            console.log("result array", resultsArray);
            if (resultsArray.length > 0) {
                const googleQuery = resultsArray
                    .map((item) =>
                        item.Section
                            ? `"Indian laws" "Section ${item.Section}"` +
                              (item.chapter
                                  ? ` "chapter ${item.chapter}"`
                                  : "") +
                              ` "India" OR "Indian Penal Code" OR "IPC"`
                            : ""
                    )

                    .filter(Boolean)
                    .join(" OR ");

                // Add keywords to restrict results to Indian rules and laws
                console.log("googlequery", googleQuery);

                const response = await axios.get(
                    `https://www.googleapis.com/customsearch/v1?key=${
                        process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_API_KEY
                    }&cx=${
                        process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
                    }&q=${encodeURIComponent(googleQuery)}`
                );

                console.log("response of google", response.data.items);

                setGoogleResults(response.data.items);
            }
        } catch (error) {
            console.error("Error performing search:", error);
            setError("An error occurred while searching. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreviewPdf = () => {
        if (fileURL) {
            window.open(fileURL, "_blank"); // Open the PDF in a new tab
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    minHeight: "100vh",
                    backgroundImage: "url('upload-background.jpeg')", // Replace with your image path
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <section
                    className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
                    style={{
                        backgroundImage: "background-search.jpg", // Replace with your image path
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h1 className="text-2xl font-bold mb-6 text-black">
                        Upload PDF
                    </h1>
                    <div className="flex w-full justify-between mr-5">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="p-2 border border-gray-300 text-gray-800 rounded-lg mt-4"
                        />
                        {fileURL && (
                            <div>
                                <div className="my4-">
                                    <button
                                        onClick={handlePreviewPdf}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        View PDF
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={` text-white p-2 rounded-md px-6  bg-blue-600   my-5`}
                    >
                        {isLoading
                            ? "Fetching Results..."
                            : articleResults.length || googleResults.length
                            ? "Results for PDF"
                            : "Upload PDF to Search"}
                    </div>
                    {(articleResults.length || googleResults.length) && (
                        <ResultsArea
                            articleResults={articleResults}
                            googleResults={googleResults}
                        />
                    )}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </section>
            </div>
        </>
    );
}
