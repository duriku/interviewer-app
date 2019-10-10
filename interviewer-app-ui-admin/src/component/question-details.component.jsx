import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import {removeQuestion} from "../service/question.service";

export function QuestionDetails({question, setQuestion}) {
    const {id, title, answer, tags} = question;

    const editQuestion = async () => {
        setQuestion(question);
    }

    const deleteQuestion = async () => {
        console.log(id);
        // await removeQuestion(id);
    }

    return (
        <React.Fragment>
            <ExpansionPanel defaultExpanded={false}>
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