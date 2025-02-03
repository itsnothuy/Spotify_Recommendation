// export default MusicList;
"use client";
import React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const MusicList = ({ mood, recommendedSongs, fetched, onBack, onSaveToLikedSongs }) => {
  return (
    <>
      {fetched && recommendedSongs.length > 0 && (
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          {/* If not already in your <head>, ensure you have:
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          */}

          {mood && (
            <>
              {/* Headline: smaller on narrow screens, bigger on medium/large */}
              <h1 className="text-white font-bold font-sans text-center animate-slide-up text-2xl sm:text-3xl md:text-4xl">
                Here's your curated list
              </h1>

              {/* Subtext: also smaller on narrow screens */}
              <p className="text-white mt-3 text-sm sm:text-base md:text-lg">
                You seem to be: <strong>{mood}</strong>
              </p>
            </>
          )}

          {/* Scrollable container for the list. On smaller screens, narrower & shorter. */}
          <div
            className="
              w-full 
              max-w-md sm:max-w-xl
              mt-6 
              overflow-y-auto
              p-4
              border border-transparent
            "
            style={{
              maxHeight: "70vh", // Limits height to 70% of the viewport, so heading/back button are visible
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {recommendedSongs.map((song, index) => (
              <a
                key={index}
                href="#"
                className="
                  w-full flex items-center 
                  bg-white border border-gray-200 rounded-2xl shadow 
                  hover:bg-gray-100/70 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700
                  mb-3 mt-2 duration-500 opacity-0 animate-slide-up
                "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Album Art: smaller on mobile, bigger on md */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ml-3 flex-shrink-0">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={song.album_art_url}
                    alt={song.title}
                  />
                  <img
                    className="rounded-full object-cover"
                    src="/logo.jpg"
                    alt="Spotify Logo"
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "8px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#000",
                      boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>

                {/* Text Container: flex-1 + truncate to prevent pushing the plus icon */}
                <div className="flex-1 flex flex-col p-4 leading-normal overflow-hidden">
                  <h5
                    className="
                      text-sm sm:text-base md:text-lg
                      font-bold tracking-tight text-gray-900 dark:text-white
                      mb-1
                      truncate whitespace-nowrap overflow-hidden text-ellipsis
                    "
                  >
                    {song.title}
                  </h5>
                  <p
                    className="
                      text-xs sm:text-sm md:text-base font-normal
                      text-gray-700 dark:text-gray-400
                      truncate whitespace-nowrap overflow-hidden text-ellipsis
                    "
                  >
                    Artist: {song.artist}
                  </p>
                  <p
                    className="
                      text-xs sm:text-sm md:text-base font-normal
                      text-gray-700 dark:text-gray-400 mt-1
                      truncate whitespace-nowrap overflow-hidden text-ellipsis
                    "
                  >
                    Album: {song.album}
                  </p>
                </div>

                {/* Plus Button: pinned on the far right, won't shrink */}
                <div className="p-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      onSaveToLikedSongs(song.spotify_id);
                    }}
                    className="
                      flex items-center justify-center
                      w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8
                      rounded-full hover:bg-white hover:text-gray-800 text-white
                    "
                  >
                    <PlusCircledIcon className="w-full h-full" />
                  </button>
                </div>
              </a>
            ))}
          </div>

          {/* Back button below the list */}
          <button
            className="text-white mt-3 items-center"
            onClick={onBack}
          >
            <u>Back</u>
          </button>
        </div>
      )}
    </>
  );
};

export default MusicList;
