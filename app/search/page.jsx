"use client";
import axios from "axios";
import React, { useState } from "react";

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
            const articleRes = await fetch("http://localhost:3000/api/search", {
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
                    .map((item) => item.title || "")
                    .filter(Boolean)
                    .join(" OR ");

                console.log("googleqyery", googleQuery);

                const response = await axios.get(
                    `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&q=${googleQuery}`
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
        <section className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Unified Search</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                        className="flex-grow p-2 outline-none text-gray-500"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for articles..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 px-4 hover:bg-blue-600 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {articleResults.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Article Results:
                    </h2>
                    <div className="grid gap-4">
                        {articleResults.map((result, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded-lg shadow-sm"
                            >
                                <h3 className="font-bold">
                                    {result.title || "Untitled"}
                                </h3>
                                {result.article_number && (
                                    <p>
                                        Article Number: {result.article_number}
                                    </p>
                                )}
                                {result.similarity_score !== undefined && (
                                    <p>
                                        Similarity Score:{" "}
                                        {result.similarity_score.toFixed(4)}
                                    </p>
                                )}
                                {Object.entries(result).map(
                                    ([key, value]) =>
                                        ![
                                            "title",
                                            "article_number",
                                            "similarity_score",
                                        ].includes(key) && (
                                            <p key={key}>
                                                {key}: {JSON.stringify(value)}
                                            </p>
                                        )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {googleResults.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Related Google Results:
                    </h2>
                    <ul className="list-disc pl-5">
                        {googleResults.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default UnifiedSearch;
