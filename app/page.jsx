"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useCreatePostsMutation,
  useGetPostsQuery,
} from "@/services/jsonPlaceHolderApi";
import { useState } from "react";

export default function Home() {
  const [newPost, setNewPost] = useState({ body: "", title: "" });
  const { data, error, isLoading } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostsMutation();

    const handleCreatePost = async () => {
      await createPost(newPost)
    }
  if (isLoading) return <p>loading...</p>;
  if (createError) return <p>There was an error creating the post</p>;
  if (error) return <p>There was an error </p>;

  return (
    <div className="py-8 px-6 bg-slate-50">
      <header className="flex items-center justify-center text-6xl pb-4">
        React - Redux
      </header>
      <div className="space-y-4 pb-4 ">
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          className="bg-white"
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Input
          type="text"
          name="body"
          id="body"
          placeholder="body"
          className="bg-white"
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, body: e.target.value }))
          }
        />
        <Button variant="destructive" className="cursor-pointer" onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-4 mx-auto">
        {data.map((post, i) => (
          <Card
            key={i}
            className="hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300"
          >
            <CardHeader>
              <CardTitle>
                {post.id}.{post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{post.body}</p>
            </CardContent>
          </Card>
          // <p key={i}>{post.title}</p>
        ))}
      </div>
    </div>
  );
}
