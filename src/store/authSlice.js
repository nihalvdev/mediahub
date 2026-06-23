import { createSlice } from '@reduxjs/toolkit'

const getUserDataFromLocalStorage = () => {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
}
const getAdminStatusFromLocalStorage = () => {
    const data = localStorage.getItem('isAdmin')
    return data ? JSON.parse(data) : false
}

const tokenFromLocalStorage = localStorage.getItem('accessToken')
const userDataFromLocalStorage = getUserDataFromLocalStorage()
const adminStatusFromLocalStorage = getAdminStatusFromLocalStorage()

const initialState = {
    status: !!tokenFromLocalStorage,
    userData: userDataFromLocalStorage,
    isAdmin: adminStatusFromLocalStorage
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload.user
            state.isAdmin = action.payload.isAdmin
        },
        logout: (state) => {
            state.status = false
            state.userData = null
            state.isAdmin = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer