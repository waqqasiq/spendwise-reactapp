import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Link from '@material-ui/core/Link';
import {Link, withRouter} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import compose from 'recompose/compose'
import PropTypes from "prop-types";
import axios from 'axios'
import SweetAlert from "sweetalert2-react";
import Config from "./config";
//import Config from "./config";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SpendWise | WAQQAS IQBAL

            </Link>{' '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});
let email=''
let password='';
let confirmpass= ''
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            errorAlert: false,
            mismatchAlert: false,
            passwordSmall:false,
            email: '',
            password: '',
            confirmpass:''
        }
        // self = this;
        //this.handleClick = this.handleClick.bind(this)
        //this.routeTo = this.routeTo.bind(this)
    }
    componentDidMount() {
        // if(localStorage.getItem('email')!==null) {
        //     this.props.history.push('/tabs')
        // }
        //document.getElementById('confirmpass').style.color = 'red';
    }
    //
    handleClick=(e)=> {
        //console.log('handleclick called');
        e.preventDefault();
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        confirmpass = document.getElementById('confirmpass').value;
        email = this.state.email;
        password = this.state.password;
        confirmpass = this.state.confirmpass;
        //console.log('pass:', password);
        //console.log('confirmpass:', confirmpass);
        if(this.state.password.length<9){
            this.setState({
                passwordSmall: true
            })
        }else {

            if (this.state.password === this.state.confirmpass) {
                //console.log('pass === confirmpass')
                axios.post(Config.base_url + '/signup', {
                    email: email,
                    pass: password
                }).then(res => {
                    //console.log(res);

                    //console.log('res data success ', res.data.success)
                    if (res.data.success) {
                        localStorage.setItem('email', email);
                        localStorage.setItem('userid', res.data.userid);
                        localStorage.setItem('token', res.data.token);
                        console.log('userid: ', res.data.userid);
                        console.log('token: ', res.data.token);
                        this.props.history.push('/tabs');
                    } else {
                        this.setState({
                            errorAlert: true
                        })
                    }

                })
            } else {
                this.setState({
                    mismatchAlert: true
                })
            }
        }

    }



    handleEmail=(e)=>{
        //console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTextField=(e)=>{
        if(e.target.name==="confirmpass"){
            if(e.target.value===this.state.password){
                //console.log('match')
                document.getElementById('confirmpass').style.color = 'black';
            }else{
                document.getElementById('confirmpass').style.color = 'red';
            }
        }
        this.setState({
            [e.target.name]: e.target.value,
        })

    }
    handleConfirmPass=(e)=>{
        console.log(e.target.value);

        this.setState({
            confirmpass: e.target.value
        })
        if(e.target.value===this.state.pass){
            document.getElementById('confirmpass').style.color = 'red'
        }
        if(e.target.value===this.state.pass){
            document.getElementById('confirmpass').style.color = 'black'
        }
    }

    render() {
        const {classes} = this.props;
        //console.log(this.state.data);
        //console.log(this.state.email);
        //console.log(this.state.pass);

        return (
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={classes.paper}>
                    <SweetAlert
                        show={this.state.errorAlert}
                        title="Sign Up Failed"
                        text="You may have an account already"
                        onConfirm={() => this.setState({ errorAlert: false })}
                    />
                    <SweetAlert
                        show={this.state.mismatchAlert}
                        title="Sign Up Failed"
                        text="Passwords mismatch"
                        onConfirm={() => this.setState({ mismatchAlert: false })}
                    />
                    <SweetAlert
                        show={this.state.passwordSmall}
                        title="Sign Up Failed"
                        text="Password must be atleast 9 characters"
                        onConfirm={() => this.setState({ passwordSmall: false })}
                    />
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleClick}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleTextField}

                        />
                        <div style={{color:'red'}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpass"
                            label="Confirm Password"
                            type="password"
                            id="confirmpass"
                            autoComplete="current-password"
                            onChange={this.handleTextField}

                        />
                        </div>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            //onClick={this.handleClick}
                        >
                            Sign Up
                        </Button>

                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
Login.propTypes ={
    classes: PropTypes.object.isRequired
}


export default compose(withRouter, withStyles(useStyles))(Login);
