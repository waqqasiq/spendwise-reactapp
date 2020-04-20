import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(2),
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Type of Income</InputLabel>
                <Select

                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={props.onChange}
                    label="Type of Income"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Salary'}>Salary</MenuItem>
                    <MenuItem value={'Business'}>Business</MenuItem>
                    <MenuItem value={'Loan'}>Loan</MenuItem>
                    <MenuItem value={'Gift'}>Gift</MenuItem>
                    <MenuItem value={'Tuition'}>Tuition</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>

                </Select>
            </FormControl>

        </div>
    );
}