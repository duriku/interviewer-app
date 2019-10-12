import {createSlice} from "redux-starter-kit";
import {emptyQuestion} from "../../constants";

const newQuestionSlice = createSlice({
    slice: 'newQuestion',
    initialState: {isNewQuestionDialogOpen: false, question: emptyQuestion},
    reducers: {
        openNewQuestionDialog(state, action) {
            state.isNewQuestionDialogOpen = true;
        },
        editQuestionDialog(state, action) {
            state.isNewQuestionDialogOpen = true;
            state.question = action.payload;
        },
        closeNewQuestionDialog(state, action) {
            state.isNewQuestionDialogOpen = false;
        }
    }
});

export const {openNewQuestionDialog, closeNewQuestionDialog, editQuestionDialog} = newQuestionSlice.actions;

export default newQuestionSlice.reducer;