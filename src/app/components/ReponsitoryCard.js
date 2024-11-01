'use client'
import { set } from 'animejs';
import React, { useEffect, useState } from 'react';

const ReponsitoryCard = (props) => {
    const { data, octokit } = props;
    const { html_url, name, description, size, forks_count, topics, language, id, pushed_at } = data;
    const [commitCount, setCommitCount] = useState(null);
    const [lastCommit, setLastCommit] = useState(null);
    const getCommitCount = async () => {
        try {
            const response = await octokit.request(`GET /repos/${data.owner.login}/${name}/commits`, {
                per_page: 1,
                page: 1,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            // Check if the response was successful
            if (response.status === 200) {
                setLastCommit(response.data[0]?.commit.message)
                const linkHeader = response.headers.link; // Use 'link' instead of 'get' method
                // Check if there are links in the header for pagination
                if (linkHeader) {
                    // Extract last page number from link header for commit count
                    const lastPageMatch = linkHeader.match(/&page=(\d+)>;\s*rel="last"/);
                    if (lastPageMatch) {
                        setCommitCount(parseInt(lastPageMatch[1], 10));
                    } else {
                        setCommitCount(1); // If no last page match, set count to 1
                    }
                } else {
                    setCommitCount(1); // If no link header, there's at least one commit
                }
            } else {
                setCommitCount('Error');
                console.error('Failed to fetch commit count:', response.statusText);
            }
        } catch (error) {
            setCommitCount('Error');
            console.error('Error fetching commit count:', error);
        }

    };

    useEffect(() => {
        getCommitCount();
    }, []);
    return (
        <div key={id} className=' group group/list flex w-full overflow-hidden flex-col gap-2 md:w-[48%] lg:w-[31%] border border-gray-300 hover:bg-[#112240] box-shadow: 0 10px 30px -15px 
        justify-between items-start flex-direction-column h-auto p-4 rounded-md transition lg:hover:transform lg:hover:translate-y-[-5px]
        cursor-pointer relative lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
            <a href={html_url} target='_blank' rel='noopener noreferrer' className='group/card w-full before:block before:content-"" before:absolute before:z-10 before:w-full before:h-full before:top-0 before:left-0'>
                <div className='text-[#ccd6f6] text-[22px] font-extrabold lg:group-hover/card:text-teal-300 flex flex-row justify-between w-full' >
                    <span>
                        {name}

                    </span>
                    <div className='flex flex-row gap-4'>
                        <span className='z-100'>

                            <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill='white' fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>

                        </span>
                    </div>

                </div>
            </a>
            <div>
                <p className='text-[15px] text-slate-200'>{description || "No description"}</p>
            </div>
            <div className=' w-full'>
                <ul className='flex flex-wrap z-30'>
                    {topics.length > 0 && topics.map((topic) => (
                        <li key={topic} className="mr-1.5 mb-1.5">
                            <div className='flex items-center rounded-full bg-[#ddf4ff] px-3 py-1 text-xs 
                            font-semibold leading-5 text-[#0969da] hover:bg-[#0969da] hover:text-white transition duration-200'>{topic}</div>

                        </li>
                    ))}
                </ul>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-[10px] h-[10px] rounded-full border ' style={{ background: "#F7DF1E" }}></div>
                        <span key={language} className='mr-2 text-[13px]' >{language || "Unknown"}</span>
                    </div>
                    <div className='flex gap-2 opacity-50'>
                        <div className='mr-2 text-[12px]'>
                            <span>Commits:</span> {commitCount}
                        </div>
                        <div className='mr-2 text-[12px] '>
                            {size >= 1024 ? `${(size / 1024).toFixed(2)} MB` : `${size} KB`}
                        </div>

                    </div>

                </div>
                <div>
                    <div className='text-[11px] flex flex-row justify-between mt-2 opacity-25'>
                        <span>
                            Last Commits
                        </span>  <span>
                            {new Date(pushed_at).toLocaleDateString()} - {lastCommit}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReponsitoryCard