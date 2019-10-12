import {createSlice} from 'redux-starter-kit'

const searchSlice = createSlice({
    slice: 'search',
    initialState: {searchText: '', searchTags: []},
    reducers: {
        changeSearchText(state, action) {
            state.searchText = action.payload;
        },
        addSearchTag(state, action) {
            state.searchTags.push(action.payload);
        },
        removeSearchTag(state, action) {
            state.searchTags = state.searchTags.filter(tag => action.payload !== tag);
        }
    }
});

export const {changeSearchText, addSearchTag, removeSearchTag} = searchSlice.actions;

export default searchSlice.reducer;