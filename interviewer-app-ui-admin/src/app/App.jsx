import React, {useEffect} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {SearchQuestions} from "../component/search-questions.component";
import {SyncQuestion} from "../component/sync-questions.component";
import {searchQuestions} from "../features/search/search-result.slice";
import {useDispatch} from "react-redux";
import {NewQuestionDialog} from "../component/new-question-dialog.component";

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
                </main>
            </React.Fragment>
        </>
    );
}

export default App;
