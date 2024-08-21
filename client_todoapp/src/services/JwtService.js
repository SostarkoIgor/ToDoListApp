
export function getToken() {
    let token=localStorage.getItem('token')
    return token
    /*if (!token) return null
    try {
        jwtDecode(token)
        return token
    } catch (error) {
        removeToken()
        return null
    }*/
}

export function setToken(token) {
    localStorage.setItem('token', token)
}

export function removeToken() {
    localStorage.removeItem('token')
}



