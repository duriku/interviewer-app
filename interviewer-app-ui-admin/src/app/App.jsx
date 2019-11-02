import React, {useEffect} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {SearchQuestions} from "../features/search/search-questions.component";
import {closeAllQuestions, openAllQuestions, searchQuestions} from "../features/search/search-result.slice";
import {useDispatch, useSelector} from "react-redux";
import {NewQuestionDialog} from "../features/question/new-question-dialog.component";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {DeleteQuestionDialog} from "../features/question/delete-question-dialog.component";
import {makeStyles, useTheme} from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import {openNewQuestionDialog} from "../features/question/newQuestion.slice";
import {commitQuestionsAPI, reindexQuestionsAPI} from "../service/question.service";
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import ShortTextOutlinedIcon from '@material-ui/icons/ShortTextOutlined';
import {MarkdownText} from "../features/play/markdown-text.component";

const drawerWidth = 280;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    grow: {
        flexGrow: 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App() {
    const dispatch = useDispatch();
    const {searchText, searchTags} = useSelector(state => state.search);

    useEffect(() => {
        dispatch(searchQuestions("java"));
    }, []);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (<>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/*<CameraIcon className={classes.icon}/> TODO: ADD A NICE ICON */}
                        <Typography variant="h6" color="inherit" noWrap>
                            Interviewer Admin UI
                        </Typography>
                        <div className={classes.grow}/>
                        <Button color="inherit" onClick={() => dispatch(openNewQuestionDialog())}>New Question</Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button onClick={async () => {
                            await commitQuestionsAPI();
                            dispatch(searchQuestions(searchText, searchTags, {loadIndex: true}));
                        }}>
                            <ListItemIcon><CloudUploadOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Commit (Upload Index)"/>
                        </ListItem>
                        <ListItem button onClick={async () => {
                            await reindexQuestionsAPI();
                            dispatch(searchQuestions(searchText, searchTags, {loadIndex: true}));
                        }}>
                            <ListItemIcon><SystemUpdateAltOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Reindex"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => dispatch(closeAllQuestions())}>
                            <ListItemIcon><ShortTextOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Questions Only"/>
                        </ListItem>
                        <ListItem button onClick={() => dispatch(openAllQuestions())}>
                            <ListItemIcon><MenuOpenOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Show Answers"/>
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <SearchQuestions/> <br/>
                    <NewQuestionDialog/>
                    <DeleteQuestionDialog/>
                </main>
            </div>
        </>
    );
}

export default App;
