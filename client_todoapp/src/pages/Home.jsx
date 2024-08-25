import { useState, useEffect } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { getUserLists } from "../services/ToDoListService"
import SmallList from "../components/SmallList"
import styles from "../styles/Home.module.css"
import NavigatePages from "../components/NavigatePages"
import Filter from "../components/Filter"
function Home(){

    const [page, setPage] = useState([])
    const [status, setStatus] = useState(0)
    const [success, setSuccess] = useState(true)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        async function start(){
            let list=await getUserLists(searchParams.get("page"), searchParams.get("size"))
            console.log(list)
            setPage(list.result)
            setStatus(list.status)
            setSuccess(list.success)
            setLoading(false)
        }
        start()
        
    }, [searchParams])
    if (loading) return (<>Loading</>)
    if (!success) return (<Navigate to="/login" />)
    else
    return (<>
    
    <div className={styles.container}>
    {page.content.map((a, index)=><SmallList key={index} id={a.id} title={a.title} dateCreated={a.datecreated}></SmallList>)}
    </div>
    {page.totalPages>1 && 
    <NavigatePages page={page}/>}
    </>)
}

export default Home