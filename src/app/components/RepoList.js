import React, { useEffect, useState } from 'react'
import ReponsitoryCard from './ReponsitoryCard'

const RepoList = (props) => {
    const { data, octokit } = props;
    if (!data) return null

    const [visibleCount, setVisibleCount] = useState(6);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);

    };
    const handleShowLess = () => {
        setVisibleCount(6);
        window.scrollTo({
            top: document.body.scrollHeight + 200,
            behavior: 'smooth'
        });
    };

    const isShowMore = visibleCount < data.length;
    return (
        <>
            <div className='flex flex-col gap-6 md:flex-row flex-wrap group/list justify-start'>
                {data && data.slice(0, visibleCount).map((repo, index) => {
                    const delayTime = `${(index % 6) * 1 * 200}ms`; // Delay based on batch index

                    return (
                        <ReponsitoryCard
                            data={repo}
                            key={repo.id}
                            octokit={octokit}
                            style={{ animationDelay: delayTime }}
                        />
                    );
                }
                )}

            </div>
            {data.length >= 6 && <div className='mt-5 w-full flex justify-center relative group'>
                <button
                    onClick={isShowMore ? handleShowMore : handleShowLess}
                    className='group/button  bg-[#0a192f] py-2 px-4 border border-[#64ffda] text-[#64ffda] rounded-md transition lg:transform lg:group-hover:translate-x-[-6px] lg:group-hover:translate-y-[-6px] z-20 absolute'
                >
                    {isShowMore ? 'Show More' : 'Show Less'}
                </button>
                <span onClick={isShowMore ? handleShowMore : handleShowLess} className=' group/button absolute bg-[#64ffda] py-2 px-4 rounded-md border border-[#64ffda] text-[#64ffda] z-0 hidden lg:block cursor-pointer'>
                    {isShowMore ? 'Show More' : 'Show Less'}
                </span>
            </div>}

        </>
    )
}

export default RepoList