import styles from "../styles/NavigatePages.module.css"
import { useNavigate } from "react-router-dom"
function NavigatePages({page}) {
    let navigate = useNavigate()
    let totalPages=page.totalPages
    let currentPage=page.number
    let pageSize=page.size
    let next=currentPage+2>=totalPages?totalPages:currentPage+2
    let prev=currentPage-2<1?1:currentPage-2
    return (
        <div className={styles.container}>
            {!page.first &&
            <>
                <span className="material-symbols-outlined" onClick={() => navigate(`/?page=0&size=${pageSize}`)}>first_page</span>
                <span className="material-symbols-outlined" onClick={() => navigate(`/?page=${currentPage-1}&size=${pageSize}`)}>navigate_before</span>
            </>
            }
            {Array.from({ length: next - prev + 1 }, (_, index) => {
                const pageNumber = prev + index -1;
                return (
                    <p
                        key={pageNumber}
                        className={`${styles.pageNumber} ${pageNumber === currentPage ? styles.active : ''}`}
                        onClick={() => navigate(`/?page=${pageNumber}&size=${pageSize}`)}
                    >
                        {pageNumber + 1}
                    </p>
                );
            })}
            {!page.last &&
            <>
                <span className="material-symbols-outlined" onClick={() => navigate(`/?page=${currentPage+1}&size=${pageSize}`)}>navigate_next</span>
                <span className="material-symbols-outlined" onClick={() => navigate(`/?page=${totalPages-1}&size=${pageSize}`)}>last_page</span>
            </>
            }
        </div>
    )
}

export default NavigatePages