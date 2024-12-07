import {configureStore} from '@reduxjs/toolkit'
import reducer from '../Slice/Slice'

const Store = configureStore({
    reducer : {
        slice : reducer
    }
})

export default Store