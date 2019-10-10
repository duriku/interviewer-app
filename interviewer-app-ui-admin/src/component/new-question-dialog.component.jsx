import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export function NewQuestionDialog({question, setQuestion, submitQuestion, isDialogOpen, setDialogOpen}) {
    const [tagInput, setTagInput] = useState("");

    const closeDialogHandler = () => {
        setDialogOpen(false);
        setTagInput('');
    };

    const {id, title, answer, tags} = question;
    return (<>
        <Dialog
            fullScreen={false}
            open={isDialogOpen}
            onClose={closeDialogHandler}
        >
            <DialogTitle id="responsive-dialog-title">{"Create a new Question"}</DialogTitle>
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
                    onChange={e => setQuestion({...question, title: e.target.value})}
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
                    onChange={e => setQuestion({...question, answer: e.target.value})}
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
                        setQuestion({...question, tags: [...tags, e[e.length - 1]]});
                    }}
                    onDelete={e => setQuestion({...question, tags: tags.filter(tag => e !== tag)})}
                    onUpdateInput={e => setTagInput(e.target.value.replace(' ', ''))
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button
                    color="primary"
                    autoFocus
                    onClick={() => {
                        closeDialogHandler();
                        submitQuestion();
                    }}>Submit</Button>
            </DialogActions>
        </Dialog>
        {/*<p>*/}
        {/*    Add a new question*/}
        {/*</p>*/}
        {/*<button type="button" onClick={newQuestion}>New Question</button>*/}
        {/*<div>*/}
        {/*    Id:*/}
        {/*    <input type="text"*/}
        {/*           value={id}*/}
        {/*           onChange={e => setQuestion({...question, id: e.target.value})}/><br/><br/>*/}

        {/*    Question:*/}
        {/*    <input type="text"*/}
        {/*           value={title}*/}
        {/*           onChange={e => setQuestion({...question, title: e.target.value})}/><br/><br/>*/}

        {/*    Answer:*/}
        {/*    <textarea value={answer} onChange={e => setQuestion({...question, answer: e.target.value})}/><br/><br/>*/}

        {/*    Tags:*/}
        {/*    <input type="text"*/}
        {/*           value={tags}*/}
        {/*           onChange={e => setQuestion({...question, tags: e.target.value})}/>*/}
        {/*    <button type="button" onClick={submitQuestion}>Add Question</button>*/}
        {/*</div>*/}
    </>);
}