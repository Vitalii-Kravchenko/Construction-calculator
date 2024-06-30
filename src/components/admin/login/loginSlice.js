import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
    logged: JSON.parse(localStorage.getItem('logged'))
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.logged = action.payload;
        }
    },
})

const {reducer, actions} = loginSlice;

export const {setLoginStatus} = actions;

export default reducer;