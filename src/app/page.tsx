"use client";
import Header from "@/components/Header/Header";
import Logout from "@/components/Logout/Logout";
import Posts from "@/components/Posts/Posts";
import UploadButton from "@/components/UploadButton/UploadButton";
import { useState } from "react";

export default function Home() {
  const [option, setOption] = useState<"yourUploads" | "allUploads">(
    "yourUploads"
  );
  return (
    <div className="font-sans items-center justify-items-center min-h-screen pt-16 pb-20 px-8 md:pt-6 sm:px-20">
      <Logout />
      <Header chosenOption={option} onOptionChange={setOption} />
      <div className="w-[100%] mt-24">
        <Posts type={option} />
      </div>
      <UploadButton />
    </div>
  );
}
