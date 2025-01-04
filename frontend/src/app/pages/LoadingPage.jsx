"use client";

import React, { useEffect, useState } from "react";

const LoadingPage = () => {
  const text = "Loading ...";
  const [animationComplete, setAnimationComplete] = useState(false);

  // Trigger the wave animation after the fade-in finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true); // Switch to wave animation
    }, 5000); // 2s after fade-in

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-white/50 text-4xl font-sans text-center">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block ${
              animationComplete
                ? "animate-wave-pause" // Wave animation
                : "opacity-0 animate-fade-in" // Fade-in
            }`}
            style={{
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default LoadingPage;
