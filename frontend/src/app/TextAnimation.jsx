"use client";

import React, { useEffect, useState } from 'react';

const TextAnimation = () => {
  const text = "Fancy Text Animation"; // Replace this with your desired text
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // Show the search bar after the text animation finishes
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, text.length * 50 + 600); // Delay based on text animation duration

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-white text-4xl font-sans text-center">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fade-in text-animation"
            style={{
              animationDelay: `${index * 50}ms`, // Smoother delay for each character
            }}
          >
            {char === " " ? "\u00A0" : char} {/* Handles spaces */}
          </span>
        ))}
      </h1>
      {showSearchBar && (
        <div className="mt-8 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-4 pr-10 text-white bg-gray-800 rounded-full opacity-0 animate-fade-in-search focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              🔍
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnimation;
