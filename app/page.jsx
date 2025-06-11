"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  useCreatePostsMutation,
  useGetPostsQuery,
} from "@/services/jsonPlaceHolderApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [newPost, setNewPost] = useState({ body: "", title: "" });
  const { data, error, isLoading } = useGetPostsQuery(page);

  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostsMutation();

  const handleCreatePost = async () => {
    await createPost(newPost);
  };
  if (isLoading)
    return (
      <div className="h-[100vh] w-full flex items-center justify-center animate-spin">
        <Loader2 size={30} />
      </div>
    );
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
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleCreatePost}
        >
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
      <div className="flex justify-center w-full py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              />
            </PaginationItem>
            <PaginationItem>{page}</PaginationItem>

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => setPage((prev) => Math.min(prev + 1, 10))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
