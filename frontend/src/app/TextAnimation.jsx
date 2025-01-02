"use client";

import React, { useEffect, useState } from 'react';
import { PlusCircledIcon } from '@radix-ui/react-icons';


const BACKEND_URL = "http://localhost:54132"; 

const TextAnimation = () => {
  const text = "Fancy Text Animation";
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [mood, setMood] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, text.length * 50 + 600);

    return () => clearTimeout(timer);
  }, [text]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/spotify/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: searchTerm }),
      });
      const data = await response.json();

      if (data.error) {
        console.error("Backend error:", data.error);
        return;
      }

      setMood(data.mood || "");
      setRecommendedSongs(data.recommendedSongs || []);
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-white text-4xl font-sans text-center">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fade-in text-animation"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {showSearchBar && (
        <div className="mt-8 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full py-3 pl-4 pr-10 text-white bg-gray-800 rounded-full 
                         opacity-0 animate-fade-in-search focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={handleSearch}
            >
              🔍
            </button>
          </div>
        </div>
      )}

      {mood && (
        <p className="text-white mt-4">
          Detected Mood: <strong>{mood}</strong>
        </p>
      )}

      {recommendedSongs.length > 0 && (
        <div className="container mt-4 flex flex-col items-center justify-center">
          <div className="overflow-auto p-4" style={{ maxHeight: "700px", scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {recommendedSongs.map((song, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3 hover:scale-105 hover:p-2 hover:rounded-lg transition-transform duration-200"
              >
                <div className="relative w-28 h-28 ml-2 flex-shrink-0">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={song.album_art_url}
                    alt={song.title}
                  />

                  <img
                      className='rounded-full object-cover'
                      src="/logo.jpg"
                      alt="Spotify Logo"
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '4px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#000',
                        boxShadow: '0 2px 3px rgba(0,0,0,0.2)'
                      }}
                    />
                  
                  
                </div>

                  

                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{
                      display: 'inline-block',
                      maxWidth: '300px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <span className={song.title.length > 30 ? 'inline-block animate-scroll-text' : ''}
                      style={{ animationDelay: '5s' }}
                    >
                      {song.title}
                    </span>
                  </h5>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    Artist: {song.artist}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Album: {song.album}
                  </p>
                </div>
                <div className="p-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      console.log(`Add song: ${song.title}`);
                    }}
                    className="flex items-center justify-center w-8 h-8
                     rounded-full hover:bg-white hover:text-gray-800 text-white"
                  >
                    <PlusCircledIcon className="w-12 h-12" />
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default TextAnimation;
