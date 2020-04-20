import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from "clsx";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    // myappbar: {
    //     backgroundColor: '#053F5E'
    // },
    myappbar: {
        backgroundColor: '#3f51b5'
    }

}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.myappbar}>
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    onClick={()=>this.toggleDrawer(true)}*/}
                    {/*    edge="start"*/}
                    {/*    className={clsx(classes.menuButton, this.state.open && classes.hide)}*/}
                    {/*>*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        {props.title}
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}