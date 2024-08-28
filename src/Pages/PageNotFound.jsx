import React from 'react';
import { AlertCircle, Home } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-lg mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 mb-6">
            It seems you've stumbled upon a broken link or entered a URL that doesn't exist on our site.
          </p>
          <a 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;