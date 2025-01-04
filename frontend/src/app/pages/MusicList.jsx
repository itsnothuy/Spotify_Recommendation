"use client";

import React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";


const MusicList = ({ mood, recommendedSongs, fetched, onBack }) => {
  return (
    <>
      
        
      {fetched && recommendedSongs.length > 0 && (
        <div className="absolute container mt-4 flex flex-col items-center justify-center ">
          {mood && (
            <>
            <h1 className=" text-white text-5xl font-bold font-sans text-center animate-slide-up">Here's your curated list</h1>
            <p className="text-white mt-4 items-center">
                You seem to be: <strong>{mood}</strong>
            </p>
            </>
        )}
        <div
            className="overflow-hidden p-4"
            style={{ maxHeight: "700px", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {recommendedSongs.map((song, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow
                  md:flex-row md:max-w-xl hover:bg-gray-100/70 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700
                  mb-3 mt-2 duration-500 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`} } // optional stagger delay
              >
                <div className="relative w-24 h-22 ml-3 flex-shrink-0">
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
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#000",
                      boxShadow: "0 2px 3px rgba(0,0,0,0.2)"
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5
                    className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{
                      display: "inline-block",
                      maxWidth: "300px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span
                      className={song.title.length > 30 ? "inline-block animate-scroll-text" : ""}
                      style={{ animationDelay: "5s" }}
                    >
                      {song.title}
                    </span>
                  </h5>

                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    Artist: {song.artist}
                  </p>

                  <p
                    className="font-normal text-gray-700 dark:text-gray-400"
                    style={{
                      display: "inline-block",
                      maxWidth: "300px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
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

          <button className="text-white mt-2 items-center" onClick={onBack}>
              <u>Back</u>
          </button>
        </div>
      )}
    </>
  );
};

export default MusicList;
