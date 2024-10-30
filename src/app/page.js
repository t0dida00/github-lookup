"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

// import InititalLoading from "./components/InititalLoading";
const InititalLoading = dynamic(() => import('./components/InititalLoading'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to change isLoading to false after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 3000ms = 3 seconds

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

      <div className={`search-container ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
    </div>
  );
}
