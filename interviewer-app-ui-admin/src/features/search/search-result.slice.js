import {createSlice} from 'redux-starter-kit'
import {searchQuestionsAPI} from "../../service/question.service";


const searchResultSlice = createSlice({
    slice: 'searchResult',
    initialState: {questions: [], numberOfQuestionsToShow: 10, isGlobalOpen: false},
    reducers: {
        searchQuestionsSuccess(state, action) {
            state.questions = action.payload.map(q => {
                return {...q, isOpen: state.isGlobalOpen}
            });
        },
        searchQuestionsFailure(state, action) {
            state.error = action.payload;
        },
        openAllQuestions(state, action) {
            state.isGlobalOpen = true;
            state.questions = state.questions.map(q => {
                return {...q, isOpen: true}
            });
        },
        closeAllQuestions(state, action) {
            state.isGlobalOpen = false;
            state.questions = state.questions.map(q => {
                return {...q, isOpen: false}
            });
        },
        changeQuestionOpenness(state, action) {
            // TODO: Optimize performance if it's needed
            state.questions = state.questions.map(question => {
                if (question.id === action.payload) {
                    question.isOpen = !question.isOpen;
                }
                return question;
            });
        },

        removeQuestionFromSearch(state, action) {
            console.log("removeQuestionFromSearch " + action.payload);
            state.questions = state.questions.filter(question => question.id !== action.payload);
        },

        setNumberOfQuestionsToShow(state, action) {
            state.numberOfQuestionsToShow = action.payload;
        }

    }
});

export const {
    searchQuestionsSuccess, searchQuestionsFailure, openAllQuestions, closeAllQuestions,
    changeQuestionOpenness, setNumberOfQuestionsToShow, removeQuestionFromSearch
} = searchResultSlice.actions;

export default searchResultSlice.reducer;

export const searchQuestions = (searchText, tags, inputPayload, numberOfQuestionsToShow) => async dispatch => {
    try {
        const questions = await searchQuestionsAPI(searchText, tags, inputPayload, numberOfQuestionsToShow);
        dispatch(searchQuestionsSuccess(questions));
    } catch (err) {
        dispatch(searchQuestionsFailure(err.toString()))
    }
}