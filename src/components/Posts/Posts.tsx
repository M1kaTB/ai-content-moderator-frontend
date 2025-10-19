"use client";
import { useEffect, useState } from "react";
import Post from "./Post/Post";
import {
  getPersonalSubmissions,
  getSubmissions,
} from "@/services/submissionsService";

export interface Post {
  id: string;
  user: {
    id: string;
  };
  content: string;
  uploaded: "approved" | "flagged" | "rejected";
  toxicity: number;
  nsfw_content: boolean;
  violence: boolean;
  uploaddate: string;
  imageUrl?: string;
}

interface PostsProps {
  type: "yourUploads" | "allUploads";
}

export default function Posts({ type }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data =
          type == "allUploads"
            ? await getSubmissions()
            : await getPersonalSubmissions();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [type]);

  return (
    <div className="w-[90%] mx-auto flex flex-wrap justify-around gap-6">
      {posts?.map((p) => (
        <Post
          key={p.id}
          content={p.content}
          image={p.imageUrl}
          uploaded={p.uploaded}
          toxicity={p.toxicity * 100}
          nsfw_content={p.nsfw_content}
          violence={p.violence}
          timestamp={p.uploaddate}
        />
      ))}
    </div>
  );
}
