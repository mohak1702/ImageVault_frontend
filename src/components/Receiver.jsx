import React, { useState } from "react";
import MatrixRain from "./MatrixRain";

export default function Receiver() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pin, setPin] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle decryption
  const handleDecrypt = async () => {
    if (!imageFile || pin.length !== 4) {
      alert("Please upload an image and enter a 4-digit PIN!");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("pin", pin);

    try {
      const response = await fetch("http://127.0.0.1:5000/decrypt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDecryptedText(data.text); // Display the hidden text
      } else {
        alert("Decryption failed! Check your PIN or image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server!");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-green-400 font-mono p-5 overflow-hidden">
      <MatrixRain /> {/* Background effect */}

      <div className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-[0_0_15px_rgba(0,255,0,0.9)] mb-10">
          Receiver - Retrieve Secret
        </h1>

        {/* Encrypted Image Input */}
        <div className="mb-8">
          <label
            htmlFor="encryptedImage"
            className="block py-3 px-6 bg-gray-800 border border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.7)] cursor-pointer
                       hover:bg-green-500 hover:text-black transition transform hover:scale-105"
          >
            Upload Encrypted Image
          </label>
          <input
            type="file"
            id="encryptedImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Encrypted Preview"
              className="mt-6 mx-auto max-w-full max-h-48 border-2 border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.8)]"
            />
          )}
        </div>

        {/* PIN Input */}
        <input
          type="text"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full py-3 px-4 bg-black text-green-400 border border-green-400 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.8)] text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition mb-6"
        />

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          className="w-full py-3 px-6 text-lg font-bold text-black bg-green-400 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)]
                     hover:bg-black hover:text-green-400 hover:shadow-[0_0_25px_rgba(0,255,0,1)] transition transform hover:scale-105"
        >
          Decrypt & Retrieve Data
        </button>

        {/* Decrypted Output */}
        {decryptedText && (
          <div className="mt-6 p-4 bg-black/50 border border-green-400 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)] text-green-300 text-center break-words">
            {decryptedText}
          </div>
        )}
      </div>
    </div>
  );
}
