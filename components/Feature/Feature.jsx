import React from 'react';

const Feature = () => {
    const feedbacks = [
        {
            title: "Take authentic feedbacks from customers of your app.",
            highlight: "Predictive Analytics",
            imageSrc: "Pre-An.jpeg", // You would replace with actual image source path
            altText: "Feedback Image 1"
        },
        {
            title: "Make quick fixes based on the feedbacks you've received.",
            highlight: "Ethical Compliance",
            imageSrc: "eth-comp.jpeg", // Replace with actual image source path
            altText: "Feedback Image 2"
        },
        {
            title: "Enjoy more than 10x revenue with real-time conversions.",
            highlight: "Technical Feasibility and Reliability",
            imageSrc: "Tech-feas.jpeg", // Replace with actual image source path
            altText: "Feedback Image 3"
        }
    ];

    return (
        <>
            <section id="feature" className="text-center py-12 bg-white">
                <h2 className="text-4xl font-bold mb-4 text-gray-600">Features</h2>
                <div className="grid gap-8 md:grid-cols-3 px-4 md:px-0">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                            <img
                                className="rounded-lg w-full mb-4 "
                                src={feedback.imageSrc}
                                alt={feedback.altText}
                            />
                             <p className="text-lg font-semibold mb-2 text-gray-600">
                            {feedback.title}
                        </p>
                        <p className="text-blue-600 underline">
                            {feedback.highlight}
                        </p>
                        </div>
                    ))}
                </div>
            </section>
        </>            

    );
};

export default Feature;
