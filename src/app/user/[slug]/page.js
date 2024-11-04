"use client";
import { use, useEffect, useState } from 'react';
import GhPolyglot from 'gh-polyglot';
import { Octokit } from 'octokit';
import ErrorPage from '@/app/components/ErrorPage';
import UserInfo from '@/app/components/UserInfo';
import RepoList from '@/app/components/RepoList';
import Loading_v2 from '@/app/components/Loading_v2';
import Loading from '@/app/components/Loading';
import Topics from '@/app/components/Topics';
import Languages from '@/app/components/Languages';

export default function Page({ params }) {
    const { slug } = use(params)
    const username = slug;
    const [userData, setUserData] = useState(null);
    const [langData, setLangData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [error, setError] = useState({ active: false, type: 200, message: "" });
    const [rateLimit, setRateLimit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selections, setSelection] = useState([]);
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
            const sortedRepoData = response.data.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
            setRepoData(sortedRepoData);

            const topicsSet = new Set();
            sortedRepoData.forEach(repo => {
                if (repo.topics && repo.topics.length > 0) {
                    repo.topics.forEach(topic => topicsSet.add(topic));
                }
            });
            const uniqueTopics = Array.from(topicsSet);
            setTopics(uniqueTopics);

            const languageSet = new Set();
            sortedRepoData.forEach(repo => {
                if (repo.language) {
                    languageSet.add(repo.language)
                }
            });
            // Convert Set back to Array if needed
            const uniqueLanguages = Array.from(languageSet);
            setLanguages(uniqueLanguages)
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
        if (!repoData) return;  // Exit if repoData is not initialized

        setLoading(true);  // Start loading before sorting
        let sortedbyCriteria = [...repoData];

        const value = selectedOption?.value || 'updated_at';  // Fallback to a default sorting value

        // Sort by selected option or default criterion
        sortedbyCriteria.sort((a, b) => {
            if (value === 'updated_at') {
                return new Date(b.pushed_at) - new Date(a.pushed_at);
            } else if (value === 'size' || value === 'forks_count' || value === 'stargazers_count') {
                return b[value] - a[value];
            }
            return 0; // No sorting if no valid criteria is selected
        });

        // Filter by selections if selections array is not empty
        if (selections.length > 0) {
            sortedbyCriteria = sortedbyCriteria.filter(repo =>
                selections.includes(repo.language) ||
                repo.topics.some(topic => selections.includes(topic))
            );
        }

        // Update repoData with sorted and filtered array
        setFilterData(sortedbyCriteria);

        // End loading with a delay
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear timeout if component unmounts or dependencies change
        return () => clearTimeout(timeoutId);

    }, [selectedOption, selections]);
    if (!userData && !error.active) return null
    if (error && error.active) {
        return <ErrorPage error={error} />
    }
    return (
        <div className='w-full flex justify-center '>
            <div className='w-full flex lg:w-[1280px] p-[20px] pt-[50px] md:pt-[100px] flex-col gap-5 pb-20'>
                <div className='flex '>
                    <UserInfo userData={userData} />
                </div>
                <div className='flex flex-col lg:flex-row flex-wrap gap-6 justify-between'>
                    <div className='flex gap-2 flex-col items-center md:items-start lg:w-[48%] '>
                        <h2 className='text-2xl font-bold'>Topics</h2>
                        <div className='border w-full rounded-md p-4  h-full' >
                            <div className='flex flex-wrap  gap-2'>
                                {topics && topics.length > 0 && topics.map((tp, index) => <Topics topic={tp} key={index} selections={selections} setSelection={setSelection} />)}
                            </div>
                        </div>

                    </div>
                    <div className='flex gap-2 flex-col  items-center md:items-start lg:items-end lg:w-[48%]'>
                        <h2 className='text-2xl font-bold'>Languages</h2>
                        <div className='border w-full rounded-md p-4  h-full' >
                            <div className='flex flex-wrap  gap-2'>


                                {languages && languages.length > 0 && languages.map((lg, index) => <Languages language={lg} key={index} selections={selections} setSelection={setSelection} />)}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <div className='mb-4 flex flex-col justify-center items-center md:justify-between md:flex-row'>
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
                                                onClick={() => handleOptionClick(({ title: 'Forks', value: 'forks_count' }))}
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
                                </div> : <RepoList data={filterData || repoData} octokit={octokit} />
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}