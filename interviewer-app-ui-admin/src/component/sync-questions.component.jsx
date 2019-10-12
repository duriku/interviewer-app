import React from 'react';
import {commitQuestionsAPI, reindexQuestionsAPI} from "../service/question.service";
import {useDispatch, useSelector} from "react-redux";
import {closeAllQuestions, openAllQuestions, searchQuestions} from "../features/search/search-result.slice";
import Button from "@material-ui/core/Button";
import {openNewQuestionDialog} from "../features/question/newQuestion.slice";

export function SyncQuestion() {
    const dispatch = useDispatch();
    const {searchText, searchTags} = useSelector(state => state.search);

    const reindex = async () => {
        await reindexQuestionsAPI();
        dispatch(searchQuestions(searchText, searchTags, {loadIndex: true}));
    }

    const commitIndex = async () => {
        await commitQuestionsAPI();
        dispatch(searchQuestions(searchText, searchTags, {loadIndex: true}));
    }

    return (<>
        <br/>
        <Button color="primary" onClick={reindex}>Reindex</Button>
        <Button color="primary" onClick={commitIndex}>Commit (Upload Index)</Button>
        <br/>
        <Button color="primary" onClick={() => dispatch(openNewQuestionDialog())}>New Question</Button>
        <Button color="primary" onClick={() => dispatch(openAllQuestions())}>Open All Questions</Button>
        <Button color="primary" onClick={() => dispatch(closeAllQuestions())}>Close ALl Questions</Button>
    </>);
}