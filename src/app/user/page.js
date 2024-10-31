"use client";
import { Suspense, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import UserProfile from '../components/Profile';

export default function Page() {

    return (
        <Suspense fallback={<div>Loading user information...</div>}>
            <UserProfile />
        </Suspense>
    )
}