import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MatrixRain from "./MatrixRain";
import { FaLock, FaUnlock } from "react-icons/fa"; // Icons for boxes

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "ImageVault - Hide Your Secrets in an Image";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-green-400 font-mono p-5 overflow-hidden bg-black">
      <MatrixRain />

      <div className="relative z-10 text-center w-full max-w-4xl">
        {/* Typing Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-[0_0_20px_rgba(0,255,0,0.9)] mb-12">
          {typedText}
          <span className="animate-blink">|</span>
        </h1>

        {/* Role Selection */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <Link
            to="/sender"
            className="flex items-center gap-3 px-10 py-5 bg-green-400 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.8)] 
                       hover:bg-black hover:text-green-400 hover:shadow-[0_0_30px_rgba(0,255,0,1)] transition transform hover:scale-105"
          >
            <FaLock className="text-2xl" />
            Sender
          </Link>

          <Link
            to="/receiver"
            className="flex items-center gap-3 px-10 py-5 bg-green-400 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.8)] 
                       hover:bg-black hover:text-green-400 hover:shadow-[0_0_30px_rgba(0,255,0,1)] transition transform hover:scale-105"
          >
            <FaUnlock className="text-2xl" />
            Receiver
          </Link>
        </div>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Sender Box */}
          <div className="relative bg-black/50 backdrop-blur-md border border-green-400 rounded-lg p-6 shadow-[0_0_25px_rgba(0,255,0,0.7)]
                          flex flex-col justify-center items-center text-center overflow-hidden hover:shadow-[0_0_35px_rgba(0,255,0,1)] transition-all duration-500">
            <FaLock className="text-4xl mb-3 animate-pulse" />
            <h2 className="text-2xl font-bold mb-3">Sender</h2>
            <p>
              As a <span className="font-bold">Sender</span>, you can encrypt data
              and securely embed it into an image.
            </p>
            <span className="absolute top-0 left-0 w-full h-full border-t border-l border-green-400 animate-glow"></span>
          </div>

          {/* Receiver Box */}
          <div className="relative bg-black/50 backdrop-blur-md border border-green-400 rounded-lg p-6 shadow-[0_0_25px_rgba(0,255,0,0.7)]
                          flex flex-col justify-center items-center text-center overflow-hidden hover:shadow-[0_0_35px_rgba(0,255,0,1)] transition-all duration-500">
            <FaUnlock className="text-4xl mb-3 animate-pulse" />
            <h2 className="text-2xl font-bold mb-3">Receiver</h2>
            <p>
              As a <span className="font-bold">Receiver</span>, you can extract
              encrypted data from an image securely.
            </p>
            <span className="absolute bottom-0 right-0 w-full h-full border-b border-r border-green-400 animate-glow"></span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .animate-glow {
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 5px #0f0; }
          to { box-shadow: 0 0 20px #0f0; }
        }
      `}</style>
    </div>
  );
}
