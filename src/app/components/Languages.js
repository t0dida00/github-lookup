import React from 'react'
import colors from '../utils/colors';

const Languages = (props) => {
    const { language, setSelection, selections } = props
    const handleSelect = () => {
        setSelection((prevSelections) =>
            prevSelections.includes(language)
                ? prevSelections.filter((item) => item !== language)
                : [...prevSelections, language]
        );
    }
    const languageColor = colors[language];
    return (

        <div className='flex items-center rounded-full bg-[#ddf4ff] px-3 py-1 text-xs 
    font-semibold leading-5 text-[#0969da] lg:hover:bg-[#0969da] lg:hover:text-white transition duration-200 cursor-pointer h-fit' onClick={handleSelect}
            style={selections.includes(language) ? { backgroundColor: languageColor, color: 'white' } : {}}
        >{
                language
            }</div>

    )
}

export default Languages