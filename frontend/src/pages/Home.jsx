import React from "react";
import Feed from "../components/Feed";




export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-10rem)]">
      <Feed />
    </div>
  );
}
