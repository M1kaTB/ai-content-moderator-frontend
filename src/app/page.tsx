"use client";
import Image from "next/image";
import { logout } from "./logout/actions";
import { useState } from "react";

export default function Home() {
  const [chosenOption, setChosenOption] = useState<
    "yourUploads" | "allUploads"
  >("yourUploads");
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-4 pb-20 px-8 sm:pt-6 sm:px-20 h-[200vh]">
      {/* <form action={logout}>
        <button type="submit">logout</button>
      </form> */}
      <div className="w-[80%] flex self-start fixed rounded-2xl overflow-hidden">
        <button
          className="border-r-2 bg-component-background w-[50%] h-14 rounded-l-2xl cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered"
          onClick={() => setChosenOption("yourUploads")}
        >
          Your Uploads
        </button>
        <button
          className=" bg-component-background w-[50%] h-14 rounded-r-2xl cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered"
          onClick={() => setChosenOption("allUploads")}
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
    </div>
  );
}
