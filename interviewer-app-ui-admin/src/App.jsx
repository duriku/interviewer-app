import React, {useEffect, useState} from 'react';
import './App.css';
import {SearchQuestions} from "./component/search-questions.component";
import {createQuestion, loadQuestions, searchQuestions, updateQuestion} from "./service/question.service";
import {emptyQuestion} from "./constants";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NewQuestionDialog} from "./component/new-question-dialog.component";

function App() {
    const [isDialogOpen, setDialogOpen] = useState(false); // TODO: rename
    const [questions, setQuestions] = useState([]); // TODO: rename
    const [question, setQuestion] = useState(emptyQuestion);
    const [searchText, setSearchText] = useState("");
    const [searchTags, setSearchTags] = useState([]);
    const {id, title, answer, tags} = question;

    const submitQuestion = async e => {
        console.log(question);
        if (id) {
            await updateQuestion({title, answer, tags, questionId: id});
        } else {
            await createQuestion({title, answer, tags});
        }
        setQuestion(emptyQuestion);
    }

    const loadIndex = async () => {
        const questions = await loadQuestions(searchText, searchTags);
        setQuestions(questions);
    };

    const search = async () => {
        const questions = await searchQuestions(searchText, searchTags);
        setQuestions(questions);
    }

    const newQuestion = async () => {
        setQuestion(emptyQuestion);
    }

    useEffect(() => {
        searchQuestions("java")
            .then(questions => setQuestions(questions));
    }, []);

    return (<>
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        {/*<CameraIcon className={classes.icon}/> TODO: ADD A NICE ICON */}
                        <Typography variant="h6" color="inherit" noWrap>
                            Interviewer Admin UI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <SearchQuestions questions={questions}
                                     setQuestion={setQuestion}
                                     search={search}
                                     searchText={searchText}
                                     searchTags={searchTags}
                                     setSearchText={setSearchText}
                                     setSearchTags={setSearchTags}/>


                    {/*<SyncQuestion loadIndex={loadIndex}/>*/}
                    <Button color="primary" onClick={e => setDialogOpen(true)}>New Question</Button>
                    <NewQuestionDialog
                        isDialogOpen={isDialogOpen}
                        setDialogOpen={setDialogOpen}
                        question={question}
                        setQuestion={setQuestion}
                        submitQuestion={submitQuestion}
                    />
                </main>
            </React.Fragment>
        </>
    );
}

export default App;
