import React, { useState } from 'react'

const ContributionData = () => {
    const [selectedYear, setSelectedYear] = useState(2026)

    return (
        <div className='w-full flex flex-col lg:flex-row gap-10'>
            <img className='w-full lg:w-[70%] border rounded-md border-[#fff]' src={`https://github-contributions-api.deno.dev/t0dida00.svg?from=${selectedYear}-01-01&font-color=fff`} alt="t0dida00 Github chart" />
            <ul className='cursor-pointer flex flex-row lg:flex-col justify-center lg:justify-normal gap-20 lg:gap-0'>
                <li
                    className={` ${selectedYear === 2026 ? 'text-[#64ffda]' : ''}`}
                    onClick={() => setSelectedYear(2026)}
                >
                    2026
                </li>
                <li
                    className={` ${selectedYear === 2025 ? 'text-[#64ffda]' : ''}`}
                    onClick={() => setSelectedYear(2025)}
                >
                    2025
                </li>
                <li
                    className={` ${selectedYear === 2024 ? 'text-[#64ffda]' : ''}`}
                    onClick={() => setSelectedYear(2024)}
                >
                    2024
                </li>
                <li
                    className={`${selectedYear === 2023 ? 'text-[#64ffda]' : ''}`}
                    onClick={() => setSelectedYear(2023)}
                >
                    2023
                </li>
                <li
                    className={`${selectedYear === 2022 ? 'text-[#64ffda]' : ''}`}
                    onClick={() => setSelectedYear(2022)}
                >
                    2022
                </li>
            </ul>
        </div >

    );
}

export default ContributionData