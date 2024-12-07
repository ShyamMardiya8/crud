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
        }
    }
})


export const {addStore} = Slice.actions
export default Slice.reducer