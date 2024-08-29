import { useState, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getListById } from "../services/ToDoListService"
import { updateList, createList } from "../services/ToDoListService"
import styles from "../styles/ListEdit.module.css"
import Alert from "../components/Alert"
function CreateList({mode}){

    const navigate = useNavigate()
    const { id } = useParams()
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState(null)
    const [taskList, setTaskList] = useState([])
    const [alert, setAlert] = useState(false)

    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    const [editTitle, setEditTitle] = useState(false)

    const [listChanged, setListChanged] = useState(false)

    const [newTastText, setNewTaskText] = useState("")

    const [currentEditTaskText, setCurrentEditTaskText] = useState("")

    const [alertMessage, setAlertMessage] = useState("No permission to view this list!")
    useEffect(() => {
        async function start(){
            if (id != null){
                let response=await getListById(id)
                if (response.status!==200) setAlert(true)
                
                setListName(response.result.listname)
                setListId(response.result.id)
                setTaskList(response.result.tasks)

                
                //console.log(taskList)
            }else{
                setListName("")
                setListId(null)
                setTaskList([])
            }
            console.log(mode)
            if (mode==="create"){
                setEditTitle(true)
                setListChanged(true)
            }
        }
        start()
    }, [])

    const changeChecked=(index)=>{
        let newTaskList=[...taskList]
        newTaskList[index].iscompleted=!newTaskList[index].iscompleted
        setTaskList(newTaskList)
        setListChanged(true)
    }

    const deleteTask=(index)=>{
        let newTaskList=[...taskList]
        newTaskList.splice(index, 1)
        setTaskList(newTaskList)
        setListChanged(true)
    }

    const addTask=()=>{
        let newTaskList=[...taskList]
        newTaskList.push({id:-1, text:newTastText, iscompleted:false})
        setNewTaskText("")
        setTaskList(newTaskList)
        setListChanged(true)
    }

    const editTask=(index)=>{
        setCurrentEditTaskText(taskList[index].text)
        setEdit(true)
        setEditIndex(index)
        setListChanged(true)
    }

    const updateTask=(index)=>{
        let newTaskList=[...taskList]
        newTaskList[index].text=currentEditTaskText
        setTaskList(newTaskList)
        setEdit(false)
        setEditIndex(null)
        setListChanged(true)
    }

    const submit=async ()=>{
        let response
        if (mode==="create"){
            response = await createList(listName, taskList)
        }else{
            response = await updateList(listId, listName, taskList)
        }

        if (response.success){
            if (mode==="create"){
                setAlertMessage("List created!")
            }else{
                setAlertMessage("List updated!")
            }
        }
        else{
            setAlertMessage(`Error occured (${response.status}).`)
        }
        setAlert(true)
        
    }

    const alertAction=()=>{
        setAlert(false)
        navigate("/")
    }

    return (
        <>
        {alert && <Alert OkAction={alertAction} message={alertMessage} includeCancel={false}/>}
        {mode==="edit" && id==null? <Navigate to="/"/>: <></>}
        {mode==="create" && id!=null? <Navigate to="/"/>: <></>}

        <div className={styles.container}>
            <div className={styles.header}>
                {!editTitle && <>
                <h1 className={styles.title}>{listName}</h1>
                <span className={`material-symbols-outlined ${styles.icon}`} onClick={()=>setEditTitle(!editTitle)}>edit</span>
                </>}
                {editTitle && <>
                <input className={styles.inputtitle} type="text" value={listName} onChange={(e)=> {setListName(e.target.value)}} placeholder="List title..."/>
                <span className={`material-symbols-outlined ${styles.icon}`} onClick={()=>{setEditTitle(!editTitle); setListChanged(true)}}>check_circle</span>
                </>}
            </div>

            <div className={styles.content}>
                <div className={styles.tasks}>
                    {taskList.length===0 && mode!=="create"?<p className={styles.nodata}>No tasks</p>:<></>}
                    {taskList.map((task, index)=>{
                        return (
                        <div className={styles.task} key={index}>
                            <label htmlFor="checkbox" className={styles.checkboxcontainer} onClick={()=>changeChecked(index)}>
                                <span className="material-symbols-outlined">{task.iscompleted ? "check_box" : "check_box_outline_blank"}</span>
                            </label>
                            <div className={styles.taskleftcontainer}>
                                {(!edit || (edit && editIndex!==index))?
                                    <p className={`${styles.tasktext} ${task.iscompleted ? styles.taskcompleted : ""}`}>{task.text}</p>
                                    :
                                    <input className={styles.editinput} type="text" value={currentEditTaskText} onChange={(e)=>setCurrentEditTaskText(e.target.value)}/>
                                }

                                <div className={styles.options}>

                                    {edit && editIndex===index?
                                    <span className="material-symbols-outlined" onClick={()=>updateTask(index)}>check_circle</span>:<></>
                                    }

                                    {!edit && <>
                                    <span className="material-symbols-outlined" onClick={()=>editTask(index)}>edit</span>
                                    <span className="material-symbols-outlined" onClick={()=>deleteTask(index)}>delete</span>
                                    </>}
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>

            <div className={styles.footer}>
                <input className={styles.inputnewtask} type="text" value={newTastText} onChange={(e)=>setNewTaskText(e.target.value)} placeholder="Add new task"/>
                <button className={styles.button} onClick={addTask}>
                    <span className={`material-symbols-outlined`}>add</span>
                    <span>Add</span>
                </button>
            </div>
            {listChanged &&
                <button className={`${styles.button} ${styles.save}`} onClick={submit}>
                    <span className="material-symbols-outlined">save</span>
                    <span>Save changes</span>
                </button>
            }
        </div>
        </>
    )
}

export default CreateList