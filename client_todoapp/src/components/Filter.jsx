import styles from '../styles/Filter.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Filter() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [order, setOrder] = useState('desc')
    const [orderby, setOrderby] = useState('date')
    const onSubmit = (e) => {
        e.preventDefault()
        let query = `?title=${title}&order=${order}&orderby=${orderby}`
        navigate(`/${query}`)
    }
    const onReset = (e) => {
        e.preventDefault()
        setTitle('')
        setOrder('desc')
        setOrderby('date')
        navigate('/')
    }
    
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="search" className={styles.label}>Search title:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="date" className={styles.label}>Order by:</label>
                    <select className={styles.select} onChange={(e) => setOrderby(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="order" className={styles.label}>Order:</label>
                    <select className={styles.select} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <button onClick={onSubmit} className={styles.button}>
                        <span className="material-symbols-outlined">search</span>
                        <span>Filter</span>
                    </button>
                    <button onClick={onReset} className={styles.button}>
                        <span className="material-symbols-outlined">restart_alt</span>
                        <span>Reset</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Filter;