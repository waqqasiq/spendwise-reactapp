import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {


        },
    },

}));

export default function ContainedButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<Button variant="contained">Default</Button>*/}
            <Button className={classes.btn} variant="contained" color="primary">
                ADD INCOME
            </Button>
            <Button variant="contained" color="secondary">
                ADD EXPENSE
            </Button>
        </div>
    );
}