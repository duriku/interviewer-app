import {createSlice} from "redux-starter-kit";
import {emptyQuestion} from "../../constants";

// TODO: RENAME NEW QUESTION SLICE!
const newQuestionSlice = createSlice({
    slice: 'newQuestion',
    initialState: {isNewQuestionDialogOpen: false, isEditQuestionDialogOpen: false,
        isDeleteQuestionDialogOpen: false, question: emptyQuestion},
    reducers: {
        openNewQuestionDialog(state, action) {
            state.isNewQuestionDialogOpen = true;
        },
        editQuestionDialog(state, action) {
            state.isEditQuestionDialogOpen = true;
            state.question = action.payload;
        },
        openDeleteQuestionDialog(state, action) {
            state.isDeleteQuestionDialogOpen = true;
            state.question = action.payload;
        },
        closeNewQuestionDialog(state, action) {
            state.isNewQuestionDialogOpen = false;
            state.isEditQuestionDialogOpen = false;
            state.question = emptyQuestion;
        },
        closeDeleteQuestionDialog(state, action) {
            state.isDeleteQuestionDialogOpen = false;
            state.question = emptyQuestion;
        }
    }
});

export const {openNewQuestionDialog, closeNewQuestionDialog, editQuestionDialog,
    openDeleteQuestionDialog, closeDeleteQuestionDialog} = newQuestionSlice.actions;

export default newQuestionSlice.reducer;