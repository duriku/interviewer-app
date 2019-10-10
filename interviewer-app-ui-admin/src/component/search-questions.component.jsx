import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChipInput from "material-ui-chip-input";
import {QuestionDetails} from "./question-details.component";

export function SearchQuestions({questions, setQuestion, searchText, searchTags, search, setSearchText, setSearchTags}) {
    const [tagInput, setTagInput] = useState("");

    const handleSearchKeyPress = e => {
        if (e.key === 'Enter') {
            search();
        }
    }

    let questionDetailList = null;
    if (questions && questions.length > 0) {
        questionDetailList = questions.map((question) =>
            <QuestionDetails
                key={question.id}
                question={question}
                setQuestion={setQuestion}/>);
    }

    return (<>
        <Container maxWidth="sm">
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="search"
                label="Search"
                name="searchText"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                autoFocus
                onKeyPress={handleSearchKeyPress}
            />

            <ChipInput
                value={searchTags}
                variant="outlined"
                margin="normal"
                fullWidth
                id="tags"
                label="Add tags"
                name="tags"
                autoFocus
                inputValue={tagInput}
                onChange={(e) => {
                    setTagInput('');
                    setSearchTags([...searchTags, e[e.length - 1]]);
                }}
                onDelete={(e) => {
                    setSearchTags(searchTags.filter(tag => e !== tag));
                }}
                onUpdateInput={e => setTagInput(e.target.value.replace(' ', ''))}
            />

            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={search}
                href="">Search</Button>
        </Container>
        {/*TODO: SPACE WITHBEEN THE SEARCH AND RESULT*/}
        <br/><br/><br/>
        {questionDetailList && <Container maxWidth="sm">
            {questionDetailList}
        </Container>}
    </>);
}



