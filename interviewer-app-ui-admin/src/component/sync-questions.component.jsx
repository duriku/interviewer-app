import React from 'react';
import {commitQuestions, reindexQuestions} from "../service/question.service";

export function SyncQuestion({loadIndex}) {
    const reindex = async e => {
        e.preventDefault();
        await reindexQuestions();
        loadIndex();
    }

    const commitIndex = async e => {
        e.preventDefault();
        await commitQuestions();
        loadIndex();
    }

    return (<>
        <button type="button" onClick={reindex}>Reindex</button>
        <br/>
        <button type="button" onClick={commitIndex}>Commit (Upload Index)</button>
        <br/>
        <br/>
    </>);
}