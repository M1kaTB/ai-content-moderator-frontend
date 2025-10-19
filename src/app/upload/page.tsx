"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadSubmission } from "@/services/submissionsService";
import ModerationProgress from "@/components/ModerationProgress/ModerationProgress";

export default function UploadPage() {
  const router = useRouter();

  const [type, setType] = useState<"text" | "image">("text");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isModerating, setIsModerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showError = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });

  const showSuccess = (message: string) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce,
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setType("image");
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      showError("Please enter text or upload an image before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await uploadSubmission({
        type: image ? "image" : "text",
        content: content.trim(),
        image,
      });

      showSuccess("Upload successful! Moderating your content...");
      setSubmissionId(result.id);
      setIsModerating(true);
      setContent("");
      setImage(null);
      setPreview(null);
      setType("text");
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleModerationComplete = () => {
    setIsModerating(false);
    router.push("/");
  };

  if (isModerating && submissionId) {
    return (
      <ModerationProgress
        submissionId={submissionId}
        onComplete={handleModerationComplete}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <form
        onSubmit={handleUpload}
        className="max-w-md w-full mx-auto min-h-96 flex flex-col items-center justify-start p-5 rounded-2xl bg-component-background gap-5"
      >
        <div className="flex flex-col items-center mb-5">
          <img src="/logo.png" alt="main logo" className="max-w-25" />
          <h1 className="text-2xl font-bold">Create a Submission</h1>
        </div>

        <textarea
          name="content"
          placeholder="Write something (optional for images)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-background outline-0 rounded-lg p-3 w-full resize-none min-h-[100px]"
          disabled={isLoading}
        />

        <div className="w-full flex flex-col gap-2">
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg cursor-pointer transition-colors duration-150 disabled:opacity-50
              ${
                image
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-secondary-color hover:bg-secondary-color-hovered"
              }
            `}
          >
            {image ? "Change Image ✓" : "Choose Image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
          {image && (
            <p className="text-sm text-gray-400 truncate text-center">
              Selected: {image.name}
            </p>
          )}
        </div>

        {preview && (
          <div className="w-full flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-lg mt-2 shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-primary-color-hovered disabled:opacity-50"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
