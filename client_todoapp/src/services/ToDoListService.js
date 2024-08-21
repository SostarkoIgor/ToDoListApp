import axios from "axios";
import { getToken } from "./JwtService";

export async function getUserLists() {
    let success, status, result
    let token=getToken()
    if (!token) return {success:false, status:403, result:[]}
    try{
        let request=await axios.get("/api/todolist/user", {
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