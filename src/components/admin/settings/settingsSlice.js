import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

import {useHttp} from "../../../hooks/http.hook";

const settingsAdapter = createEntityAdapter();

export const settingsFetchData = createAsyncThunk(
    'settings/fetchSettings',
    () => {
        const {request} = useHttp();

        return request('/operations');
    }
)

export const settingsSendData = createAsyncThunk(
    'settings/sendSettings',
    async (data) => {
        const {request} = useHttp();

        const itemsArray = Array.isArray(data) ? data : Object.entries(data);

        const updatePromises = itemsArray.map(item => {
            return request(`/operations/${item[0]}`, 'PATCH', {count: item[1]})
        });

        try {
            return await Promise.all(updatePromises);
        } catch (error) {
            console.error('Error:', error);
        }
    }
)

const initialState = settingsAdapter.getInitialState({
    settingsLoadingStatus: 'idle',
    newCostOfWorks: {},
});

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        settingsUpdateOne: settingsAdapter.updateOne,
        setNewCostOfWork: (state, action) => {
            state.newCostOfWorks = {...state.newCostOfWorks, ...action.payload};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(settingsFetchData.pending, state => {
                state.settingsLoadingStatus = 'loading';
            })
            .addCase(settingsFetchData.fulfilled, (state, action) => {
                state.settingsLoadingStatus = 'idle';
                settingsAdapter.setAll(state, action.payload);
            })
            .addCase(settingsFetchData.rejected, state => {
                state.settingsLoadingStatus = 'error';
            })
            .addCase(settingsSendData.pending, state => {
                state.settingsLoadingStatus = 'uploading';
            })
            .addCase(settingsSendData.fulfilled, (state, action) => {
                state.settingsLoadingStatus = 'idle';
            })
            .addCase(settingsSendData.rejected, state => {
                state.settingsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    }
})

export const {selectAll} = settingsAdapter.getSelectors(state => state.settings);

const {reducer, actions} = settingsSlice;

export const {setNewCostOfWork} = actions;

export default reducer;