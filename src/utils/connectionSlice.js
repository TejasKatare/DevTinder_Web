import { createSlice } from "@reduxjs/toolkit"

const connectionSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnetions: (state, action) => null
    }
});

export const { addConnections, removeConnetions } = connectionSlice.actions;

export default connectionSlice.reducer;