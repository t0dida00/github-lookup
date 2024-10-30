// components/UserProfile.js
"use client";
import { useSearchParams } from 'next/navigation';

const UserProfile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // Retrieve the 'id' query parameter

    // You can simulate data fetching or processing here
    return (
        <div>
            {userId ? (
                <div>User ID: {userId}</div> // Replace this with actual user data fetching logic
            ) : (
                <div>No user ID provided.</div>
            )}
        </div>
    );
};

export default UserProfile;
