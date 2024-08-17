import styles from '../styles/Navbar.module.css'
import { removeToken } from '../services/JwtService'
function Navbar() {
    return (
    <div className={styles.navbar}>
        <p className={styles.title}>Todo List</p>
        <ul className={styles.links}>
            <li className={styles.link}><a className={styles.linka} href="/">Home</a></li>
            <li className={styles.link}><a className={styles.linka} href="/create">Create list</a></li>
        </ul>
        <p className={styles.logout}><a className={styles.linka} href='/login'><span className="material-symbols-outlined">logout</span> <span>Logout</span></a></p>
    </div>
    )
}

export default Navbar