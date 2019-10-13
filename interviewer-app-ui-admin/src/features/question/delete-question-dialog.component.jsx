import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {closeDeleteQuestionDialog, closeNewQuestionDialog} from "./newQuestion.slice";
import {createSelector} from "reselect";
import {deleteQuestion, updateQuestion} from "./question.slice";

const isDeleteQuestionDialogOpenSelector = createSelector(state => state.newQuestion.isDeleteQuestionDialogOpen, dialog => dialog);
const questionSelector = createSelector(state => state.newQuestion.question, dialog => dialog);

export function DeleteQuestionDialog() {
    const dispatch = useDispatch();
    const isDeleteQuestionDialogOpen = useSelector(isDeleteQuestionDialogOpenSelector);
    const {id, title} = useSelector(questionSelector);

    const closeDialogHandler = () => {
        dispatch(closeDeleteQuestionDialog());
    };

    const submitDialogHandler = () => {
        dispatch(deleteQuestion(id));
        dispatch(closeDeleteQuestionDialog());
    };

    return (<>
        <Dialog
            fullScreen={false}
            open={isDeleteQuestionDialogOpen}
            onClose={closeDialogHandler}
        >
            <DialogTitle id="responsive-dialog-title">{`Do you want to delete "${title}"?`}</DialogTitle>
            <DialogContent>
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


