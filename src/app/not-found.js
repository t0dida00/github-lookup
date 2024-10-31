'use client'
import React from 'react'
import styles from "./components/styles/ErrorPage.module.scss"
import { useRouter } from 'next/navigation';

const Custom404 = ({ error }) => {
    const router = useRouter();
    const handleBack = (e) => {
        e.preventDefault();
        router.push(`/`);
    }
    return (
        <div className={styles.container}>
            <div className={styles.cont_principal}>

                <h1>Oops !!!</h1>
                <p>The page you're looking for isn't here.</p>
                <div className={styles.buttonBack}>
                    <div onClick={handleBack}>
                        Back to right
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Custom404