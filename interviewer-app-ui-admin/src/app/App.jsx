import React, {useEffect} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {SearchQuestions} from "../features/search/search-questions.component";
import {SyncQuestion} from "../features/search/sync-questions.component";
import {searchQuestions} from "../features/search/search-result.slice";
import {useDispatch} from "react-redux";
import {NewQuestionDialog} from "../features/question/new-question-dialog.component";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {DeleteQuestionDialog} from "../features/question/delete-question-dialog.component";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchQuestions("java"));
    }, []);

    return (<>
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/*<CameraIcon className={classes.icon}/> TODO: ADD A NICE ICON */}
                        <Typography variant="h6" color="inherit" noWrap>
                            Interviewer Admin UI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <SearchQuestions/>
                    <SyncQuestion/>
                    <NewQuestionDialog/>
                    <DeleteQuestionDialog/>
                </main>
            </React.Fragment>
        </>
    );
}

export default App;
