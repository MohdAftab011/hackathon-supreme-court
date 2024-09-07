import React from 'react';

const HomePage = () => {
    return (
        <>
        <div id="home" className="bg-gray-50">
            

            <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                        <div>
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">A special credit card made for Developers.</h1>
                                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.</p>

                                
                            </div>

                            {/* View PDF and Search buttons */}
                            <div className="mt-12 flex justify-center space-x-4 lg:justify-start">
                                <a href="/upload" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">View PDF</a>
                                <a href="/search" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Search</a>
                            </div>

                            <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                            
                            </div>
                        </div>

                        <div>
                            <img className="w-full" src="/hero-img.png" alt="Illustration" />
                        </div>
                    </div>

            
                </div>
            </section>
        </div>
        
        
        </>
        
    );
};

export default HomePage;
