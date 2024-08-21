import styles from '../styles/SmallList.module.css'
function SmallList({title, dateCreated, id}) {

    return (
        <div className={styles.container}>
            <span className={`material-symbols-outlined ${styles.delete}`}>delete_forever</span>
            <p className={styles.labeltext}>Title:</p>
            <p className={styles.title}>{title.length<20?title:title.substring(0,17)+"..."}</p>
            <p className={styles.labeltext}>Date created:</p>
            {dateCreated==null?
            <p className={styles.date}>{"unknown"}</p>
            :
            <p className={styles.date}>
                <span className="material-symbols-outlined">calendar_month</span>
                <span>{dateCreated.split('T')[0]}</span>
            </p>}
            <button className={styles.button} onClick={() => window.location.href = `/edit/${id}`}>
                <span className="material-symbols-outlined">edit</span>
                <p>Edit</p>
            </button>
        </div>
    )
}

export default SmallList