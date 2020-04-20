import React from 'react';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import compose from 'recompose/compose'
import PropTypes from "prop-types";
import Appbar from "./appbar";
import Paper from "@material-ui/core/Paper";
//import SweetAlert from 'sweetalert2-react'


const useStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fff',
        height: window.innerHeight,

    },
    paper: {
        margin: '4%',
        height: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: 'whitesmoke',
        backgroundColor: 'lightgrey',


    },
    mygridclass: {
        marginTop:  theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    mymessage:{
        marginTop:  theme.spacing(4),
        marginBottom: theme.spacing(6)
    },


    enter: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        fontStyle: 'italic',
        fontSize: '14sp'
    },
    statusmessage: {
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(1)
    },



});

class Start extends React.Component {

    constructor(props){
        super(props);
        let messageToShow= '';

        this.state= {
            status: 'Game On!',
            currentTimer: 5,
            currentWord: 'Dyslexia',
            countClicked: 0,
            mytext: '',
            buttonDisabled: false,
            textfieldDisabled: false,
            show: true,
            alertTitle: 'START',
            alertText: 'Hone your typing skills!',
            buttonText: 'START',
            message: messageToShow,
            messageSize: 'h6',
            buttoncolor: 'default'
        }
    }
    componentDidMount() {
        if(window.innerWidth<=414){
            this.setState({
                messageSize: 'body1'
            })
        }

    }

    handleButton=(e)=>{
        //
        //console.log(e)
        this.props.history.push({pathname:'/play', state:{difficultymode: e} });

    }


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Appbar/>

                <div className={classes.root}>


                    <Grid container spacing={0} >

                        <Grid item xs={12} sm={3}>
                            {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={10}>

                                {/*<Typography className={classes.timer} variant={"h3"}>{this.state.currentTimer} s</Typography>*/}


                                <Typography className={classes.mygridclass} variant={"h2"} >{"START GAME"}</Typography>


                                <Typography className={classes.mymessage} variant={this.state.messageSize} >{"Let's see how good you are at typing"}</Typography>
                                <div className={classes.difficultymode}>
                                    <Button color={this.state.buttoncoloreasy} disabled={this.state.buttonDisabled} variant="contained" onClick={(e)=>this.handleButton('Easy')}><Typography variant={"h5"}> {"EASY"}</Typography></Button>
                                </div>
                                <div className={classes.difficultymode}>
                                    <Button color={this.state.buttoncolor} disabled={this.state.buttonDisabled} variant="contained" onClick={(e)=>this.handleButton('Medium')}><Typography variant={"h5"}> {"MEDIUM"}</Typography></Button>
                                </div>
                                <div className={classes.difficultymode}>
                                    <Button color={this.state.buttoncolor} disabled={this.state.buttonDisabled} variant="contained" onClick={(e)=>this.handleButton('Hard')}><Typography variant={"h5"}> {"HARD"}</Typography></Button>
                                </div>

                                <Typography className={classes.enter}  >Select difficulty mode</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                        </Grid>

                    </Grid>

                </div>
            </React.Fragment>
        );
    }
}
Start.propTypes ={
    classes: PropTypes.object.isRequired
}

export default compose(withRouter, withStyles(useStyles))(Start);
