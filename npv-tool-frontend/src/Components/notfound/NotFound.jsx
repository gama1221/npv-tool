import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg">Oops! The page you're looking for was not found.</p>
      </div>
    </div>
  );
};

export default NotFound;