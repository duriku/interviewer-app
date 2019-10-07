import React from 'react';

export function SearchQuestions({data, searchText, searchTags, search, setSearchText, setSearchTags, editQuestion, deleteQuestion}) {
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
        <p>
            Questions
        </p>

        <div>
            Search Keyword
            <input type="text"
                   value={searchText}
                   onChange={e => setSearchText(e.target.value)}/><br/>

            Search Tags
            <input type="text"
                   value={searchTags}
                   onChange={e => setSearchTags(e.target.value)}/><br/>
            <button type="button" onClick={search}>Search</button>
        </div>
        <ul>
            {questions}
        </ul>
    </>);
}



