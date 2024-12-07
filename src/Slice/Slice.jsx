import {createSlice} from '@reduxjs/toolkit'

const init = JSON.parse(localStorage.getItem("store")) || []

const Slice = createSlice({
    name : "slice",
    initialState : {
        store : init
    },
    reducers :{
        addStore : (state, action) => {
            state.store.push(action.payload)
            localStorage.setItem("store", JSON.stringify(state.store))
        },
        editStore : (state, action) => {
            const {id, updates} = action.payload
            if (state.store) {
                const find = state.store.map((i) => i.id === id ? {...i, ...updates} : i)
                state.store = find
                localStorage.setItem("store", JSON.stringify(state.store))
                alert("data updated successfully")
            }
            else{
                alert("your data is not updated")
            }
        },
        deleteStore : (state, action) => {
            state.store = state.store.filter((i) => i.id === action.payload.id)
            localStorage.setItem("store", JSON.stringify(state.store))
        },
        addSubContact : (state, action) => {
            const {id, values} = action.payload
            const findId = state.store.find((i) => i.id === id)
            if (findId) {
                findId.subContact.push(values)
                localStorage.setItem("store", JSON.stringify(state.store))
            }
        }
    }
})


export const {addStore, editStore, deleteStore, addSubContact} = Slice.actions
export default Slice.reducer