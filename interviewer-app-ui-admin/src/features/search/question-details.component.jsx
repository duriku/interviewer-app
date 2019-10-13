import React, {useEffect} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {changeQuestionOpenness, searchQuestions} from "./search-result.slice";
import {editQuestionDialog, openDeleteQuestionDialog} from "../question/newQuestion.slice";
import {deleteQuestion} from "../question/question.slice";

export function QuestionDetails({question}) {
    const dispatch = useDispatch();

    const {id, title, answer, tags, isOpen} = question;

    const editQuestion = async () => {
        dispatch(editQuestionDialog(question));
    }

    const deleteQuestion = async () => {
        dispatch(openDeleteQuestionDialog(question));
    }

    return (
        <React.Fragment>
            <ExpansionPanel defaultExpanded={false} expanded={isOpen}
                            onChange={() => dispatch(changeQuestionOpenness(question.id))}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div>
                        <Typography variant="h6">{title}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography>
                            {answer}
                        </Typography>
                        {/*TODO: DISPLAY TAGS*/}
                    </div>
                </ExpansionPanelDetails>
                <Divider/>

                <ExpansionPanelActions>
                    <Button size="small" color="primary" onClick={editQuestion}>Edit</Button>
                    <Button size="small" color="secondary" onClick={deleteQuestion}>Delete</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </React.Fragment>
    );
}