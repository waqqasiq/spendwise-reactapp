import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

//import axios from "axios";
import {TextField} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
//import ButtonCustom from "./button";
import Badge from "react-bootstrap/Badge";
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import Config from "./config";

const useStyles = theme => ({
    card: {
        display: 'flex',
        backgroundColor: 'black',
        elevation: '50',
        position: 'relative',

    },
    details: {
        display: 'flex',
        flexDirection: 'column',

    },
    content: {
        flex: '1 0 auto',

    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    button: {
        margin: theme.spacing(1),
        display:'flex',
        backgroundColor: "#000",
        color: "#fff",
        '&:hover': {
            background: "#1a2d69",
        },

    },
    input: {
        display: 'none',
    },
    navBar:{
        backgroundColor: 'indigo'
    },
    fab: {
        position: "fixed"
    }

});
const responseEmptyDiv = (<div  >

    <Grid  container spacing={0}>

        <Grid item xs={12} sm={3}>
            {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
        </Grid>

        <Grid style={{textAlign:'center', marginTop:'50px', paddingTop:'100px', paddingBottom:'300px'}} item xs={12} sm={6}>

            <div style={{marginBottom:'15px'}}>
                <Typography variant={'body2'}>No monthly summary available</Typography>

            </div>

            <Typography variant={'body2'}>Add any income you received or expense you incurred</Typography>

        </Grid>
        <Grid item xs={12} sm={3}>
            {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
        </Grid>
    </Grid>



</div>)
class ExpenseCards extends React.Component {


    constructor(props){
        super(props);
        let data = []
        this.state = {
            screenWidth: props.screenwidth,
            data: data,
            hasData: false,
            comment: '',
            page: 0,
            rowsPerPage: 5,
            loggedIn: false,
            displayMessage:'',
            playing: false,
            backupdata: data,
            searchFieldText:'',
            loaderActive: [],
            textfieldminwidth: '520px',
            textfieldmarginleft: '130px',
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

        let temp = [];
        let toastMessageArr = [];
        let temp_comment = [];

        if(window.innerWidth<500){
            this.setState({
                textfieldminwidth: window.innerWidth*0.50,
                textfieldmarginleft: window.innerWidth*0.28
            })
        }
        axios.get(Config.base_url+'/monthlysummary', {
            headers: {"Authorization" : localStorage.getItem('token') }, params:{'userid': localStorage.getItem('userid')}},
        ).then(res=>{
            // if(res.data.success){
            //
            // }
            if(res.data){
                console.log('resdata: ', res.data);
                if(res.data.length>0){
                    //console.log(res.data.output);
                    res.data.map((val,index)=>{
                        //console.log(val);
                        //console.log(index);
                        let sign = '+';
                        let colorOfSign = '#3f51b5'
                        let difference = val.sumamountmonthlyincome-val.sumamountmonthlyexp;
                        if(difference>0){
                            sign = '+';
                            colorOfSign = '#3f51b5'
                        }else if(difference===0){
                            sign = '';
                        }else if(difference<0){
                            sign = '-';
                            colorOfSign = '#f50057'
                        }
                        difference = Math.abs(difference)

                        temp.push({
                            'monthyear': val.monthyear,
                            'sumamountmonthlyexp': val.sumamountmonthlyexp,
                            'sumamountmonthlyincome': val.sumamountmonthlyincome,
                            'dailyAverageExp': val.dailyAverageExp,
                            'difference': difference,
                            'sign': sign,
                            'colorofsign': colorOfSign

                        })

                    })
                    this.setState({
                        data: temp,
                        backupdata: temp,
                    })
                }
                else{
                    this.setState({
                        responseEmpty: responseEmptyDiv
                    })
                }

            }


        })
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
        // console.log("textFieldName: ", event.target.name);
        // console.log("textFieldValue: ", event.target.value);
        // console.log("stateData: ", this.state.data);

        this.setState({
            [event.target.name]: event.target.value,
        });

        //  console.log("eventTargetVal: ", event.target.value.length)
        //console.log("backupdatalength: ", this.state.backupdata.length)

        let temp_filtered = [];

        if(event.target.value.length===0){
            //console.log("insideIF");
            //console.log("backupdata: ", this.state.backupdata);

            this.setState({
                data: this.state.backupdata,
            })
        }
        else {
            //console.log("insideELSE")

            this.state.backupdata.map(val => {
                if(val.monthyear!==null) {

                    if (val.monthyear.toString().toLowerCase().includes(event.target.value.toLowerCase())) {
                        temp_filtered.push(val);
                    }
                }



            });
            if(temp_filtered.length < this.state.backupdata.length){
                //console.log("temp2 < backupdata")
                this.setState({
                    data: temp_filtered,
                })
            }
        }



    }
    handleDateClick=(e)=>{
        //console.log('e: ', e);
        this.props.history.push({pathname:'/editexpense', state: {expenseData: e}})
    }
    handleSearchIcon=(e)=>{
        document.getElementById('filled-search').style.visibility = 'visible';
        //document.getElementById('filled-search').style.display = 'inline-block';
        document.getElementById('filled-search').focus();
    }
    //
    //
    render(){



        const classes =  this.props;
        const theme = this.props;
        //console.log('state data ', this.state.data);
        //console.log('playing ', this.state.playing);


        if(this.state.data.length>0 || this.state.searchFieldText!==''){
            return (

                <div  style={{height: (window.innerHeight-100)}}>

                    <Grid container spacing={0}>

                        <Grid item xs={12} sm={3}>
                            {/*<Paper className={classes.paper}>xs=12 sm=3</Paper>*/}
                        </Grid>

                        <Grid item xs={12} sm={6}>



                            <div className={'searchField'}>
                                <TextField name='searchFieldText' style={{marginBottom:'15px', marginRight:'10px', marginLeft:this.state.textfieldmarginleft, display:'inline-block', minWidth:this.state.textfieldminwidth, textAlign:'right'}} id='filled-search' type='search' onChange={this.handleSearchFieldChange} placeholder={'search using keyword'}></TextField>

                                <div style={{'textAlign':'right', display:'inline-block'}}  >

                                    <SearchIcon onClick={this.handleSearchIcon} color={'secondary'}   />
                                </div>

                            </div>


                            {/*<div className="searchfield"> <TextField name="searchFieldText"  style={{ marginRight:'8px'}} id="filled-search"  type="search" ></TextField><div > </div></div>*/}

                            {
                                this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val, index) =>(


                                    <Card className={classes.card} >
                                        <div className={classes.details} style={{backgroundColor: val.row_color}}>
                                            <CardContent className={classes.content} >

                                                <div style={{width:'100%', display:'inline-block'}}>
                                                    <div style={{ float:'left'}}>
                                                        <Typography  name={'date'} component="h6" variant="h6">{val.monthyear}</Typography>

                                                    </div>
                                                    <div style={{ float:'right'}}>
                                                        <Typography component="h6" variant="h6"> <span style={{color: val.colorofsign}}>{val.sign}</span> &#2547; {' '+ val.difference}</Typography>

                                                    </div>



                                                </div>
                                                {/*<Typography component="h5" variant="h5">*/}
                                                {/*    {val.song_name}*/}
                                                {/*</Typography>*/}


                                                <Typography variant="subtitle1" color="textSecondary">{"Expense: "+ val.sumamountmonthlyexp}</Typography>
                                                <Typography variant="subtitle1" color="textSecondary">{"Income: "+ val.sumamountmonthlyincome}</Typography>
                                                <Typography variant="subtitle1" color="textSecondary">{"Daily Average Expense: "+ val.dailyAverageExp}</Typography>



                                                <div className={classes.controls}>

                                                    <div style={{textAlign:'center'}} className={val.row_color}>


                                                    </div>

                                                </div>
                                                <div style={{textAlign: 'center', fontSize:'30px'}}>

                                                </div>

                                            </CardContent>

                                        </div>

                                    </Card>

                                ))


                            }



                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={this.state.data.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />



                        </Grid>
                        <Grid item xs={12} sm={3}>
                        </Grid>

                    </Grid>


                </div>

            );

        }
        else{
            return(<div>{this.state.responseEmpty}</div>)
        }

    }
}
export default withRouter (ExpenseCards);