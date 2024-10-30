
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';

const Search = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/user?id=${username}`);
    };
    const [username, setUsername] = useState('');
    const router = useRouter();

    return (

        <form onSubmit={handleSubmit}>
            <div className={`search-container `}>
                <input type="text" className="search-input" placeholder="Search..." value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
        </form>
    )
}

export default Search