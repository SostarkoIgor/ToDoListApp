import styles from '../styles/Alert.module.css'

function Alert({action, message, removeAlert}) {
    return (
        <div className={styles.container}>
            <div className={styles.alert}>
                <span className={`material-symbols-outlined md-36 ${styles.icon}`}>error</span>
                <h1 className={styles.title}>Confirm</h1>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.ok}`} onClick={action}>
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>OK</span>
                    </button>
                    <button className={`${styles.button} ${styles.cancel}`} onClick={removeAlert}>
                        <span className="material-symbols-outlined">cancel</span>
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Alert