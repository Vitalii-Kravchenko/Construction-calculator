import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

import {useHttp} from '../../../hooks/http.hook';

const totalCostAdapter = createEntityAdapter();

const initialState = totalCostAdapter.getInitialState({
    totalCostLoadingStatus: 'idle',
    exchangeRate: null,
    uah: 0,
    usd: 0
});

export const totalCostFetchExchangeRate = createAsyncThunk(
    'totalCost/fetchExchangeRate',
    () => {
        const {request} = useHttp();

        return request('exchange');
    }
)

const totalCostSlice = createSlice({
    name: 'totalCost',
    initialState,
    reducers: {
        addAmountOfMoney: (state, action) => {
            state.uah += action.payload;
        },
        removeAmountOfMoney: (state, action) => {
            state.uah -= action.payload;
        },
        resetAmountOfMoney: (state) => {
            state.uah = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalCostFetchExchangeRate.pending, state => {
                state.totalCostLoadingStatus = 'loading'
            })
            .addCase(totalCostFetchExchangeRate.fulfilled, (state, action) => {
                state.totalCostLoadingStatus = 'idle';
                state.exchangeRate = action.payload;
            })
            .addCase(totalCostFetchExchangeRate.rejected, state => {
                state.totalCostLoadingStatus = 'error'
            })
            .addDefaultCase(() => {});
    },
})

const {reducer, actions} = totalCostSlice;

export default reducer;

export const {
    addAmountOfMoney,
    removeAmountOfMoney,
    resetAmountOfMoney,
} = actions;