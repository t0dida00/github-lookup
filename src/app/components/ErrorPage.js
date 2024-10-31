import React from 'react'
import styles from "./styles/ErrorPage.module.scss"
const ErrorPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.cont_principal}>

                <h1>Oops !!!</h1>
                <p>The profile you're looking for isn't here.</p>

                {/* <div className="styles.cont_aura_1"></div>
            <div className={styles.cont_aura_2}></div> */}
            </div>
        </div>
    )
}

export default ErrorPage