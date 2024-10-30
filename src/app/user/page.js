"use client";
import { Suspense, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import UserProfile from '../components/Profile';

export default function Page() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Set a timeout to simulate loading for 5 seconds
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 5 seconds
        }, 5000);

        // Cleanup the timeout if the component unmounts before it completes
        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return (<Loading />)
    }
    return (
        // <Suspense fallback={<div>Loading user information...</div>}>
        //     <UserProfile />
        // </Suspense>
        <Loading />
    )
}