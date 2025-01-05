"use client";

import React, { useState, useEffect } from "react";

const SpotifyAuth = () => {
  const [loginUrl, setLoginUrl] = useState("");

  // Use dynamic backend URL
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/spotify/login`);
        const data = await response.json();
        setLoginUrl(data.url);
      } catch (error) {
        console.error("Error fetching Spotify login URL:", error);
      }
    };

    fetchLoginUrl();
  }, [BACKEND_URL]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Spotify Authorization</h1>
      <p className="mb-4">To continue, please log in with your Spotify account.</p>
      {loginUrl ? (
        <a
          href={loginUrl}
          className="px-6 py-3 bg-green-500 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        >
          Login with Spotify
        </a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyAuth;
