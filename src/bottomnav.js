import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles({
    root: {
        width: 'inherit',
        position: 'fixed',
        bottom: 45,
        right: 35,
        backgroundColor: 'inherit'

    },
    // fab: {
    //     position: 'fixed'
    //     // backgroundColor: 'grey'
    // },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <Fab color={"secondary"} aria-label={'hello'} className={classes.fab} >
                <AddIcon  />
            </Fab>
        </BottomNavigation>
    );
}