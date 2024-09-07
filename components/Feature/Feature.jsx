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
        </>            

    );
};

export default Feature;
