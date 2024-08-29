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
    const [query, setQuery] = useState("")
    const [deleteFlag, setDeleteFlag] = useState(false)

    const setDeleteFlagHandler = () => {
        setDeleteFlag(!deleteFlag)
    }

    useEffect(() => {
        async function start(){
            let title=searchParams.get("title")
            let order=searchParams.get("order")
            let orderby=searchParams.get("orderby")
            let list=await getUserLists(
                searchParams.get("page"),
                searchParams.get("size"),
                title,
                order,
                orderby
            )
            setPage(list.result)
            setStatus(list.status)
            setSuccess(list.success)
            setLoading(false)
            if (title!==null) setQuery(`&title=${title}&order=${order}&orderby=${orderby}`)
        }
        start()
        
    }, [searchParams, deleteFlag])
    if (loading) return (<>Loading</>)
    if (!success) return (<Navigate to="/login" />)
    else
    return (<>
    <Filter></Filter>
    <div className={styles.container}>
    {page.content.map((a, index)=>
        <SmallList key={index} id={a.id} title={a.title} dateCreated={a.datecreated} setDeleteFlag={setDeleteFlagHandler}></SmallList>)
    }
    </div>
    {page.totalPages>1 && 
    <NavigatePages page={page} query={query}/>}
    </>)
}

export default Home