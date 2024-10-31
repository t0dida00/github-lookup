import React from 'react'
import styles from "./styles/LoadingAnimation.module.scss"
const Loading_v2 = () => {
    return (
        <div className={` ${styles.container}`}>
            <div className='pt-10'>
                <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path stroke="#0a192f" fill='white' strokeWidth="20" strokeLinecap='round' strokeLinejoin='round'
                        d="M64 64l0 288 512 0 0-288L64 64zM0 64C0 28.7 28.7 0 64 0L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 416c-35.3 0-64-28.7-64-64L0 64zM128 448l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                    />
                    {/* <circle cx="320" cy="160" r="20" fill="white" /> */}
                    <circle cx="170" cy="220" r="20" fill="white" />
                    <circle cx="270" cy="220" r="20" fill="white" />
                    <circle cx="370" cy="220" r="20" fill="white" />
                    <circle cx="470" cy="220" r="20" fill="white" />
                </svg>
            </div>
        </div>
    )
}

export default Loading_v2