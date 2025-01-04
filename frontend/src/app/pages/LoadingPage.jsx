"use client";

import React, { useEffect, useState } from "react";

const LoadingPage = () => {
  const text = "Loading ...";
  const [animationComplete, setAnimationComplete] = useState(false);

  // Trigger the wave animation after the fade-in finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true); // Switch to wave animation
    }, 4000); // 2s after fade-in

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <h1 className="text-white font-bold text-5xl font-sans text-center"
      style={{
        top: "30%",
        left: "50%",
        transform: "translate(5%, -250%)",
      }}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block ${
              animationComplete
                ? "animate-wave-pause" // Wave animation
                : "opacity-0 animate-fade-in" // Fade-in
            }`}
            style={{
              animationDelay: `${index * 0.3}s`,
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
