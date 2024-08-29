import axios from "axios";
import { getToken } from "./JwtService";

export async function getUserLists(page, size, title, order, orderby) {
    let success, status, result
    let token=getToken()
    page=page?page:0
    
    size=size?size:10
    if (!token) return {success:false, status:403, result:[]}
    try{
        let request=await axios.get("/api/todolist/user", {
            headers: {
                "Authorization": "Bearer " + token
            },
            params: {page: page, size: size, title: title, order: order, orderby: orderby}
        })
        status=request.status
        result=request.data
        success=status===200
    }catch(error){
        return {success:false, status:error.response.status, result:[]}
    }finally{
        return {success:success, status:status, result:result}
    }

}
export async function deleteList(id) {
    let success, status
    let token=getToken()
    if (!token) return {success:false, status:403}
    try{
        let request=await axios.delete("/api/todolist/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        status=request.status
        success=status===204
    }catch(error){
        return {success:false, status:error.response.status}
    }finally{
        return {success:success, status:status}
    }
}

export async function getListById(id){
    let success, status, result
    let token=getToken()
    if (!token) return {success:false, status:403, result:[]}
    try{
        let request=await axios.get("/api/todolist/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        status=request.status
        result=request.data
        success=status===200
    }catch(error){
        return {success:false, status:error.response.status, result:[]}
    }finally{
        return {success:success, status:status, result:result}
    }
}

export async function updateList(id, title, tasks) {

    let success, status
    let token=getToken()
    if (!token) return {success:false, status:403}
    try{
        let request=await axios.put("/api/todolist", {
            id: id,
            listname: title,
            tasks: tasks
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        status=request.status
        success=status===200
    }catch(error){
        return {success:false, status:error.response.status}
    }finally{
        return {success:success, status:status}
    }

}

export async function createList(title, tasks) {

    let success, status
    let token=getToken()
    if (!token) return {success:false, status:403}
    try{
        let request=await axios.post("/api/todolist", {
            listname: title,
            tasks: tasks
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        status=request.status
        success=status===200
    }catch(error){
        return {success:false, status:error.response.status}
    }finally{
        return {success:success, status:status}
    }
}