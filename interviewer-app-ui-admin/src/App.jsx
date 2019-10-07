import React, {useEffect, useState} from 'react';
import './App.css';
import {SearchQuestions} from "./component/search-questions.component";
import {NewQuestion} from "./component/new-question.component";
import {SyncQuestion} from "./component/sync-questions.component";
import {
    createQuestion,
    loadQuestions,
    removeQuestion,
    searchQuestions,
    updateQuestion
} from "./service/question.service";
import {emptyQuestion} from "./constants";

function App() {
    const [data, setData] = useState({questions: []}); // TODO: rename
    const [question, setQuestion] = useState(emptyQuestion);
    const [searchText, setSearchText] = useState("");
    const [searchTags, setSearchTags] = useState("");
    const {id, title, answer, tags} = question;

    const submitQuestion = async e => {
        e.preventDefault();
        if (id) {
            await updateQuestion({title, answer, tags, questionId: id});
        } else {
            await createQuestion({title, answer, tags});
        }

        setQuestion(emptyQuestion);
    }

    const loadIndex = async () => {
        const questions = await loadQuestions(searchText, searchTags);
        setData({questions});
    };

    const search = async e => {
        e.preventDefault();
        const questions = await searchQuestions(searchText, searchTags);
        setData({questions});
    }

    const newQuestion = async e => {
        e.preventDefault();
        setQuestion(emptyQuestion);
    }

    const editQuestion = async e => {
        e.preventDefault();
        setQuestion(data.questions.filter(q => q.id === e.target.id)[0]);
    }

    const deleteQuestion = async e => {
        e.preventDefault();
        await removeQuestion(e.target.id);
    }

    useEffect(() => {
        searchQuestions("java")
            .then(questions => setData({questions}));
    }, []);

    return (<>
            <header className="App-header">
                <SyncQuestion loadIndex={loadIndex}/>
                <NewQuestion
                    newQuestion={newQuestion}
                    question={question}
                    setQuestion={setQuestion}
                    submitQuestion={submitQuestion}
                />
                <SearchQuestions data={data}
                                 deleteQuestion={deleteQuestion}
                                 editQuestion={editQuestion}
                                 search={search}
                                 searchText={searchText}
                                 searchTags={searchTags}
                                 setSearchText={setSearchText}
                                 setSearchTags={setSearchTags}/>
            </header>
        </>
    );
}

export default App;
