"use client";

import React, { useEffect, useState } from 'react';

// Replace this with your actual backend URL if running on a different port or domain.
const BACKEND_URL = "http://localhost:58544"; 

const TextAnimation = () => {
  const text = "Fancy Text Animation"; // Replace this with your desired text
  const [showSearchBar, setShowSearchBar] = useState(false);

  // NEW: track user input and recommended songs
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [mood, setMood] = useState("");

  useEffect(() => {
    // Show the search bar after the text animation finishes
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, text.length * 50 + 600); // Delay based on text animation duration

    return () => clearTimeout(timer);
  }, [text]);

  // NEW: function to handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      // Send a POST request to your backend route. 
      // In the earlier example, we used "/api/spotify/mood".
      const response = await fetch(`${BACKEND_URL}/api/spotify/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: searchTerm }),
      });
      const data = await response.json();

      // data should look like: { mood: "...", recommendedSongs: [...] }
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
              animationDelay: `${index * 50}ms`, // Smoother delay for each character
            }}
          >
            {char === " " ? "\u00A0" : char} {/* Handles spaces */}
          </span>
        ))}
      </h1>
      {/* Search Bar (shown after animation) */}
      {showSearchBar && (
        <div className="mt-8 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { // Changed to onKeyDown
                if (e.key === "Enter") {
                  handleSearch(); // Trigger search on Enter key
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


      {/* Show Mood & Recommended Songs (if any) */}
      {mood && (
        <p className="text-white mt-4">
          Detected Mood: <strong>{mood}</strong>
        </p>
      )}

      {recommendedSongs.length > 0 && (
        <div className="mt-6 w-full max-w-md text-white">
          <h2 className="text-xl mb-2">Recommended Songs:</h2>
          {recommendedSongs.map((song) => (
            <div
              key={song.spotify_id}
              className="flex items-center border-b border-gray-700 py-2"
            >
              {/* Album Cover */}
              {song.album_art_url && (
                <img
                  src={song.album_art_url}
                  alt={song.title}
                  className="w-16 h-16 object-cover mr-4"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{song.title}</span>
                <span className="text-sm text-gray-400">{song.artist}</span>
                {/* Optional: preview audio if available */}
                {song.preview_url && (
                  <audio
                    controls
                    src={song.preview_url}
                    className="mt-1"
                    style={{ width: "200px" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TextAnimation;
