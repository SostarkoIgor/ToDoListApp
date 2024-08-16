import axios from 'axios'
import { setToken, removeToken } from './JwtService'
export async function RegisterUser(name, email, password) {
    let statuscode, message, outcome
    try{
        let response = await axios.post('/api/auth/register', {
            name:name,
            email:email,
            password:password
        })
        statuscode = response.status
        message = ""
        outcome = true
    }
    catch(error){
        statuscode = 0
        if (error.response)
        statuscode = error.response.status
        message = "Error registering user. Please try again."
        outcome = false
    }
    finally{
        return {
            statuscode: statuscode,
            message: message,
            outcome: outcome
        }
    }
}

export async function LoginUser(email, password) {
    let statuscode, message, outcome
    try{
        let response = await axios.post('/api/auth/login', {
            email:email,
            password:password
        })
        statuscode = response.status
        message = ""
        outcome = true
        removeToken()
        setToken(response.data.token)

    }
    catch(error){
        statuscode = 0
        if (error.response){
            if (error.response.status === 403) {
                message = "Invalid credentials. Please try again."
            }
        }
        else message = "Error logging in. Please try again."
        statuscode = error.response.status
        outcome = false
    }
    finally{
        return {
            statuscode: statuscode,
            message: message,
            outcome: outcome
        }
    }

}
