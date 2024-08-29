import styles from '../styles/SmallList.module.css'
import { deleteList } from '../services/ToDoListService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Alert from './Alert'
function SmallList({title, dateCreated, id, setDeleteFlag}) {

    const [deleteF, setDeleteF] = useState(false)
    const navigate = useNavigate()
    async function deleteList_(){
        let response=await deleteList(id)
        if (response.success) setDeleteFlag()
        setDeleteF(false)
    }

    function removeAlert(){
        setDeleteF(false)
    }
    return (
        <>
        {deleteF==true?
        <Alert OkAction={deleteList_} message={`Are you sure you want to delete this list (${title})? This action cannot be undone.`} CancelAction={removeAlert}/>
        :<></>}
        <div className={styles.container}>
            <span className={`material-symbols-outlined ${styles.delete}`} onClick={() => setDeleteF(true)}>delete_forever</span>
            <div className={styles.containertitle}>
                <p className={styles.labeltext}>Title:</p>
                <p className={styles.title}>{title.length<20?title:title.substring(0,17)+"..."}</p>
            </div>
            <div className={styles.containerdate}>
                <p className={styles.labeltext}>Date created:</p>
                {dateCreated==null?
                <p className={styles.date}>{"unknown"}</p>
                :
                <p className={styles.date}>
                    
                    <span>{dateCreated.split('T')[0]}</span>
                </p>}
                <button className={styles.button} onClick={() => window.location.href = `/edit/${id}`}>
                    <span className="material-symbols-outlined">edit</span>
                    <p>Edit</p>
                </button>
            </div>
        </div>
        </>
    )
}

export default SmallList