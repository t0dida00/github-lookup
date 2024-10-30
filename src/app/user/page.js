"use client";
import { Suspense } from 'react';
import UserProfile from '../components/Profile';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading user information...</div>}>
            <UserProfile />
        </Suspense>
    )
}