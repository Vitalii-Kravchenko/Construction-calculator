import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

import {useHttp} from '../../../hooks/http.hook';

const roomAreaAdapter = createEntityAdapter();

const initialState = roomAreaAdapter.getInitialState({
    roomAreaLoadingStatus: 'idle',
    roomAreaCeilingHeight: 0,
    roomAreaTotalSize: {
        area: 0,
        height: 0
    },
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
        roomAreaSetTotalSizeArea: (state, action) => {
            state.roomAreaTotalSize.area = (action.payload)
        },
        roomAreaSetTotalSizeHeight: (state, action) => {
            state.roomAreaTotalSize.height = (action.payload)
        },
        roomAreaSetCeilingHeight: (state, action) => {
            state.roomAreaCeilingHeight = action.payload
        },
        roomAreaUpdateOne: roomAreaAdapter.updateOne,
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
export const {selectById} = roomAreaAdapter.getSelectors(state => state.roomArea);

const {reducer, actions} = roomAreaSlice;

export const {
    roomAreaSetTotalSizeArea,
    roomAreaSetTotalSizeHeight,
    roomAreaSetCeilingHeight,
    roomAreaUpdateOne,
} = actions;

export default reducer;