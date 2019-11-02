import React from 'react';
import {useDispatch} from "react-redux";
import {addNewQuestion, updateQuestion} from "../question/question.slice";
import ReactMarkdown from "react-markdown";

export function MarkdownText() {
    const dispatch = useDispatch();

    const textToRender = `An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:

  * this one
  * that one
  * the other one`;


    return (<>
    <p>
        <ReactMarkdown source={textToRender} />
    </p>
    </>);
}


