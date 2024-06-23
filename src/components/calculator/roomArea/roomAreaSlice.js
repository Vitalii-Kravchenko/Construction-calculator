import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

import {useHttp} from '../../../hooks/http.hook';

const roomAreaAdapter = createEntityAdapter();

const initialState = roomAreaAdapter.getInitialState({
    roomAreaLoadingStatus: 'idle',
});

export const roomAreaFetchData = createAsyncThunk(
    'roomArea/fetchRoomArea',
    () => {
        const {request} = useHttp();

        return request('/squares');
    }
)

const roomAreaSlice = createSlice({
    name: 'roomArea',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(roomAreaFetchData.pending, state => {
                state.roomAreaLoadingStatus = 'loading'
            })
            .addCase(roomAreaFetchData.fulfilled, (state, action) => {
                state.roomAreaLoadingStatus = 'idle';
                roomAreaAdapter.setAll(state, action.payload);
            })
            .addCase(roomAreaFetchData.rejected, state => {
                state.roomAreaLoadingStatus = 'error'
            })
            .addDefaultCase(() => {});
    },
})


export const {selectAll} = roomAreaAdapter.getSelectors(state => state.roomArea);

const {reducer} = roomAreaSlice;

export default reducer;