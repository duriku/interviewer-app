import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addNewQuestion, updateQuestion} from "./question.slice";
import {closeNewQuestionDialog} from "./newQuestion.slice";
import {createSelector} from 'reselect'


const isNewQuestionDialogOpenSelector = createSelector(state => state.newQuestion.isNewQuestionDialogOpen, dialog => dialog);
const isEditQuestionDialogOpenSelector = createSelector(state => state.newQuestion.isEditQuestionDialogOpen, dialog => dialog);
const selectQuestion = createSelector(state => state.newQuestion.question, newQuestion => newQuestion);

export function NewQuestionDialog() {
    const dispatch = useDispatch();
    const isNewQuestionDialogOpen = useSelector(isNewQuestionDialogOpenSelector);
    const isEditQuestionDialogOpen = useSelector(isEditQuestionDialogOpenSelector);
    const isDialogOpen = isNewQuestionDialogOpen || isEditQuestionDialogOpen;
    const question = useSelector(selectQuestion);

    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [id, setId] = useState('');

    const closeDialogHandler = () => {
        setTagInput('');
        setTitle('');
        setAnswer('');
        setTags([]);
        setId('');
        dispatch(closeNewQuestionDialog());
    };

    const submitDialogHandler = () => {
        closeDialogHandler();
        if (isEditQuestionDialogOpen) {
            dispatch(updateQuestion({id, title, answer, tags}));
        } else {
            dispatch(addNewQuestion({title, answer, tags}));
        }
    };

    useEffect(() => {
            setId(question.id);
            setTitle(question.title);
            setAnswer(question.answer);
            setTags(question.tags);
    }, [question]);

    const getDialogTitle = () => !!isEditQuestionDialogOpen ? `Change (${question.title})?` : "Create a new Question";

    return (<>
        <Dialog
            fullScreen={false}
            open={isDialogOpen}
            onClose={closeDialogHandler}
        >
            <DialogTitle id="responsive-dialog-title">{getDialogTitle()}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Provide question title, answer and tags
                </DialogContentText>

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="title"
                    name="title"
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    multiline={true}
                    rows={5}
                    rowsMax={15}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="answer"
                    label="answer"
                    name="answer"
                    autoFocus
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                />
                <ChipInput
                    value={tags}
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
                        setTags([...tags, e[e.length - 1]]);
                    }}
                    onDelete={e => setTags(tags.filter(tag => e !== tag))}
                    onUpdateInput={e => setTagInput(e.target.value.replace(' ', ''))
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button
                    color="primary"
                    autoFocus
                    onClick={submitDialogHandler}>Submit</Button>
            </DialogActions>
        </Dialog>
    </>);
}


