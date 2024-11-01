import React from 'react'
import ReponsitoryCard from './ReponsitoryCard'

const RepoList = (props) => {
    const { data, octokit } = props;
    return (
        <div className='flex flex-col gap-6 md:flex-row flex-wrap group/list justify-between'>
            {data && data.map((repo) => (
                <ReponsitoryCard data={repo} key={repo.id} octokit={octokit} />
            ))}
        </div>
    )
}

export default RepoList