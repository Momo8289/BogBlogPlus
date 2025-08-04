class ApiError extends Error {
    constructor(message) {
        super(message)
        this.name = "ApiError"
    }
}

const apiRequest = async (url, method, body = null, token = null) => {
    const headers = {
        "Content-type": "application/json"
    }
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    let reqBody;
    if(body) {
        reqBody = JSON.stringify(body)
    }

    const response = await fetch("http://localhost:5055/api/" + url, {
        method,
        body: reqBody,
        headers,
    })

    if (!response.ok) {
        throw new ApiError(`Server responded with ${response.status} ${response.statusText}. ${(await response.json())?.message}`)
    }

    return (await response.json())
}

// Tokens
export const tokenLogin = async (username, password) => {
    return apiRequest("token/login", "POST", {
        username,
        password
    })
}

export const tokenLogout = async (token) => {
    return apiRequest("token/logout", "POST", null, token)
}

// Users
export const currentUser = async (token) => {
    return apiRequest("user", "GET", null, token)
}

export const registerUser = async (username, password) => {
    return apiRequest("user", "POST", {
        username,
        password
    })
}

export const updateUser = async (token, username = null, password = null, newPassword = null) => {
    const body = {}
    if (username) body.username = username
    if (password) body.password = password
    if (newPassword) body.new_password = newPassword
    return apiRequest("user", "PUT", body, token)
}

export const deleteUser = async (token) => {
    return apiRequest("user", "DELETE", null, token)
}

export const getUser = async (token, id) => {
    return apiRequest(`user/${id}`, 'GET', null, token)
}

export const getUserPosts = async (token, id) => {
    return apiRequest(`user/${id}/posts`, "GET", null, token)
}

export const getUserLikes = async (token, id) => {
    return apiRequest(`user/${id}/likes`, "GET", null, token)

}

// Posts
export const getPosts = async (token) => {
    return apiRequest("post", "GET", null, token)
}

export const createPost = async (token, title, body) => {
    return apiRequest("post", "POST", {title, body}, token)
}

export const getPost = async (token, id) => {
    return apiRequest(`post/${id}`, "GET", null, token)
}

export const updatePost = async (token, id, body) => {
    return apiRequest(`post/${id}`, "PUT", {body}, token)
}

export const deletePost = async (token, id) => {
    return apiRequest(`post/${id}`, "DELETE", null, token)
}

export const postComments = async (token, id) => {
    return apiRequest(`post/${id}/comments`, "GET", null, token)
}

export const likePost = async (token, id) => {
    return apiRequest(`post/${id}/like`, "POST", null, token)
}

export const unlikePost = async (token, id) => {
    return apiRequest(`post/${id}/like`, "DELETE", null, token)
}

// Comments
export const createComment = async (token, id, body) => {
    return apiRequest("comment", "POST", {post_id: id, body}, token)
}

export const getComment = async (token, id) => {
    return apiRequest(`comment/${id}`, "GET", null, token)
}

export const updateComment = async (token, id, body) => {
    return apiRequest(`comment/${id}`, "PUT", {body}, token)
}

export const deleteComment = async (token, id) => {
    return apiRequest(`comment/${id}`, "DELETE", null, token)
}