import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/UserService.js'
import styles from '../styles/Forms.module.css'
function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return
        }
        var t = await RegisterUser(name, email, password)
        if (t.outcome) {
            navigate('/login')
        }
        else {
            setErrorMessage(t.message + ` (${t.statuscode})`)
        }
            
    }

    return (
    <div className={styles.container}>
        <div className={styles.formcontainer}>
            <p className={styles.title}>Register</p>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="name" className={styles.label}><span class="material-icons">person</span></label>
                    <input
                    className={styles.input}
                    type="text"
                    id="name"
                    value={name}
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
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
                    <label htmlFor="password"  className={styles.label}><span className="material-icons">password</span></label>
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
                <div className={styles.inputContainer}>
                    <label htmlFor="cpassword"  className={styles.label}><span className="material-icons">password</span></label>
                    <input
                    className={styles.input}
                    type="password"
                    id="cpassword"
                    value={confirmPassword}
                    placeholder='confirm password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className={styles.button}>Register</button>
                
                <p className={styles.link}>Already have an account? <a className={styles.linka} href="/login">Login</a></p>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    </div>)
}

export default Register