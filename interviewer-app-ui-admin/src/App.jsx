import React from 'react';
import './App.css';
import {SearchQuestions} from "./component/search-questions.component";
import {NewQuestion} from "./component/new-question.component";
import {SyncQuestion} from "./component/sync-questions.component";

function App() {
    return (<>
            <header className="App-header">
                <SyncQuestion/>
                <NewQuestion/>
                <SearchQuestions/>
            </header>
        </>
    );
}

export default App;
