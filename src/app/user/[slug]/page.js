"use client";
import { use, useEffect, useState } from 'react';
import GhPolyglot from 'gh-polyglot';
import Error from 'next/error';
import { Octokit } from 'octokit';
import { useRouter } from 'next/navigation';
import ErrorPage from '@/app/components/ErrorPage';

export default function Page({ params }) {
    const { slug } = use(params)
    const username = slug;
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null);
    const [langData, setLangData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [error, setError] = useState({ active: false, type: 200 });
    const [rateLimit, setRateLimit] = useState(null);
    const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_OCTOKIT
    })
    const getUserData = async () => {
        try {
            const response = await octokit.request(`GET /users/${username}`, {
                username: username,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setUserData(response.data)
        } catch (error) {
            if (error.status === 404) {
                setError({ active: true, type: 404 });
            } else if (error.status === 403) {
                setError({ active: true, type: 403 });
            } else {
                setError({ active: true, type: 400 });
            }
            // console.error('Error:', error);
        }
    };
    const getLangData = () => {
        const me = new GhPolyglot(`${username}`);
        me.userStats((err, stats) => {
            if (err) {
                // console.error('Error:', err);
                setError({ active: true, type: 400 });
            }
            setLangData(stats);
        });
    };

    const getRepoData = async () => {
        try {
            const response = await octokit.request('GET /users/{username}/repos', {
                username: username,
                per_page: 100,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            setRepoData(response.data);
        } catch (error) {
            if (error.status === 404) {
                setError({ active: true, type: 404 });
            } else if (error.status === 403) {
                setError({ active: true, type: 403 });
            } else {
                setError({ active: true, type: 200 });
            }
        }
    };

    useEffect(() => {
        async function fetchRateLimit() {
            try {
                const response = await octokit.request('GET /rate_limit', {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                });
                const rateLimit = response.data.resources.core;
                setRateLimit(rateLimit);
                if (rateLimit.remaining < 1) {
                    setError({ active: true, type: 403 });
                }
            } catch (error) {
                setError({ active: true, type: error.status || 500 });
            }
        }
        fetchRateLimit();
        getUserData();
        getLangData();
        getRepoData();
    }, []);
    if (!userData && !error.active) return null
    if (error && error.active) {
        return <ErrorPage />
    }
    return (
        <div>
            {slug}
        </div>
    )
}