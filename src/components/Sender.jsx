import React, { useState } from "react";
import MatrixRain from "./MatrixRain";

export default function Sender() {
  const [file, setFile] = useState(null); // store actual file
  const [imagePreview, setImagePreview] = useState(null);
  const [pin, setPin] = useState("");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleEncrypt = async () => {
    if (!file || !text || pin.length !== 4) {
      alert("Please provide image, secret text, and a 4-digit PIN!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); 
    formData.append("text", text); 
    formData.append("pin", pin); 

    try {
      const response = await fetch("https://imagevault-backend.onrender.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // Trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "encrypted_image.png";
        a.click();
        setSuccess("✅ Encryption successful! Image downloaded.");
      } else {
        alert("Encryption failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend!");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-green-400 font-mono p-5 overflow-hidden">
      <MatrixRain />

      <div className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-[0_0_15px_rgba(0,255,0,0.9)] mb-10">
          Sender - Encrypt Your Secret
        </h1>

        {/* Image Input */}
        <div className="mb-8">
          <label
            htmlFor="imageInput"
            className="block py-3 px-6 bg-gray-800 border border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.7)] cursor-pointer
                       hover:bg-green-500 hover:text-black transition transform hover:scale-105"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-6 mx-auto max-w-full max-h-48 border-2 border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.8)]"
            />
          )}
        </div>

        {/* Text to Encrypt */}
        <textarea
          placeholder="Enter text to encrypt..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 h-32 bg-black border-2 border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.8)] text-green-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition mb-6"
        />

        {/* PIN Input */}
        <input
          type="text"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full py-3 px-4 bg-black text-green-400 border border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.8)] text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition mb-6"
        />

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          className="w-full py-3 px-6 text-lg font-bold text-black bg-green-400 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)]
                     hover:bg-black hover:text-green-400 hover:shadow-[0_0_25px_rgba(0,255,0,1)] transition transform hover:scale-105"
        >
          Encrypt & Hide Data
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-6 p-4 bg-black/50 border border-green-400 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)] text-green-300 text-center">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
