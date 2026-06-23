import axios from 'axios';
import React, { useEffect, useState } from 'react';

function News() {
    const [politicalNews, setPoliticalNews] = useState([]);
    const [businessNews, setBusinessNews] = useState([]);
    const [sportNews, setSportNews] = useState([]);
    const [technologyNews, setTechnologyNews] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('general'); // Default category is political

    const fetchArticles = async (category) => {
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    category: category,
                    apiKey: '6c4fe9d847df458aa6b4e7f1ebff8d87'
                }
            });
            if (category === 'general') {
                setPoliticalNews(response.data.articles);
            } else if (category === 'sports') {
                setSportNews(response.data.articles);
            } else if (category === 'technology') {
                setTechnologyNews(response.data.articles);
            } else if (category === 'business') {
                setBusinessNews(response.data.articles);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchArticles(currentCategory); // Fetch articles based on the selected category
    }, [currentCategory]);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category); // Set the current category to fetch news of that category
    };

    const getArticlesForCategory = () => {
        switch (currentCategory) {
            case 'general':
                return politicalNews;
            case 'sports':
                return sportNews;
            case 'technology':
                return technologyNews;
            case 'business':
                return businessNews;
            default:
                return politicalNews;
        }
    };

    return (
        <div className="p-2 lg:p-8 mb-12">
            {/* Button Section */}
            <div className="mb-4 flex justify-start space-x-2 text-xs lg:text-base p-6">
                <button
                    onClick={() => handleCategoryClick('general')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                    Political
                </button>
                <button
                    onClick={() => handleCategoryClick('sports')}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all"
                >
                    Sports
                </button>
                <button
                    onClick={() => handleCategoryClick('technology')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition-all"
                >
                    Technology
                </button>
                <button
                    onClick={() => handleCategoryClick('business')}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all"
                >
                    Business
                </button>
            </div>

            {/* News Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
                {getArticlesForCategory().map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-100 dark:bg-gray-950 dark:border-2 dark:border-gray-200">
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-64 object-cover transition-all duration-300 transform hover:scale-110"
                            />
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 dark:text-blue-400 transition-all duration-200">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 mt-2 dark:text-white">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-blue-500 hover:text-blue-700 text-lg font-medium"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
