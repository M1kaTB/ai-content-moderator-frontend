"use client";
import React from "react";

interface HeaderProps {
  chosenOption: "yourUploads" | "allUploads";
  onOptionChange: (option: "yourUploads" | "allUploads") => void;
}

export default function Header({ chosenOption, onOptionChange }: HeaderProps) {
  return (
    <div
      className="
        max-w-[600px] w-[75%] sm:w-[95%] 
        flex left-[50%] translate-x-[-50%] 
        self-start fixed 
        rounded-2xl overflow-hidden
        top-22 md:top-5
      "
    >
      <button
        className="border-r-2 bg-secondary-color w-[50%] h-14 rounded-l-2xl cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered"
        onClick={() => onOptionChange("yourUploads")}
      >
        Your Uploads
      </button>
      <button
        className="bg-secondary-color w-[50%] h-14 rounded-r-2xl cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered"
        onClick={() => onOptionChange("allUploads")}
      >
        All Uploads
      </button>
      <div
        className="absolute bottom-0 h-[2px] bg-primary-color rounded transition-all duration-300"
        style={{
          width: "50%",
          left: chosenOption === "yourUploads" ? "0%" : "50%",
        }}
      ></div>
    </div>
  );
}
