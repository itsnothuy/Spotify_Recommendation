"use client";

import React from "react";

/**
 * Renders the animated title text (fade-in per character).
 * 
 * @param {string} text - The string to animate.
 * @param {number} textDelay - Milliseconds between each character's animation.
 */
const Tile = ({ text, textDelay = 50 }) => {
  return (
    <h1 className="text-white font-bold font-sans text-center 
                   md:text-3xl lg:text-3xl xl:text-5xl text-2xl"
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-fade-in text-animation"
          style={{
            animationDelay: `${index * textDelay}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default Tile;
