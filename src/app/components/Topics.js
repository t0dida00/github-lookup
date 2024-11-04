import React from 'react'

const Topics = (props) => {
    const { topic, setSelection, selections } = props
    const handleSelect = () => {
        setSelection((prevSelections) =>
            prevSelections.includes(topic)
                ? prevSelections.filter((item) => item !== topic)
                : [...prevSelections, topic]
        );
    }
    return (

        <div className='flex items-center rounded-full bg-[#ddf4ff] px-3 py-1 text-xs 
                            font-semibold leading-5 text-[#0969da] hover:bg-[#0969da] hover:text-white transition duration-200 cursor-pointer h-fit' onClick={handleSelect}
            style={selections.includes(topic) ? { backgroundColor: '#0969da', color: 'white' } : {}}>{topic}</div>

    )
}

export default Topics