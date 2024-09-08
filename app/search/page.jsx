"use client";
import axios from "axios";
import React, { useState } from "react";
import ResultsArea from "@/components/ResultsArea";

const UnifiedSearch = () => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [articleResults, setArticleResults] = useState([]);
    const [googleResults, setGoogleResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                body: JSON.stringify({ query }),
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
                        item.title
                            ? `"${item.title}" "Indian Constitution" "India"`
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

    return (
        <>
    <div style={{
            backgroundColor: "white",
            minHeight: "100vh",
            backgroundImage: "url('justice-photo.jpg')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}>
        <section
            className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
            style={{
                backgroundImage: "url('background-search.jpg')", // Ensure you have the correct path for the image
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-2xl font-bold mb-6 text-black">
                Unified Search
            </h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <input
                        className="flex-grow p-3 outline-none text-black"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for articles..."
                    />
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-3 px-6 hover:bg-blue-600 transition duration-200 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div
                className={`text-white p-2 rounded-md px-6 bg-blue-600 my-5`}
            >
                {isLoading
                    ? "Fetching Results..."
                    : articleResults.length || googleResults.length
                    ? "Search Results"
                    : "Type the case details to search"}
            </div>
            {(articleResults.length || googleResults.length) && (
                <ResultsArea
                    articleResults={articleResults}
                    googleResults={googleResults}
                />
            )}
        </section>
    </div>
</>

    );
};

export default UnifiedSearch;
