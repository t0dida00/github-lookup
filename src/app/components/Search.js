
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import Loading_v2 from './Loading_v2';
import styles from "./styles/Search.module.scss"
const Search = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(() => {
            router.push(`/user?id=${username}`);
        }, 2000);
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.container} `}>
                    <input type="text" className={`${styles.input} ${loading ? styles.slideOut : null}`} placeholder="Search..." value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
            </form>
            {loading ? <Loading_v2 /> : null}

        </>
    )
}

export default Search