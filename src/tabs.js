import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpenseCards from './expensecards'
import IncomeCards from './incomecards'
import Overview from './overview'
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import MonthlySummary from './monthlysummary'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        minHeight: window.innerHeight
        //backgroundColor: theme.palette.background.paper,
    },
    // appbar: {
    //     alignItems: 'center'
    // }
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    if(localStorage.getItem('userid')===null){
        props.history.push('/')
    }


    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Tabs centered={true} value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />

                    <Tab label="Expense" {...a11yProps(1)} />
                    <Tab label="Income" {...a11yProps(2)} />
                    <Tab label="Summary" {...a11yProps(3)} />
                </Tabs>

            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel  value={value} index={0}>
                    <Overview/>
                </TabPanel>
            <TabPanel  value={value} index={1}>
                <ExpenseCards/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <IncomeCards />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div  >

                    <MonthlySummary />


                </div>

            </TabPanel>
            </SwipeableViews>
        </div>
    );
}