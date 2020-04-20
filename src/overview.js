import React from 'react';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

//import axios from "axios";
import {Button, TextField} from "@material-ui/core";

import { withRouter } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import BottomNav from './bottomnav'
import { Divider } from '@material-ui/core';

import compose from 'recompose/compose'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



import axios from "axios";
import Config from "./config";


const useStyles = theme => ({
    card: {
        display: 'flex',
        backgroundColor: 'black',
        elevation: '50',

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

function getCurrentMonthName(){

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    if(month===1){
        return 'Jan';
    }
    else if(month===2){
        return 'Feb'
    }
    else if(month===3){
        return 'Mar'
    }
    else if(month===4){
        return 'Apr'
    }
    else if(month===5){
        return 'May'
    }
    else if(month===6){
        return 'Jun'
    }
    else if(month===7){
        return 'Jul'
    }
    else if(month===8){
        return 'Aug'
    }
    else if(month===9){
        return 'Sep'
    }
    else if(month===10){
        return 'Oct'
    }
    else if(month===11){
        return 'Nov'
    }
    else if(month===12){
        return 'Dec'
    }
}
function getCurrentYear(){
    let newDate = new Date();
    let currentYear = newDate.getFullYear();
    return currentYear
}

class Overview extends React.Component {


    constructor(props){
        super(props);
        let data = [


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
            currentMontName: getCurrentMonthName(),
            currentYear: getCurrentYear(),
            totalincome: 0,
            totalexpense: 0,
            responseEmpty: <div></div>


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
        //
        // this.setState({
        //     totalincome: 44000,
        //     totalexpense: 19000
        // })

        let temp = [];
        let toastMessageArr = [];
        let temp_comment = [];
        //console.log('userid: ',localStorage.getItem('userid'));
        axios.get(Config.base_url+'/expenselatest', {
            headers: {"Authorization" : localStorage.getItem('token') }, params:{'userid': localStorage.getItem('userid')}},
        ).then(res=>{

            //console.log('res data output: ',res.data.output); //current month latest expense comes as output
            if(res.data.output){
                if(res.data.output.length>=1){
                    temp.push(res.data.output[0]);
                    if(res.data.output.length>=2){
                        temp.push(res.data.output[1]);

                    }
                }
                else{
                        this.setState({
                            responseEmpty: this.responseEmptyDiv()
                        })
                    }


                this.setState({
                    data: temp
                });


                axios.get(Config.base_url+'/totals', {
                    headers: {"Authorization" : localStorage.getItem('token') }, params:{'userid': localStorage.getItem('userid')}},
                ).then(res=>{

                    //console.log('totals res data output: ', res.data.output); //current month latest expense comes as output
                    if(res.data.output.length>0){
                        this.setState({
                            totalexpense: res.data.output[0].totalexpense,
                            totalincome: res.data.output[0].totalincome
                        })
                    }


                });
            }


        });




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
        this.props.history.push('/addexpense');
    }


    handleIncome=(e)=>{
        this.props.history.push('/addincome');
    }
    handleSignOut=(e)=>{

        axios.get(Config.base_url+'/signout').then(res=>{
            if(res.data.success){
                localStorage.removeItem('userid');
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                this.props.history.push('/');
            }
        })
        //this.componentDidMount();
    }
    responseEmptyDiv(){
        return (<div >


            <Grid  container spacing={0} >

                <Grid item xs={12} sm={3}>
                    {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                </Grid>

                <Grid item xs={12} sm={6} >
                    <Card >
                        <CardContent >
                            <Typography style={{textAlign: 'center', color: 'dimgrey'}} component="h6" variant="h6">{this.state.currentMontName+' '+this.state.currentYear}</Typography>



                            <div style={{ width:'100%', display:'inline-block', color: 'dimgrey'}}>
                                <div  style={{float: 'left'}}>
                                    <Typography variant={'subtitle1'} >{'Expense'} </Typography>

                                </div>
                                <div  style={{float: 'right'}}>
                                    <Typography variant={'subtitle1'} >{'Income'} </Typography>

                                </div>
                            </div>
                            <div style={{ width:'100%', display:'inline-block'}}>
                                <div  style={{float: 'left'}}>
                                    <Typography variant={'h5'} >&#2547; {this.state.totalexpense} </Typography>

                                </div>
                                <div  style={{float: 'right'}}>
                                    <Typography variant={'h5'} >&#2547; {this.state.totalincome} </Typography>

                                </div>
                            </div>



                        </CardContent>
                    </Card>
                    <Typography style={{marginTop: '15px'}} variant="subtitle1" color="textSecondary">{"Recent Expenses"}</Typography>
                    <Divider style={{marginBottom: '10px'}} variant={'fullWidth'}/>
                    <div style={{textAlign: 'center', fontStyle: 'italic', marginBottom: '20px', marginTop:'45px'}}>
                        <Typography  variant={'subtitle1'}>No expense recorded this month</Typography>
                    </div>

                    <div style={{ marginBottom:'200px', textAlign:'center'}}>
                        <Typography  variant={'subtitle1'}>Swipe right for more </Typography>

                        <KeyboardArrowRightIcon/></div>

                    <div style={{marginTop: '15px'}}>
                        <Button  onClick={this.handleIncome} style={{width: '50%'}}  variant="contained" color="primary">
                            ADD INCOME
                        </Button>
                        <Button style={{width: '50%'}}   variant="contained" color="secondary" onClick={this.handleExpense}>
                            ADD EXPENSE
                        </Button>
                    </div>
                    <div style={{marginTop: '15px'}}>
                        <Button fullWidth  variant="contained" color="default" onClick={this.handleSignOut}>
                            SIGN OUT
                        </Button>
                    </div>
                    {/*<Fab color={"secondary"} aria-label={'hello'} className={classes.fab} >*/}
                    {/*    <AddIcon  />*/}
                    {/*</Fab>*/}

                    {/*<BottomNav />*/}





                    {/*<BottomNavigation style={{position: 'fixed'}}>*/}

                    {/*    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
                    {/*    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />*/}
                    {/*    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}

                    {/*</BottomNavigation>*/}




                </Grid>
                <Grid item xs={12} sm={3}>
                    {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                </Grid>

            </Grid>



        </div>)
    }
    //
    //
    render(){

        const classes =  this.props;
        //const theme = this.props;
        //console.log('state data ', this.state.data);
        //console.log('playing ', this.state.playing);




            if(this.state.data.length===2){return(
            <div >


                <Grid className={classes.cardgrid} container spacing={0} >

                    <Grid item xs={12} sm={3}>
                        {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Card >
                            <CardContent >
                                <Typography style={{textAlign: 'center', color: 'dimgrey'}} component="h6" variant="h6">{this.state.currentMontName+' '+this.state.currentYear}</Typography>



                                <div style={{ width:'100%', display:'inline-block', color: 'dimgrey'}}>
                                    <div  style={{float: 'left'}}>
                                        <Typography variant={'subtitle1'} >{'Expense'} </Typography>

                                    </div>
                                    <div  style={{float: 'right'}}>
                                        <Typography variant={'subtitle1'} >{'Income'} </Typography>

                                    </div>
                                </div>
                                <div style={{ width:'100%', display:'inline-block'}}>
                                    <div  style={{float: 'left'}}>
                                        <Typography variant={'h5'} >&#2547; {this.state.totalexpense} </Typography>

                                    </div>
                                    <div  style={{float: 'right'}}>
                                        <Typography variant={'h5'} >&#2547; {this.state.totalincome} </Typography>

                                    </div>
                                </div>



                                <Divider className={classes.divider} orientation="vertical" flexItem/>


                            </CardContent>
                        </Card>
                        <Typography style={{marginTop: '15px'}} variant="subtitle1" color="textSecondary">{"Recent Expenses"}</Typography>
                        <Divider style={{marginBottom: '10px'}} variant={'fullWidth'}/>



                        {/*<div style={{'textAlign':'right'}} >*/}
                        {/*    <SearchIcon color={'secondary'}   />*/}
                        {/*</div>*/}

                        {/*<div className="searchfield"> <TextField name="searchFieldText"  style={{ marginRight:'8px'}} id="filled-search"  type="search" ></TextField><div > </div></div>*/}

                        {


                            this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val, index) =>(




                                <Card className={classes.card} >
                                    {/*<div className={classes.details} style={{backgroundColor: val.row_color}}>*/}
                                        <CardContent className={classes.content}>



                                            <div style={{width:'100%', display:'inline-block'}}>


                                                <div style={{ float:'left'}}>
                                                    <Typography component="h6" variant="h6">{val.date}</Typography>

                                                </div>
                                                <div style={{ float:'right'}}>
                                                    <Typography component="h6" variant="h6"><span style={{color:'#f50057'}}>- </span> &#2547; {' '+val.amount}</Typography>

                                                </div>


                                            </div>
                                            {/*<Typography component="h5" variant="h5">*/}
                                            {/*    {val.song_name}*/}
                                            {/*</Typography>*/}


                                            <Typography variant="subtitle1" color="textSecondary">{"Title: "+ val.title}</Typography>
                                            <Typography variant="subtitle1" color="textSecondary">{"Type: "+ val.type}</Typography>
                                            <Typography variant="subtitle1" color="textSecondary">{"Remarks: "+ val.remarks}</Typography>

                                            {/*<div style={{ float:'left', marginBottom: '10px'}}>*/}
                                            {/*    {(()=>{*/}
                                            {/*        if(val.language==='english'){*/}
                                            {/*            return (<div style={{fontSize:'20px'}}><Badge pill={true} variant={"danger"}>{val.language}</Badge></div>)*/}

                                            {/*            //return <div style={{color: 'red'}}>{val.language}</div>*/}

                                            {/*        }else if(val.language==='bangla'){*/}
                                            {/*            // return (<Badge  variant="info"*/}
                                            {/*            //     classes={{badge: classes.customBadgeBangla}} className={classes.margin}*/}
                                            {/*            //     badgeContent={val.language}></Badge>)*/}
                                            {/*            return (<div style={{fontSize:'20px'}}><Badge pill={true} variant={"info"}>{val.language}</Badge></div>)*/}

                                            {/*            //return(<div style={{marginLeft:'25px'}}><Badge color="secondary" badgeContent=<strong>{val.language}</strong> className={classes.customBadgeBangla}>*/}

                                            {/*            // return <div style={{color: 'blue'}}>{val.language}</div>*/}
                                            {/*        } else if(val.language='hindi'){*/}
                                            {/*            return (<div style={{fontSize:'20px'}}><Badge pill={true} variant={"warning"}>{val.language}</Badge></div>)*/}

                                            {/*            //return <div style={{color: 'orange'}}>{val.language}</div>*/}

                                            {/*        }*/}
                                            {/*    })()}*/}


                                        </CardContent>

                                    {/*</div>*/}


                                </Card>


                            ))


                        }
                        <div style={{marginTop: '15px'}}>
                            <Button  onClick={this.handleIncome} style={{width: '50%'}}  variant="contained" color="primary">
                                ADD INCOME
                            </Button>
                            <Button style={{width: '50%'}}   variant="contained" color="secondary" onClick={this.handleExpense}>
                                ADD EXPENSE
                            </Button>
                        </div>
                        <div style={{marginTop: '15px'}}>
                            <Button fullWidth  variant="contained" color="default" onClick={this.handleSignOut}>
                                SIGN OUT
                            </Button>
                        </div>




                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                    </Grid>

                </Grid>



            </div>)
            }
            else if (this.state.data.length===1){
                return(
                    <div >


                        <Grid className={classes.cardgrid} container spacing={0} >

                            <Grid item xs={12} sm={3}>
                                {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Card >
                                    <CardContent >
                                        <Typography style={{textAlign: 'center', color: 'dimgrey'}} component="h6" variant="h6">{this.state.currentMontName+' '+this.state.currentYear}</Typography>



                                        <div style={{ width:'100%', display:'inline-block', color: 'dimgrey'}}>
                                            <div  style={{float: 'left'}}>
                                                <Typography variant={'subtitle1'} >{'Expense'} </Typography>

                                            </div>
                                            <div  style={{float: 'right'}}>
                                                <Typography variant={'subtitle1'} >{'Income'} </Typography>

                                            </div>
                                        </div>
                                        <div style={{ width:'100%', display:'inline-block'}}>
                                            <div  style={{float: 'left'}}>
                                                <Typography variant={'h5'} >&#2547; {this.state.totalexpense} </Typography>

                                            </div>
                                            <div  style={{float: 'right'}}>
                                                <Typography variant={'h5'} >&#2547; {this.state.totalincome} </Typography>

                                            </div>
                                        </div>



                                        <Divider className={classes.divider} orientation="vertical" flexItem/>


                                    </CardContent>
                                </Card>
                                <Typography style={{marginTop: '15px'}} variant="subtitle1" color="textSecondary">{"Recent Expenses"}</Typography>
                                <Divider style={{marginBottom: '10px'}} variant={'fullWidth'}/>



                                {/*<div style={{'textAlign':'right'}} >*/}
                                {/*    <SearchIcon color={'secondary'}   />*/}
                                {/*</div>*/}

                                {/*<div className="searchfield"> <TextField name="searchFieldText"  style={{ marginRight:'8px'}} id="filled-search"  type="search" ></TextField><div > </div></div>*/}

                                {


                                    this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val, index) =>(




                                        <Card className={classes.card} >
                                            {/*<div className={classes.details} style={{backgroundColor: val.row_color}}>*/}
                                            <CardContent className={classes.content}>


                                                <div style={{width:'100%', display:'inline-block'}}>


                                                    <div style={{ float:'left'}}>
                                                        <Typography component="h6" variant="h6">{val.date}</Typography>

                                                    </div>
                                                    <div style={{ float:'right'}}>
                                                        <Typography component="h6" variant="h6"> <span style={{color:'#f50057'}}>-</span> &#2547; {' '+val.amount}</Typography>

                                                    </div>


                                                </div>
                                                {/*<Typography component="h5" variant="h5">*/}
                                                {/*    {val.song_name}*/}
                                                {/*</Typography>*/}


                                                <Typography variant="subtitle1" color="textSecondary">{"Title: "+ val.title}</Typography>
                                                <Typography variant="subtitle1" color="textSecondary">{"Type: "+ val.type}</Typography>
                                                <Typography variant="subtitle1" color="textSecondary">{"Remarks: "+ val.remarks}</Typography>



                                            </CardContent>

                                            {/*</div>*/}


                                        </Card>


                                    ))


                                }
                                <div style={{marginTop: '180px'}}>
                                    <Button  onClick={this.handleIncome} style={{width: '50%'}}  variant="contained" color="primary">
                                        ADD INCOME
                                    </Button>
                                    <Button style={{width: '50%'}}   variant="contained" color="secondary" onClick={this.handleExpense}>
                                        ADD EXPENSE
                                    </Button>
                                </div>
                                <div style={{marginTop: '15px'}}>
                                    <Button fullWidth  variant="contained" color="default" onClick={this.handleSignOut}>
                                        SIGN OUT
                                    </Button>
                                </div>


                            </Grid>
                            <Grid item xs={12} sm={3}>
                            </Grid>

                        </Grid>



                    </div>
                )
            }
            else{
               return(
                   <div>{this.state.responseEmpty}</div>
                   )
            }


    }
}
export default compose(withRouter, withStyles(useStyles))(Overview);