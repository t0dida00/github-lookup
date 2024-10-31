import React from 'react'

const ReponsitoryCard = (props) => {
    const { data } = props;
    const { html_url, name, description, size, forks_count, topics, language, id } = data;
    return (
        <div key={id} className='flex w-full overflow-hidden flex-col gap-2 lg:w-[48%] border bg-[#112240] box-shadow: 0 10px 30px -15px 
        justify-between items-start flex-direction-column h-auto p-4 rounded-md transition hover:transform hover:translate-y-[-5px]
        cursor-pointer'>
            <div>
                <a href={html_url} target='_blank' rel='noopener noreferrer'>
                    <div className='text-[#ccd6f6] text-[22px] font-extrabold'>{name}</div>
                </a>
            </div>
            <div>

                <p className='text-[17px] text-slate-200'>{description}</p>
            </div>
            <div className=' w-full'>
                <div>
                    {topics.length > 0 && topics.map((topic) => (
                        <span key={topic} className='mr-2 text-[12px] opacity-60 '>{topic}</span>
                    ))}
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-[10px] h-[10px] rounded-full border ' style={{ background: "#F7DF1E" }}></div>
                        <span key={language} className='mr-2 text-[15px]' >{language}</span>

                    </div>

                    <div className='flex gap-2 opacity-30'>
                        <div className='mr-2 text-[12px] '>
                            {size >= 1024 ? `${(size / 1024).toFixed(2)} MB` : `${size} KB`}
                        </div>
                        {/* <div className='mr-2 text-[12px]'>
                            <span>Forks:</span> {forks_count}
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ReponsitoryCard