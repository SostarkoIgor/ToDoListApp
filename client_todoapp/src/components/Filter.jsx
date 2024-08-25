import styles from '../styles/Filter.module.css'
function Filter() {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="search" className={styles.label}>Search title:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="title"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="date" className={styles.label}>Order by:</label>
                    <select className={styles.select}>
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="order" className={styles.label}>Order:</label>
                    <select className={styles.select}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <button className={styles.button}>
                        <span className="material-symbols-outlined">restart_alt</span>
                        <span>Reset</span>
                    </button>
                    <button className={styles.button}>
                        <span className="material-symbols-outlined">search</span>
                        <span>Filter</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Filter;