import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addNewQuestion, updateQuestion} from "../features/question/question.slice";
import {closeNewQuestionDialog} from "../features/question/newQuestion.slice";
import {createSelector} from 'reselect'


const selectDialog = createSelector(state => state.newQuestion.isNewQuestionDialogOpen, dialog => dialog);
const selectQuestion = createSelector(state => state.newQuestion.question, newQuestion => newQuestion);

export function NewQuestionDialog() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(selectDialog, shallowEqual);
    const question = useSelector(selectQuestion, shallowEqual);

    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const closeDialogHandler = () => {
        dispatch(closeNewQuestionDialog());
        setTagInput('');
    };

    const submitDialogHandler = () => {
        closeDialogHandler();
        if (!!question){
            dispatch(updateQuestion({id: question.id, title, answer, tags}));
        } else {
            dispatch(addNewQuestion());
        }
    };

    useEffect(() => {
        setTitle(question.title);
        setAnswer(question.answer);
        setTags(question.tags);
    }, [question]);

    const getDialogTitle = () => question ? `Change (${question.title})?` : "Create a new Question";

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


