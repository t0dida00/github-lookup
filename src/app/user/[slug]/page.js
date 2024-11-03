"use client";
import { use, useEffect, useState } from 'react';
import GhPolyglot from 'gh-polyglot';
import { Octokit } from 'octokit';
import ErrorPage from '@/app/components/ErrorPage';
import UserInfo from '@/app/components/UserInfo';
import RepoList from '@/app/components/RepoList';
import Loading_v2 from '@/app/components/Loading_v2';
import Loading from '@/app/components/Loading';

export default function Page({ params }) {
    const { slug } = use(params)
    const username = slug;
    const [userData, setUserData] = useState(null);
    const [langData, setLangData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [error, setError] = useState({ active: false, type: 200, message: "" });
    const [rateLimit, setRateLimit] = useState(null);
    const [loading, setLoading] = useState(false);

    const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_OCTOKIT
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ title: 'Recently', value: "updated_at" });

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
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
                setError({ active: true, type: 404, message: "UserData error" });
            } else if (error.status === 403) {
                setError({ active: true, type: 403, message: "UserData error" });
            } else {
                setError({ active: true, type: 400, message: "UserData error" });
            }
            // console.error('Error:', error);
        }
    };
    const getLangData = () => {
        const me = new GhPolyglot(`${username},${process.env.NEXT_PUBLIC_OCTOKIT}`);
        me.userStats((err, stats) => {
            if (err) {
                console.log(err)
                console.error('Error:', err);
                setError({ active: true, type: 400, message: "LangData error" });
            }
            setLangData(stats);
        });
    };

    const getRepoData = async () => {
        try {
            const response = await octokit.request(`GET /users/${username}/repos`, {
                username: username,
                per_page: 100,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const sortedRepoData = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            setRepoData(sortedRepoData);
        } catch (error) {
            if (error.status === 404) {
                console.log(error)
                setError({ active: true, type: 404, message: "ReportData error" });
            } else if (error.status === 403) {
                console.log(error)
                setError({ active: true, type: 403, message: "ReportData error" });
            } else {
                console.log(error)
                setError({ active: true, type: 200, message: "ReportData error" });
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
                console.log(rateLimit)
                if (rateLimit.remaining < 1) {
                    setError({ active: true, type: 403 });
                }
            } catch (error) {
                console.log(error)
                setError({ active: true, type: error.status || 500 });
            }
        }
        fetchRateLimit();
        getUserData();
        // getLangData();
        getRepoData();
    }, []);
    useEffect(() => {
        if (repoData) {
            setLoading(true);  // Start loading before sorting
            let sortedbyCriteria = ""
            const { value } = selectedOption;
            if (value === 'updated_at') {
                sortedbyCriteria = [...repoData].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            }
            else {
                sortedbyCriteria = [...repoData].sort((a, b) => b.size - a.size);

            }
            // console.log(sortedbyCriteria)
            setRepoData(sortedbyCriteria);
            const timeoutId = setTimeout(() => {
                setLoading(false);  // End loading after delay
            }, 1000);

            // Clear timeout if the component unmounts or dependencies change
            return () => clearTimeout(timeoutId);
        }

    }, [selectedOption]);
    if (!userData && !error.active) return null
    if (error && error.active) {
        return <ErrorPage error={error} />
    }
    return (
        <div className='w-full flex justify-center'>
            <div className='w-full flex lg:w-[1280px] p-[20px] pt-[50px] md:pt-[100px] flex-col  pb-20'>
                <div className='flex '>
                    <UserInfo userData={userData} />
                </div>
                <div className='flex flex-col gap-4'>

                    <div>
                        <div className='mb-4 flex flex-col justify-center items-center md:justify-between  md:flex-row'>
                            <h2 className='text-2xl font-bold'>Top repositories</h2>
                            <div className="flex items-center gap-4 ">
                                <label htmlFor="sort-by" className=" font-medium">
                                    Sort by:
                                </label>
                                <div className="relative inline-block text-left w-[100px]">
                                    <div
                                        className="border  border-gray-300 bg-white text-gray-700 rounded-md px-2 py-1 cursor-pointer flex items-center justify-center"
                                        onClick={toggleDropdown}
                                    >
                                        {selectedOption.title}
                                        {/* <span className="ml-2">▼</span> */}
                                    </div>

                                    {isOpen && (
                                        <div className="absolute mt-1 w-full bg-white border text-[#23232F] border-gray-300 rounded-md shadow-lg overflow-hidden z-50">
                                            <div
                                                className="px-4 py-2 cursor-pointer hover:bg-slate-400"
                                                onClick={() => handleOptionClick({ title: 'Recently', value: 'updated_at' })}
                                            >
                                                Recently
                                            </div>
                                            <div
                                                className="px-4 py-2 cursor-pointer hover:bg-slate-400"
                                                onClick={() => handleOptionClick({ title: 'Size', value: 'size' })}
                                            >
                                                Size
                                            </div>
                                            <div
                                                className="px-4 py-2  cursor-pointer hover:bg-slate-400"
                                                onClick={() => handleOptionClick(({ title: 'Forks', value: 'forks_counts' }))}
                                            >
                                                Forks
                                            </div>
                                            <div
                                                className="px-4 py-2  cursor-pointer hover:bg-slate-400"
                                                onClick={() => handleOptionClick(({ title: 'Stars', value: 'stargazers_count' }))}
                                            >
                                                Stars
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        {
                            loading ?
                                <div className=' h-[100px] flex justify-center items-center'>
                                    <Loading />
                                </div> : <RepoList data={repoData} octokit={octokit} />
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}