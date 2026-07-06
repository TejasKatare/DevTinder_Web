import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => {
            if(!action) return null;
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        },
        removedFeedTotal: (state, action) => null
    }
});

export const { addFeed, removeFeed, removedFeedTotal } = feedSlice.actions;
export default feedSlice.reducer;