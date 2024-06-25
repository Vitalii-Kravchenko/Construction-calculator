import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

import {useHttp} from '../../../hooks/http.hook';

const roomAreaAdapter = createEntityAdapter();

const initialState = roomAreaAdapter.getInitialState({
    roomAreaLoadingStatus: 'idle',
    roomAreaTotalSize: 0,
    roomAreaCeilingHeight: 0
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
    reducers: {
        roomAreaSetTotalSize: (state, action) => {
            state.roomAreaTotalSize = (action.payload)
        },
        roomAreaSetCeilingHeight: (state, action) => {
            state.roomAreaCeilingHeight = action.payload
        },
    },
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

const {reducer, actions} = roomAreaSlice;

export const {
    roomAreaSetTotalSize,
    roomAreaSetCeilingHeight
} = actions;

export default reducer;