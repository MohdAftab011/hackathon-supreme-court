"use client";

import React, { useState } from "react";
import SearchEngine from "@/components/SearchEngine";

const page = () => {
    const [query, setQuery] = useState("");
    const url = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:3000/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const obj = await res.json();
        console.log("data: ", obj.data);
    };
    return (
        <section>
            <h1>search</h1>
            <SearchEngine />
            <div className="  flex items-center  w-[500px] mx-auto">
                <div class="w-full  mx-auto">
                    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg
                        class="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    Search
                </button>
            </div>
        </section>
    );
};

export default page;
