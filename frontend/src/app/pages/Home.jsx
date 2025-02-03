"use client";

import React, { useEffect, useState } from "react";
import MusicList from "../components/MusicList";
import LoadingPage from "./LoadingPage";
import Tile from "../components/Title";
import SearchBar from "../components/SearchBar";
import GradientBackground from "../GradientBackground";


export default function Home() {
  const text = "MusicFinder ♪";
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [mood, setMood] = useState("");
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(""); // Store Spotify Access Token


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


  // Fetch the access token when the component loads
  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     try {
  //       const response = await fetch(`${BACKEND_URL}/api/spotify/refresh-token`, {
  //         credentials: 'include',
  //       });
  //       const data = await response.json();
  //       console.log(`Access token ${accessToken}`)
  //       setAccessToken(data.access_token); // Store the token for later use
  //     } catch (error) {
  //       console.error("Error fetching Spotify access token:", error);
  //     }
  //   };
  //   fetchAccessToken();
  // }, []);


  // On mount:
  // useEffect(() => {
  //   const checkSpotifyAuth = async () => {
  //     try {
  //       const response = await fetch(`${BACKEND_URL}/api/spotify/me`, {
  //         credentials: 'include',
  //       });
  //       // If response is OK, user is logged in
  //       const data = await response.json();
  //       // data might have user profile info or a boolean "isAuthenticated"
  //     } catch (error) {
  //       console.error("User not authenticated", error);
  //     }
  //   };
  //   checkSpotifyAuth();
  // }, []);


  // Function to save track to "Liked Songs"
  const onSaveToLikedSongs = async (trackId) => {
    try {
      // 1) Check if user is logged in
      const meResponse = await fetch(`/api/spotify/me`, {
        credentials: 'include',
      });
      if (!meResponse.ok) {
        // If 401 or anything else, we do login
        window.location.href = `/api/spotify/login`;
        return;
      }

      // 2) If user is logged in, proceed to like the track
      const response = await fetch(`/api/spotify/likeTrack`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackId }),
        credentials: 'include', // send session cookie
      });

      const data = await response.json();
      if (data.success) {
        alert("Song added to 'Liked Songs' successfully!");
      } else {
        alert("Failed to add song to 'Liked Songs'.");
      }
    } catch (error) {
      console.error("Error saving song to Liked Songs:", error);
      alert("Error adding song to 'Liked Songs'.");
    }
  };


  // Handle user input submission
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      // Hide title & search bar once user submits
      setHideTitleAndSearch(true);
      setIsLoading(true);

      const response = await fetch(`/api/spotify/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: searchTerm }),
        credentials: 'include',
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

  // A function to reset state so we go "back" to the initial view
  const handleBack = () => {
    setHideTitleAndSearch(false);
    setShowSearchBar(false);
    setSearchTerm("");
    setRecommendedSongs([]);
    setFetched(false);
    setMood("");
    setIsLoading(false);

    // If you also want to re-trigger the Title animation:
    // (1) you could do it by re-running that setTimeout code, 
    // or simply rely on re-mount. For instance:
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, text.length * 50 + 600);
    // Clear that if user leaves
    return () => clearTimeout(timer);
  };

  // return (
  //   <div className="fixed inset-0 h-screen flex flex-col items-center justify-center" data-theme={currentTheme} >
  //     <GradientBackground/>
  //     {/* Only show the Title & SearchBar if hideTitleAndSearch is false */}

  //     {!hideTitleAndSearch && (
  //       <>
  //       {/* {you should add the default background here} */}
  //       <div className="absolute top-[35%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
  //       > 
  //         <Tile text={text} />
  //       </div>


  //       {/* Conditionally show search bar after the title animation */}
  //       {showSearchBar && (
  //         <div
  //           className="absolute top-[40%] left-[50%] transform -translate-x-[50%] -translate-y-[20%] w-full sm:w-[24rem] md:w-[28rem] lg:w-[32rem]"
  //         >
  //         <SearchBar
  //           showSearchBar={showSearchBar}
  //           searchTerm={searchTerm}
  //           setSearchTerm={setSearchTerm}
  //           handleSearch={handleSearch}
  //         />
  //         </div>
  //       )}
  //       </>
  //     )}

  //     {/* If we’re loading, show loading page; otherwise show MusicList */}
  //     {isLoading ? (
  //       <LoadingPage/>
  //     ) : (
  //       <MusicList 
  //         mood={mood} 
  //         recommendedSongs={recommendedSongs} 
  //         fetched={fetched} 
  //         onBack={handleBack}
  //         onSaveToLikedSongs={onSaveToLikedSongs}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <>
      {/* 1) Outer container: relative, min-h-screen so we can scroll if needed */}
      <div className="relative min-h-screen w-full" data-theme={currentTheme}>
        {/* 2) Gradient background absolutely behind everything, z-[-1] */}
        <div className="absolute inset-0 -z-10">
          <GradientBackground />
        </div>

        {/** 
         * 2) "Hero" container for Title & SearchBar 
         *    Absolutely positioned so it appears centered like before
         */}
        {!hideTitleAndSearch && (
          <div className="relative h-screen">
            {/* The Title */}
            <div
              className="
                absolute 
                top-[35%] left-[50%] 
                transform -translate-x-[50%] -translate-y-[50%]
              "
            >
              <Tile text={text} />
            </div>

            {/* The SearchBar (if it's time to show) */}
            {showSearchBar && (
              <div
                className="
                  absolute 
                  top-[40%] left-[50%]
                  transform -translate-x-[50%] -translate-y-[20%]
                  w-full sm:w-[24rem] md:w-[28rem] lg:w-[32rem]
                "
              >
                <SearchBar
                  showSearchBar={showSearchBar}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />
              </div>
            )}
          </div>
        )}

        {/* 3) Main content in normal flow */}
        <div className="container mx-auto px-4 py-6 flex flex-col items-center">
          {/* Title & Search */}
          {/* {!hideTitleAndSearch && (
            <>
              <Tile text={text}/>
              {showSearchBar && (
                <div className="mt-4 w-full sm:w-[24rem] md:w-[28rem] lg:w-[32rem]">
                  <SearchBar
                    showSearchBar={showSearchBar}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                  />
                </div>
              )}
            </>
          )} */}

          {/* Loading or Music list */}
          {isLoading ? (
            <LoadingPage />
          ) : (
            <MusicList
              mood={mood}
              recommendedSongs={recommendedSongs}
              fetched={fetched}
              onBack={handleBack}
              onSaveToLikedSongs={onSaveToLikedSongs}
            />
          )}
        </div>
      </div>
    </>
  );

}
