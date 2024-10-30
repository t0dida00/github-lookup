"use client";
import { useSearchParams } from 'next/navigation';

export default function Page({ params }) {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // Retrieve the 'id' query parameter

    return <div>Dynamic route segment /blog/[slug]/page.js: {userId}</div>
}