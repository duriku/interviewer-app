import React from 'react';

export function NewQuestion({question, setQuestion, submitQuestion, newQuestion}) {
    console.log("question");
    console.log(question);
    const {id, title, answer, tags} = question;
    return (<>
        <p>
            Add a new question
        </p>
        <button type="button" onClick={newQuestion}>New Question</button>
        <div>
            Id:
            <input type="text"
                   value={id}
                   onChange={e => setQuestion({...question, id: e.target.value})}/><br/><br/>

            Question:
            <input type="text"
                   value={title}
                   onChange={e => setQuestion({...question, title: e.target.value})}/><br/><br/>

            Answer:
            <textarea value={answer} onChange={e => setQuestion({...question, answer: e.target.value})}/><br/><br/>

            Tags:
            <input type="text"
                   value={tags}
                   onChange={e => setQuestion({...question, tags: e.target.value})}/>
            <button type="button" onClick={submitQuestion}>Add Question</button>
        </div>
    </>);
}