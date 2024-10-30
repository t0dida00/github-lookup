"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import InititalLoading from "./components/InititalLoading";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to change isLoading to false after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // if (isLoading) {
  //   // Display a loading message or spinner while loading
  //   return <InititalLoading />;
  // }
  return (
    <div className={`min-h-screen flex flex-col gap-8 bg-[#0a192f] justify-center items-center relative `}>
      <InititalLoading />

      <div className={`text-white transition-opacity duration-500 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"} `}>
        text
      </div>
    </div>
  );
}
