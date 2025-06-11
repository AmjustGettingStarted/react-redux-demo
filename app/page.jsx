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
  const [newPost, setNewPost] = useState({ name: "", email: "" });
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
          name="name"
          id="name"
          placeholder="name"
          className="bg-white"
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="bg-white"
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, email: e.target.value }))
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
            className="hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-500 hover:bg-slate-200 bg-slate-100 "
          >
            <CardHeader>
              <CardTitle className="truncate flex flex-col space-y-1">
                <p className="font-bold text-2xl">
                  {post.id}.{post.name}
                </p>
                <p className="font-medium text-lg">{post.email}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="line-clamp-3">
              <p className="text-slate-600 ">{post.body}</p>
            </CardContent>
          </Card>
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
                onClick={() => setPage((prev) => Math.min(prev + 1, 45))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
