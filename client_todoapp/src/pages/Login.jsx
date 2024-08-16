import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/UserService.js'
import styles from '../styles/Forms.module.css'
import { useState } from 'react'

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        LoginUser(email, password)
            .then(() => navigate('/login'))
            .catch((err) => setErrorMessage(err.response.data.message))
    }
    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <p className={styles.title}>Login</p>
                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email"  className={styles.label}><i className="material-icons">email</i></label>
                        <input
                        className={styles.input}
                        type="email"
                        id="email"
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password"  className={styles.label}><span class="material-icons">password</span></label>
                        <input
                        className={styles.input}
                        type="password"
                        id="password"
                        value={password}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Login</button>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
            </div>
        </div>)
}

export default Login