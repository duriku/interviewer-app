import React from 'react';

export function QuestionsList({searchText, setSearchText, search, loadIndex, questions}) {
    return (<>
        <p>
            Questions
        </p>

        <div>
            <input type="text"
                   value={searchText}
                   onChange={e => setSearchText(e.target.value)}/>
            <button type="button" onClick={search}>Search</button>
            <button type="button" onClick={loadIndex}>Load Question</button>
        </div>
        <ul>
            {questions}
        </ul>
    </>);
}



