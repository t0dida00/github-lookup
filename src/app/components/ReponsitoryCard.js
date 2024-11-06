'use client'
import { set } from 'animejs';
import React, { useEffect, useState } from 'react';
import styles from "./styles/ReponsitoryCard.module.scss";
import colors from '../utils/colors';

const ReponsitoryCard = (props) => {
    const { data, octokit, style } = props;
    const { html_url, name, description, size, forks_count, topics, language, id, pushed_at, stargazers_count, homepage } = data;
    const [commitCount, setCommitCount] = useState(null);
    const [lastCommit, setLastCommit] = useState(null);
    const languageColor = colors[language];
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

        <div key={id} className={`${styles.fadeIn} group group/card flex w-full overflow-hidden flex-col gap-2 md:w-[48%] lg:w-[31%] border border-gray-300 hover:bg-[#112240] box-shadow: 0 10px 30px -15px 
        justify-between items-start flex-direction-column h-auto p-4 rounded-md lg:hover:transform lg:hover:translate-y-[-5px]
        cursor-pointer duration-100 relative `} >
            <span onClick={() => window.open(html_url, '_blank', 'noopener,noreferrer')} className='w-full absolute z-10 h-full top-0 left-0 '></span>
            <div className='w-full  ' >

                <div className='text-[#ccd6f6] text-[22px] font-extrabold lg:group-hover/card:text-teal-300 flex flex-row justify-between w-full z-[60] relative' >
                    <span className='w-full' onClick={() => window.open(html_url, '_blank', 'noopener,noreferrer')}>
                        {name}
                    </span>
                    <div className='flex flex-row gap-2  items-center'>
                        {homepage && <span className='relative'>
                            <a href={homepage} target="_blank" rel='noopener noreferrer' className='before:block before:content-"" before:absolute before:!z-100 before:w-[24px] before:h-[24px] before:left-0 group/svg'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 512 512" ><path className='lg:group-hover/svg:fill-[#64ffda]' fill='white' d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" /></svg>
                            </a>
                        </span>}
                        {/* <span>
                            <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill='white' fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>

                        </span> */}
                    </div>

                </div>
            </div>
            <div>
                <p className='text-[15px] text-slate-200'>{description || "No description"}</p>
            </div>
            <div className=' w-full '>
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
                        <div className='w-[10px] h-[10px] rounded-full border ' style={{ background: languageColor }}></div>
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
                    <div className='text-[11px] flex flex-row justify-between mt-2 items-center gap-3'>
                        {/* <span className='opacity-35'>
                            Last Commits
                        </span>   */}
                        <span >
                            <span className='underline'>{new Date(pushed_at).toLocaleDateString()}</span>: {lastCommit}</span>
                        <div className='flex flex-row  gap-1'>
                            <div className='flex flex-row justify-center gap-1 items-baseline'>
                                <div className='w-2 h-2 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill='#FFF' d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 38.7c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-38.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 38.7c0 53-43 96-96 96l-48 0 0 70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-70.7-48 0c-53 0-96-43-96-96l0-38.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" /></svg>

                                </div>
                                <span> {forks_count}</span>
                            </div>
                            <div className='flex flex-row justify-center gap-1 items-baseline'>
                                <div className='w-2 h-2 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill='white' d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>
                                </div>
                                <span> {stargazers_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ReponsitoryCard