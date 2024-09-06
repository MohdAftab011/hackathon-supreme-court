import React from 'react';

const Feature = () => {
    const feedbacks = [
        {
            title: "Take authentic feedbacks from customers of your app.",
            highlight: "Build a quick list.",
            imageSrc: "feedback1.jpeg", // You would replace with actual image source path
            altText: "Feedback Image 1"
        },
        {
            title: "Make quick fixes based on the feedbacks you've received.",
            highlight: "With a happy smile.",
            imageSrc: "feedback2.jpeg", // Replace with actual image source path
            altText: "Feedback Image 2"
        },
        {
            title: "Enjoy more than 10x revenue with real-time conversions.",
            highlight: "Grow your business.",
            imageSrc: "feedback3.jpeg", // Replace with actual image source path
            altText: "Feedback Image 3"
        }
    ];

    return (
        <>
            <section id="feature" className="text-center py-12 bg-white">
                <h2 className="text-4xl font-bold mb-4">Quality feedbacks for your SaaS products</h2>
                <p className="text-lg text-gray-600 mb-12">The blocks & components you need</p>
                <div className="grid gap-8 md:grid-cols-3 px-4 md:px-0">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                            <img
                                className="rounded-lg w-full mb-4"
                                src={feedback.imageSrc}
                                alt={feedback.altText}
                            />
                            <p className="text-lg font-semibold mb-2">
                                {feedback.title}{" "}
                                <span className="text-blue-600 underline">{feedback.highlight}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section  className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
                        <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                    </div>

                    <div className="relative mt-12 lg:mt-20">
                        <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                            <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                        </div>

                        <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 1 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a free account</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>

                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 2 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Build your website</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>

                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 3 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Release & Launch</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>            

    );
};

export default Feature;
