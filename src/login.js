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
                SpendWise | Waqqas Iqbal

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
let pass=''
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            errorAlert: false,
            email: '',
            pass: '',
        }

    }
    componentDidMount() {
        console.log('localstorage:', localStorage.getItem('userid'))
        if(localStorage.getItem('email')!==null) {
            this.props.history.push('/tabs')
        }
    }
    //
    handleClick=(e)=> {
        console.log('handleclick called');
        e.preventDefault();
        email = document.getElementById('email').value;
        pass = document.getElementById('password').value;

        axios.post(Config.base_url+'/signin', {
            email: email,
            pass: pass
        }).then(res=>{
            //console.log(res);
            if(res.data.success){
                localStorage.setItem('email', email);
                localStorage.setItem('userid', res.data.userid);
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/tabs');

            }else{
                this.setState({
                    errorAlert: true
                })
            }
        })


    }

    routeTo(){
        console.log("In RouteTo")
        // this.props.history.push('/ad-report-dashboard');
        this.state.data.map(val=>{
                if(val.email === email && val.pass === pass){
                    this.props.history.push('/ad-report-dashboard')
                }
            }
        )
    }
    checkLogin(temp){
        console.log("In CheckLogin")
        this.setState({
            logged_in: temp,
        })
        //console.log("stateloggedin ",this.state.logged_in );
        if(this.state.logged_in==1){
            this.props.history.push('/ad-report-dashboard');
        }
        else{
            this.props.history.push('/');
        }

    }
    handleEmail=(e)=>{
        //console.log(e.target.value);
        this.setState({
            [e]: e.target.value
        })
    }
    handlePass=(e)=>{
        //console.log(e.target.value);
        this.setState({
            [e]: e.target.value
        })
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
                        title="Login Failed"
                        text="Please enter correct email and password"
                        onConfirm={() => this.setState({ errorAlert: false })}
                    />
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                            onChange={this.handlePass}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                             //onClick={this.handleClick}
                        >
                            Sign In
                        </Button>
                        <div style={{fontStyle:'italic', float: "right"}}>
                            <Typography variant={'subtitle1'} >Don't have an account? <Link to={'/signup'}>Sign Up here</Link></Typography>
                        </div>

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
