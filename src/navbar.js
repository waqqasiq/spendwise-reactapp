import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from "clsx";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DescriptionIcon from '@material-ui/icons/Description';
import LogoutIcon from '@material-ui/icons/AccountCircle';
import Divider from "@material-ui/core/Divider";
import logo from './radio-foorti.png'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor: '#1a2d69'
    }


});

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            left: false,
            searchFieldToggle: 'inline-block',
            searchIcon: 'inline-block',
        }
    }



    toggleDrawer(val){
        this.setState({
            left: val
        })
    }
    routeTo(index, val){

        console.log(index +" "+ val)

        console.log("index",index);
        if(index===0){
            console.log("In 0");
            this.props.history.push('/new-songs');
            //return "/ad-report-dashboard";
        }
        else if(index===1){
            // return "/ad-report-campaign";
            console.log("In 1");
            this.props.history.push('/approved-songs');
        }
        else if(index===2){
            console.log("In 2 ")
            // return '/ad-report-hourly';
            this.props.history.push('/unapproved-songs');
        }
        else if(index===3){
            console.log("In 3 ")
            // return '/ad-report-hourly';
            localStorage.removeItem('email');
            let sounds = document.getElementsByTagName('audio');
            for(let i=0; i<sounds.length; i++) sounds[i].pause();
            this.props.history.push('/'); //login page
        }
    }
    //
    // handleSearchFieldToggle=()=>{
    //     console.log('handleSearchFieldToggle');
    //
    //     this.setState({
    //         searchFieldToggle: 'block',
    //         searchIcon: 'none',
    //      })
    //     document.getElementById('filledsearch').focus();
    // }
    handleSearchIcon=()=>{

        document.getElementById('filled-search').focus();
    }


    render(){
        console.log('search field: ', this.state.searchFieldToggle);
        const { classes } = this.props;
        const sideList = (
            <div className={classes.fullList}>
                <div style={{textAlign:'center', marginTop:'10px'}}>
                    <img src={logo} width="120" height="50"  />
                </div>

                <List className={classes.list}>

                    <ListItem button key="New Songs" onClick={()=>this.routeTo(0,false)}>
                        <ListItemIcon > <SlowMotionVideoIcon/> </ListItemIcon>
                        <ListItemText primary="New Songs"/>
                    </ListItem>
                    <ListItem button key="Approved Songs" onClick={()=>this.routeTo(1, false)}>
                        <ListItemIcon > <DoneAllIcon /> </ListItemIcon>
                        <ListItemText primary="Approved Songs"/>
                    </ListItem>
                    <ListItem button key="Unapproved Songs" onClick={()=>this.routeTo(2, false)}>
                        <ListItemIcon > <DeleteForeverIcon /> </ListItemIcon>
                        <ListItemText primary="Unapproved Songs"/>
                    </ListItem>
                    <ListItem button key="Logout" onClick={()=>this.routeTo(3, false)}>
                        <ListItemIcon > <LogoutIcon /> </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>

                </List>
                <Divider />




            </div>
        );
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={()=>this.toggleDrawer(true)}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {this.props.title}
                        </Typography>
                        {/*<Button color="inherit" onClick={this.logout}>Logout</Button>*/}
                        <div className="searchfield"> <TextField name="searchFieldText" value={this.props.value} style={{display:this.state.searchFieldToggle, maxWidth: this.props.maxwidth, marginRight:'8px'}} id="filled-search" onChange={this.props.handleSearchFieldChange} type="search" ></TextField><div style={{display: this.state.searchIcon}}> <SearchIcon onClick={this.handleSearchIcon}  /></div></div>
                    </Toolbar>

                </AppBar>

                <SwipeableDrawer
                    open={this.state.left}
                    onClose={()=>this.toggleDrawer(false)}
                    onOpen={()=>this.toggleDrawer(true)}
                >

                    <div
                        tabIndex={0}
                        role="button"
                    >

                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }


}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(withRouter, withStyles(useStyles))(NavBar);



