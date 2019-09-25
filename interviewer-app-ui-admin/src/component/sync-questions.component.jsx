import React, {useState} from 'react';
import {commitQuestions, createQuestion, reindexQuestions} from "../service/question.service";

export function SyncQuestion() {
    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");

    const reindex = async e => {
        e.preventDefault();
        await reindexQuestions();
    }

    const commitIndex = async e => {
        e.preventDefault();
        await commitQuestions();
    }

    return (<>
        <button type="button" onClick={reindex}>Reindex</button><br/>
        <button type="button" onClick={commitIndex}>Commit (Upload Index)</button><br/>
        <br/>
    </>);
}