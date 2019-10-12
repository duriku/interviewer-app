import {combineReducers} from 'redux'
import searchResultSlice from '../features/search/search-result.slice';
import searchSlice from '../features/search/search.slice';
import questionSlice from '../features/question/question.slice';
import newQuestionSlice from '../features/question/newQuestion.slice';

export default combineReducers({
    searchResult: searchResultSlice,
    search: searchSlice,
    question: questionSlice,
    newQuestion: newQuestionSlice
});
