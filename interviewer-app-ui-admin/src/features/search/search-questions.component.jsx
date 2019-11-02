import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChipInput from "material-ui-chip-input";
import {QuestionDetails} from "./question-details.component";
import {useDispatch, useSelector} from "react-redux";
import {searchQuestions} from "./search-result.slice";
import {addSearchTag, changeSearchText, removeSearchTag} from "./search.slice";

export function SearchQuestions() {
    const dispatch = useDispatch();

    const questions = useSelector(state => state.searchResult.questions);
    const {searchText, searchTags} = useSelector(state => state.search);

    const [tagInput, setTagInput] = useState("");

    const handleSearchKeyPress = e => {
        if (e.key === 'Enter') {
            dispatch(searchQuestions(searchText, searchTags));
        }
    }

    let questionDetailList = null;
    if (questions && questions.length > 0) {
        questionDetailList = questions.map((question) =>
            <QuestionDetails
                key={question.id}
                question={question}/>);
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
                onChange={e => dispatch(changeSearchText(e.target.value))}
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
                    dispatch(addSearchTag(e[e.length - 1]))
                }}
                onDelete={(e) => {
                    dispatch(removeSearchTag(e))
                }}
                onUpdateInput={e => setTagInput(e.target.value.replace(' ', ''))}
            />

            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => dispatch(searchQuestions(searchText, searchTags))}
                href="">Search</Button>
        </Container>
        {/*TODO: SPACE WITHBEEN THE SEARCH AND RESULT*/}
        <br/><br/><br/>
        {questionDetailList && <Container maxWidth="xl">
            {questionDetailList}
        </Container>}
    </>);
}



