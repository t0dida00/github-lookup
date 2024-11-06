"use client"
import dynamic from 'next/dynamic'
import Search from "./components/Search";

import InititalLoading from "./components/InititalLoading";
// const InititalLoading = dynamic(() => import('./components/InititalLoading'), { ssr: false })

export default function Home() {

  return (
    <div className={`min-h-screen flex flex-col gap-8 bg-[#0a192f] justify-center items-center relative `}>
      <InititalLoading />
      <Search />

    </div>
  );
}
