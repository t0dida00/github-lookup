import React from 'react'
import styles from './styles/ErrorPage.module.scss'
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error }) => {
    const router = useRouter();
    const { type, message } = error
    const handleBack = (e) => {
        e.preventDefault();
        router.push(`/`);
    }
    if (type == 404) {
        return (
            <div className={styles.container}>
                <div className={styles.cont_principal}>

                    <h1>Oops !!!</h1>
                    <p>The profile you're looking for isn't here.</p>
                    <div className={styles.buttonBack}>
                        <div onClick={handleBack}>
                            Back to search
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.cont_principal}>

                <h1>Oops !!!</h1>
                <p>{type} : {message} </p>
                <div className={styles.buttonBack}>
                    <div onClick={handleBack}>
                        Back to search
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ErrorPage