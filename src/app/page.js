"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import Search from "./components/Search";

// import InititalLoading from "./components/InititalLoading";
const InititalLoading = dynamic(() => import('./components/InititalLoading'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Set a timeout to change isLoading to false after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 3000ms = 3 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/user?id=${username}`);
  };
  return (
    <div className={`min-h-screen flex flex-col gap-8 bg-[#0a192f] justify-center items-center relative `}>
      <InititalLoading />
      <Search />
    </div>
  );
}
