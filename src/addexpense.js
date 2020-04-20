import React from 'react';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import axios from "axios";
import {Button, TextField} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import BottomNav from './bottomnav'
import { Divider } from '@material-ui/core';
import Appbar from './appbar';
import Datepicker from './datepicker'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import DatePicker from "react-datepicker";
import MySelect from './myselect'
import Paper from '@material-ui/core/Paper';
import "react-datepicker/dist/react-datepicker.css";
import Config from './config'
import SweetAlert from "sweetalert2-react";


const useStyles = theme => ({
    card: {
        display: 'flex',
        backgroundColor: 'black',
        elevation: '50'

    },

    details: {
        display: 'flex',
        flexDirection: 'column',

    },
    content: {
        flex: '1 0 auto',
    },

    input: {
        display: 'none',
    },
    navBar:{
        backgroundColor: 'indigo'
    },
    outergrid: {
        height: window.innerHeight
    },


    // fab: {
    //     position: "fixed"
    // }

});
function  getTodayDate(separator='-'){

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    if(date<10){
        date = '0'+date;
    }

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

class Overview extends React.Component {


    constructor(props){
        super(props);

        let date = new Date();
        let today =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let td = getTodayDate();
        let data = [
            {
                'date': '2020-03-18',
                'title': 'chips',
                'amount': 50,
                'type': 'Food',
                "remarks": 'No remarks'

            },
            {
                'date': '2020-03-20',
                'title': 'chips',
                'amount': 50,
                'type': 'Food',
                "remarks": 'No remarks'

            },



        ]
        this.state = {
            screenWidth: props.screenwidth,
            data: data,
            hasData: false,
            comment: '',
            page: 0,
            rowsPerPage: 10,
            loggedIn: false,
            displayMessage:'',
            playing: false,
            backupdata: [],
            searchFieldText:'',
            loaderActive: [],
            startDate: new Date(),
            date: td,
            title: 'None',
            amount: '',
            remarks: 'None',
            type: '',
            errorAlert: false,

        }

    }




    handleChangePage =(event, newPage)=> {
        console.log("In hcp"+newPage)
        this.setState({
            page: newPage,

        })
    }

    handleChangeRowsPerPage=(event)=> {
        console.log("In hcpp "+event.target.value)
        this.setState({
            rowsPerPage: event.target.value
        })
    }

    //
    componentDidMount() {


        if(localStorage.getItem('userid')===null){
            this.props.history.push('/')
        }

    }
    getYesterdayDate(separator='-'){

        let newDate = new Date();
        newDate.setDate(newDate.getDate()-1);
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if(date<10){
            date = '0'+date;
        }

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    getTodayDate(separator='-'){

        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if(date<10){
            date = '0'+date;
        }

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }


    handleChange=(event)=>{

        console.log("handleChange: "+event.target.name + ' ', event.target.value);
        let comments_temp = this.state.comment;


        comments_temp[event.target.name] = event.target.value;

        let temp_data = this.state.backupdata;

        temp_data[event.target.name].comment = event.target.value;

        this.setState({
            comment: comments_temp
        })

        // this.setState({
        //     data: temp_data
        // })

        // console.log("handleChange: "+event.target.name + ' ', event.target.value);
        // let comments_temp = this.state.comment;
        //
        //
        // comments_temp[event.target.name] = event.target.value;
        //
        // let temp_data = this.state.data;
        //
        // temp_data[event.target.name].comment = event.target.value;
        //
        // let temp_toastMessageArray = this.state.toastMessage;
        //
        // if(temp_toastMessageArray[event.target.name]!='Moved to Approved Songs'){
        //     temp_toastMessageArray[event.target.name] = "Comment Updated";
        // }
        //
        // this.setState({
        //     data: temp_data,
        //     toastMessage: temp_toastMessageArray
        // })

        // })

    }

    handleClick(row,index){

    }

    handleAudio(e, idx){


    }

    //
    handleSearchFieldChange=(event)=>{
        console.log("textFieldName: ", event.target.name);
        console.log("textFieldValue: ", event.target.value);
        console.log("stateData: ", this.state.data);

        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log("eventTargetVal: ", event.target.value.length)
        console.log("backupdatalength: ", this.state.backupdata.length)

        let temp_filtered = [];

        if(event.target.value.length===0){
            console.log("insideIF");
            console.log("backupdata: ", this.state.backupdata);

            this.setState({
                data: this.state.backupdata,
            })
        }
        else {
            console.log("insideELSE")

            this.state.backupdata.map(val => {
                if(val.song_name!==null) {

                    if (val.song_name.toString().toLowerCase().includes(event.target.value.toLowerCase())) {
                        temp_filtered.push(val);
                    }
                }
                if(val.artist!==null) {

                    if (val.artist.toString().toLowerCase().includes(event.target.value.toLowerCase())) {
                        temp_filtered.push(val);
                    }
                }
                if(val.language!=null){
                    if (val.language.toString().toLowerCase().includes(event.target.value.toLowerCase())) {
                        temp_filtered.push(val);
                    }
                }


            });
            if(temp_filtered.length < this.state.backupdata.length){
                console.log("temp2 < backupdata")
                this.setState({
                    data: temp_filtered,
                })
            }
        }



    }
    handleExpense=(e)=>{
        // console.log('state type: ', this.state.type);
        // console.log('state date: ', this.state.date);
        // console.log('state title: ', this.state.title);
        // console.log('state amount: ', this.state.amount);
        // console.log('state remarks: ', this.state.remarks);
        // console.log('userid: ', localStorage.getItem('userid'));
        // console.log('token: ', localStorage.getItem('token'));

        if(this.state.type==='' || this.state.amount===''){
            this.setState({
                errorAlert: true,
            })
        }else{
            axios.post(Config.base_url+'/addexpense', {
                    type: this.state.type,
                    date: this.state.date,
                    title: this.state.title,
                    amount: this.state.amount,
                    remarks: this.state.remarks,
                    userid: localStorage.getItem('userid')},
                { headers: {"Authorization" : localStorage.getItem('token') }
                }).then(res=>{
                if(res.data.success){
                    this.props.history.push('/tabs')
                }
            })
        }


        //this.props.history.push('/addexpense')
    }
    // handleDateChange=(date)=>{
    //     this.setState({
    //         selectedDate: date
    //     })
    // }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleSetDate=(date)=>{
        //console.log('handleSetDate');
        //let today = this.getYesterdayDate();
        let yesterday = this.getYesterdayDate();
        //console.log(yesterday);
        this.setState({
            date: yesterday
        })
    }
    handleDateChange=(e)=>{
        console.log("e target value", e.target.value)
        this.setState({
            date: e.target.value
        })
    }
    handleBack=(e)=>{
        this.props.history.push('/tabs')
    }

    handleTextField=(e)=>{
        console.log(e.target.name +': ', e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSelectType=(e)=>{
        console.log(e.target.value);
        this.setState({
            type: e.target.value
        })

    }


    //
    render(){



        const classes =  this.props;
        const theme = this.props;
        //console.log('state data ', this.state.data);


        return (

            <div >
                <SweetAlert
                    show={this.state.errorAlert}
                    title="Failed"
                    text="Type and Amount must be filled"
                    onConfirm={() => this.setState({ errorAlert: false })}
                />


                <Grid  container spacing={0} >

                    <Grid style={{backgroundColor: 'whitesmoke'}}  item xs={12} sm={3}>
                        {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                    </Grid>

                    <Grid  item xs={12} sm={6} >

                        <Appbar title={'Add Expense'}/>
                        {/*<Datepicker />*/}

                        <div style={{margin: '15px'}}>
                            <div style={{marginBottom:'15px'}}>
                            <Button onClick={this.handleBack} variant={'contained'}>BACK </Button>
                            </div>

                            <Paper style={{padding:'15px', paddingBottom: '100px'}} elevation={10}>
                        <MySelect onChange={this.handleSelectType} value={this.state.type}/>
                        <div>
                        <div style={{width: '50%', float: 'left'}}>
                            <TextField
                                id="date"
                                type="date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                                defaultValue={this.state.date}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />

                        </div>
                            <div style={{ float: 'right'}}>

                                <Button onClick={this.handleSetDate} variant={'contained'}>Yesterday? </Button>

                            </div>
                        </div>


                            <div style={{marginTop: '45px'}}>
                            <TextField
                                id="title"
                                name='title'
                                placeholder={'Title'}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                onChange={this.handleTextField}
                            />
                        </div>
                            <div style={{marginTop: '25px'}}>
                                <TextField
                                    id="amount"
                                    name={'amount'}
                                    placeholder={'Amount'}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                     onChange={this.handleTextField}
                                    type={'number'}
                                />
                            </div>
                            <div style={{marginTop: '25px'}}>
                                <TextField
                                    id="remarks"
                                    name={'remarks'}
                                    placeholder={'Remarks'}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                     onChange={this.handleTextField}
                                />
                            </div>

                        {/*<MuiPickersUtilsProvider utils={MomentUtils}>*/}
                        {/*<Grid container justify="space-around">*/}
                        {/*    <KeyboardDatePicker*/}
                        {/*        margin="normal"*/}
                        {/*        id="date-picker-dialog"*/}
                        {/*        label="Date picker dialog"*/}
                        {/*        format="MM/dd/yyyy"*/}
                        {/*        value={this.state.selectedDate}*/}
                        {/*        onChange={this.handleDateChange}*/}
                        {/*        KeyboardButtonProps={{*/}
                        {/*            'aria-label': 'change date',*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*</MuiPickersUtilsProvider>*/}


                        <div style={{marginTop: '30px', marginBottom: '30px'}}>

                            <Button fullWidth={true}   variant="contained" color="secondary" onClick={this.handleExpense}>
                                SUBMIT
                            </Button>
                        </div>
                            </Paper>
                        {/*<Fab color={"secondary"} aria-label={'hello'} className={classes.fab} >*/}
                        {/*    <AddIcon  />*/}
                        {/*</Fab>*/}

                        {/*<BottomNav />*/}





                        {/*<BottomNavigation style={{position: 'fixed'}}>*/}

                        {/*    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
                        {/*    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />*/}
                        {/*    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}

                        {/*</BottomNavigation>*/}




                        </div>

                    </Grid>
                    <Grid style={{backgroundColor: 'whitesmoke'}}  item xs={12} sm={3}>
                        {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                    </Grid>

                </Grid>



            </div>




        );


    }
}
export default withStyles(useStyles)(Overview);