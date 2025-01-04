"use client";

import React from "react";

/**
 * Renders the animated title text (fade-in per character).
 * 
 * @param {string} text - The string to animate.
 * @param {number} textDelay - Milliseconds between each character's animation.
 */
const TitleAnimation = ({ text, textDelay = 50 }) => {
  return (
    <h1 className="text-blue text-4xl font-bold font-sans text-center"
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

export default TitleAnimation;
