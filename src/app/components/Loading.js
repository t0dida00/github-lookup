import React from 'react'
import styles from "./styles/Loading.module.scss"
const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
            </div>
        </div>
    );
}
export default Loading