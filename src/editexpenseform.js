import React from 'react';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import axios from "axios";
import {Button, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Appbar from './appbar';
import MySelect from './myselect'
import Paper from '@material-ui/core/Paper';
import "react-datepicker/dist/react-datepicker.css";
import Config from "./config";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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

        let expenseData = this.props.location.state.expenseData;
        //console.log('props expense data: ', expenseData);
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
            date: expenseData.date,
            title: expenseData.title,
            amount: expenseData.amount,
            remarks: expenseData.remarks,
            type: expenseData.type,
            timestamp: expenseData.timestamp,
            errorAlert: false,

        }

    }




    handleChangePage =(event, newPage)=> {
        //console.log("In hcp"+newPage)
        this.setState({
            page: newPage,

        })
    }

    handleChangeRowsPerPage=(event)=> {
        //console.log("In hcpp "+event.target.value)
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

        //console.log("handleChange: "+event.target.name + ' ', event.target.value);
        let comments_temp = this.state.comment;


        comments_temp[event.target.name] = event.target.value;

        let temp_data = this.state.backupdata;

        temp_data[event.target.name].comment = event.target.value;

        this.setState({
            comment: comments_temp
        })



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
        }else {

            axios.put(Config.base_url + '/addexpense/' + localStorage.getItem('userid'), {
                    type: this.state.type,
                    date: this.state.date,
                    title: this.state.title,
                    amount: this.state.amount,
                    remarks: this.state.remarks,
                    userid: localStorage.getItem('userid'),
                    timestamp: this.state.timestamp
                },

                {
                    headers: {"Authorization": localStorage.getItem('token')}
                }).then(res => {
                if (res.data.success) {
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
        console.log('handleSetDate');
        //let today = this.getYesterdayDate();
        let yesterday = this.getYesterdayDate();
        console.log(yesterday);
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
    handleDelete=(e)=>{
        console.log('handle del');
        console.log(this.state.date)
        console.log(this.state.title)
        console.log(this.state.type)
        console.log(this.state.timestamp)
        console.log(this.state.remarks)
        console.log(this.state.amount);
        axios.delete(Config.base_url+'/addexpense/'+localStorage.getItem('userid'), {

             headers: {"Authorization" : localStorage.getItem('token'), 'userid':localStorage.getItem('userid'), 'timestamp':this.state.timestamp, 'dt':this.state.date }
            }).then(res=>{
                console.log(res.data.success);
            if(res.data.success){
                this.props.history.push('/tabs')
            }
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

                        <Appbar title={'Update Expense'}/>
                        {/*<Datepicker />*/}


                        <div style={{margin: '15px'}}>
                            <div style={{marginBottom:'15px'}}>
                                <Button onClick={this.handleBack} variant={'contained'}>BACK </Button>
                                <div style={{marginBottom:'15px', float:'right'}}>
                                    <DeleteForeverIcon onClick={this.handleDelete} color={'secondary'} fontSize={'large'}/>
                                </div>
                            </div>



                            <Paper style={{padding:'15px', paddingBottom: '100px'}} elevation={10}>
                                <MySelect onChange={this.handleSelectType} value={this.state.type}/>
                                <div>
                                    <div style={{width: '100%', float: 'left'}}>
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
                                            disabled
                                            fullWidth

                                        />

                                    </div>
                                    {/*<div style={{ float: 'right'}}>*/}

                                    {/*    <Button onClick={this.handleSetDate} variant={'contained'}>Yesterday? </Button>*/}

                                    {/*</div>*/}
                                </div>


                                <div style={{marginTop: '45px'}}>
                                    <TextField
                                        id="title"
                                        name='title'
                                        placeholder={'Title'}
                                        value={this.state.title}
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
                                        value={this.state.amount}

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
                                        value={this.state.remarks}
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