import axios from "axios";
import { getToken } from "./JwtService";

export async function getUserLists(page, size) {
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
            params: {page: page, size: size}
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