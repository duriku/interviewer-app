import React, {useEffect, useState} from 'react';
import {loadQuestions, searchQuestions} from "../service/question.service";
import {QuestionsList} from "./question-list.component";

export function SearchQuestions() {
    const [data, setData] = useState({questions: []});
    const [searchText, setSearchText] = useState("");

    const search = async e => {
        e.preventDefault();
        const questions = await searchQuestions(searchText);
        setData({questions});
    }

    const loadIndex = async e => {
        e.preventDefault();
        const questions = await loadQuestions(searchText);
        setData({questions});
    }

    const editQuestion = async e => {
        e.preventDefault();
        console.log(`edit question ${e.target.id}`);
    }

    const deleteQuestion = async e => {
        e.preventDefault();
        console.log(`delete question`);
    }

    useEffect(() => {
        searchQuestions("java")
            .then(questions => setData({questions}));
    }, []);


    let questions = null;
    if (data.questions && data.questions.length > 0) {
        questions = data.questions.map(({id, title, answer, tags}) =>
            <li key={id}>
                Q: {title} A: {answer} Tags: {tags}
                <button type="button" id={id} onClick={editQuestion}>Edit</button>
                <button type="button" id={id} onClick={deleteQuestion}>Delete</button>
            </li>);
    }

    return (<>
        <QuestionsList searchText={searchText}
                       setSearchText={setSearchText}
                       search={search}
                       loadIndex={loadIndex}
                       questions={questions}/>
    </>);
}



