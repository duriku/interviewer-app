import React, {useState} from 'react';
import {createQuestion, updateQuestion} from "../service/question.service";

export function NewQuestion() {
    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    const [tags, setTags] = useState("");
    const [id, setId] = useState("");

    const submitQuestion = async e => {
        e.preventDefault();
        if (id) {
            await updateQuestion({title, answer, tags, questionId: id});
        } else {
            await createQuestion({title, answer, tags});
        }

        setTitle("");
        setAnswer("");
        setTags("");
        setId("");
    }

    return (<>
        <p>
            Add a new question
        </p>
        <div>
            Id:
            <input type="text"
                   value={id}
                   onChange={e => setTitle(e.target.value)}/><br/><br/>

            Question:
            <input type="text"
                   value={title}
                   onChange={e => setTitle(e.target.value)}/><br/><br/>

            Answer:
            <textarea value={answer} onChange={e => setAnswer(e.target.value)}/><br/><br/>

            Tags:
            <input type="text"
                   value={tags}
                   onChange={e => setTags(e.target.value)}/>
            <button type="button" onClick={submitQuestion}>Add Question</button>
        </div>
    </>);
}