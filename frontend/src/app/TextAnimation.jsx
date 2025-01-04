"use client";

import React, { useEffect, useState } from "react";
import MusicList from "./pages/MusicList";
import LoadingPage from "./pages/LoadingPage";
import TitleAnimation from "./pages/TitleAnimation";
import SearchBar from "./SearchBar";
import GradientBackground from "./GradientBackground";



const BACKEND_URL = "http://localhost:61834";

export default function TextAnimation() {
  const text = "MusicFinder ♪";
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [mood, setMood] = useState("");
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NEW: This controls whether to hide the title & search bar
  const [hideTitleAndSearch, setHideTitleAndSearch] = useState(false);

  // Animate the title, then reveal the search bar
  useEffect(() => {
    console.log("useEffect for showSearchBar called");
    const timer = setTimeout(() => {
      console.log("Timeout triggered, setting showSearchBar to true");
      setShowSearchBar(true);
    }, text.length * 50 + 600);
  
    return () => clearTimeout(timer);
  }, [text]);
  // Handle user input submission
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      // Hide title & search bar once user submits
      setHideTitleAndSearch(true);
      setIsLoading(true);

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
      setFetched(true);
    } catch (error) {
      console.error("Error calling backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If we haven't fetched or we're loading → use "default".
  // Once mood is fetched → use that mood.
  const currentTheme = !fetched || isLoading ? "default" : mood;
  


  // If you want to set data-theme on <html>:
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className="fixed h-screen flex flex-col items-center justify-center inset-0" data-theme={currentTheme} >
      <GradientBackground/>
      {/* Only show the Title & SearchBar if hideTitleAndSearch is false */}
      <div className="z-30">
      {!hideTitleAndSearch && (
        <>
        {/* {you should add the default background here} */}
        <div className="absolute"
          style={{
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -60%)",
          }}
        > 
          <TitleAnimation text={text} />
        </div>


        {/* Conditionally show search bar after the title animation */}
        {showSearchBar && (
          <div
            className="absolute w-full sm:w-[24rem] md:w-[28rem] lg:w-[32rem]"
            style={{
              top: "37%",
              left: "50%",
              transform: "translate(-45%, -20%)",
            }}
          >
          <SearchBar
            showSearchBar={showSearchBar}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          </div>
        )}
        
        </>
      )}

      {/* If we’re loading, show loading page; otherwise show MusicList */}
      {/* {you should still add the default background here} */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
        {/* {you add the background based on mood that fetched from backend here} */}
        <MusicList mood={mood} recommendedSongs={recommendedSongs} fetched={fetched} /></>
        
      )}
      </div>
    </div>
    
  );
}
