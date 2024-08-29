import styles from '../styles/Alert.module.css'
import { useState, useEffect } from 'react'

function Alert({OkAction, message, CancelAction, includeCancel}) {
    const [cancel, setCancel] = useState(false)
    useEffect(() => {
        function start(){
            if (includeCancel===undefined) setCancel(true)
            else{
                setCancel(includeCancel)
            }
        }
        start()
    })
    return (
        <div className={styles.container}>
            <div className={styles.alert}>
                <span className={`material-symbols-outlined md-36 ${styles.icon}`}>error</span>
                <h1 className={styles.title}>Confirm</h1>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.ok}`} onClick={OkAction}>
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>OK</span>
                    </button>
                    {cancel &&
                    <button className={`${styles.button} ${styles.cancel}`} onClick={CancelAction}>
                        <span className="material-symbols-outlined">cancel</span>
                        <span>Cancel</span>
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert