import React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-light";
import coy from "react-syntax-highlighter/dist/cjs/styles/prism/coy";

export function CodeBlock ({language, value}) {

    console.log(language);
    console.log(value);

    return (<>
        {language}
        {/*<SyntaxHighlighter language={language} style={coy}>*/}
        {/*    {value}*/}
        {/*</SyntaxHighlighter>*/}
    </>);
}


