"use client"
import { useGetPostsQuery } from "@/services/jsonPlaceHolderApi";

export default function Home() {
  const { data, error, isLoading } = useGetPostsQuery();
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>There was an error </p>;
  console.log(data);

  return (
    <div>
      <h1>Hello</h1>
      <div>{data.map((post,i)=>(
        <p key={i}>{post.title}</p>
      ))}</div>
    </div>
  );
}
