import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";

import {useHttp} from "../../../hooks/http.hook";

const roomWorksAdapter = createEntityAdapter();

const initialState = roomWorksAdapter.getInitialState({
    roomWorksLoadingStatus: 'idle',
});

export const roomWorksFetchData = createAsyncThunk(
  'roomWorks/fetchRoomWorks',
    () => {
        const {request} = useHttp();

        return request('/operations');
    }
);

const roomWorksSlice = createSlice({
    name: 'roomWorks',
    initialState,
    reducers: {
        roomWorksUpdateOne: roomWorksAdapter.updateOne,
        roomWorksUpdateMany: roomWorksAdapter.updateMany,
    },
    extraReducers: builder => {
        builder
            .addCase(roomWorksFetchData.pending, state => {
                state.roomWorksLoadingStatus = 'loading'
            })
            .addCase(roomWorksFetchData.fulfilled, (state, action) => {
                state.roomWorksLoadingStatus = 'idle';
                roomWorksAdapter.setAll(state, action.payload);
            })
            .addCase(roomWorksFetchData.rejected, state => {
                state.roomWorksLoadingStatus = 'error'
            })
            .addDefaultCase(() => {});
    }
})

export const {selectAll} = roomWorksAdapter.getSelectors(state => state.roomWorks);

const {reducer, actions} = roomWorksSlice;

export default reducer;

export const {
    roomWorksUpdateOne,
    roomWorksUpdateMany
} = actions;