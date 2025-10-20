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
  status: "pending" | "approved" | "flagged" | "rejected";
  moderation_stage?: string;
  toxicity: number;
  nsfw_content: boolean;
  violence: boolean;
  image_replaced_by_ai?: boolean;
  uploaddate: string;
  imageUrl?: string;
  summary?: string;
  reasoning?: string;
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
    <div className="max-w-[780px] w-[100%] mx-auto flex flex-wrap justify-around gap-6">
      {!loading && posts?.length === 0 && (
        <div className="w-full text-center py-10">
          <p className="text-gray-500 text-lg">No submissions found :(</p>
        </div>
      )}
      {posts?.map((p) => (
        <Post
          key={p.id}
          content={p.content}
          image={p.imageUrl}
          status={p.status ?? "approved"}
          moderation_stage={p.moderation_stage}
          toxicity={p.toxicity * 100}
          nsfw_content={p.nsfw_content}
          violence={p.violence}
          image_replaced_by_ai={p.image_replaced_by_ai}
          timestamp={p.uploaddate}
          summary={p.summary}
          reasoning={p.reasoning}
        />
      ))}
    </div>
  );
}
