import React from 'react'
import styles from "./styles/ErrorPage.module.scss"
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.cont_principal}>

                <h1>Oops !!!</h1>
                <p>The profile you're looking for isn't here.</p>
                <div className={styles.buttonBack}>
                    <div onClick={() => router.push(`/`)}>
                        Back to search
                    </div>

                </div>
                {/* <div className="styles.cont_aura_1"></div>
            <div className={styles.cont_aura_2}></div> */}
            </div>
        </div>
    )
}

export default ErrorPage