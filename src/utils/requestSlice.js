import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers:{
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newReqs = state.filter((r) => r._id !== action.payload);
            return newReqs;
        }
    }
});

export const { addRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;