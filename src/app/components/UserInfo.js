import React, { useEffect } from 'react'
import ContributionData from './ContributionData';

const UserInfo = ({ userData }) => {
    const { avatar_url, login, followers, following, public_repos, created_at, updated_at, html_url } = userData;

    return (
        <div className="flex pb-4 md:p-4 flex-col w-full justify-center items-center md:justify-start lg:items-center">
            <div className="w-[150px] h-[150px] rounded-full bg-gray-800 border border-gray-600 overflow-hidden">
                <a href={html_url} target="_blank">
                    <img className='w-full h-full object-cover' src={avatar_url} alt={login} />

                </a>
            </div>
            <div className='pt-4 text-center'>
                <div className='text-[24px] font-bold '>{login}</div>
                <div className='text-[14px] text-gray-500'> <span>
                    Joined on {new Date(created_at).toLocaleDateString()}
                </span> <br></br> <span className='break-line' >
                        Last activated {new Date(updated_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-center items-center flex-col sm:flex-row  lg:flex-row gap-4 mt-8 lg:mt-4 ">
                <div className="flex flex-col items-center justify-center p-4 w-full sm:w-[150px] h-[100px] rounded-lg bg-[#112240] hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
                    <div className='text-[20px] text-bold'>{public_repos}</div>
                    <div className='text-[14px] text-slate-500 uppercase'>Repositories</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 w-full sm:w-[150px] h-[100px] rounded-lg bg-[#112240] hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
                    <div className='text-[20px] text-bold'>{followers}</div>
                    <div className='text-[14px] text-slate-500 uppercase'>Followers</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 w-full sm:w-[150px] h-[100px] rounded-lg bg-[#112240] hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
                    <div className='text-[20px] text-bold'>{following}</div>
                    <div className='text-[14px] text-slate-500 uppercase'>Following</div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center mt-10 '>
                <ContributionData />
            </div>
        </div>
    );
}

export default UserInfo