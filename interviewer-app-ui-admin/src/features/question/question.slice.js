import {createSlice} from 'redux-starter-kit'
import {createQuestionAPI, removeQuestionAPI, updateQuestionAPI} from "../../service/question.service";
import {removeQuestionFromSearch} from "../search/search-result.slice";

const actionSuccess = (state, action) => {
    state.success = true;
}
const actionFailure = (state, action) => {
    state.success = false;
    state.error = action.payload;
};

const questionSlice = createSlice({
    slice: 'question',
    initialState: {success: true},
    reducers: {
        addNewQuestionSuccess: actionSuccess,
        updateQuestionSuccess: actionSuccess,
        deleteQuestionSuccess: actionSuccess,
        addNewQuestionFailure: actionFailure,
        updateQuestionFailure: actionFailure,
        deleteQuestionFailure: actionFailure
    }
});

export const {
    addNewQuestionSuccess, updateQuestionSuccess, addNewQuestionFailure,
    updateQuestionFailure, deleteQuestionSuccess, deleteQuestionFailure
} = questionSlice.actions;

export default questionSlice.reducer;

export const addNewQuestion = (question) => async dispatch => {
    console.log('addNewQuestion ');
    try {
        await createQuestionAPI(question);
        dispatch(addNewQuestionSuccess());
    } catch (err) {
        dispatch(addNewQuestionFailure(err.toString()))
    }
}

export const updateQuestion = (question) => async dispatch => {
    try {
        await updateQuestionAPI(question);
        dispatch(updateQuestionSuccess());
    } catch (err) {
        dispatch(updateQuestionFailure(err.toString()))
    }
}

export const deleteQuestion = (questionId) => async dispatch => {
    try {
        await removeQuestionAPI(questionId);
        dispatch(removeQuestionFromSearch(questionId));
        dispatch(deleteQuestionSuccess());
    } catch (err) {
        dispatch(deleteQuestionFailure(err.toString()))
    }
}