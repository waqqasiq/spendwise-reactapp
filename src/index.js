import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import ExpenseForm from './expenseform';
import Mytab from './tabs';
import Swipetab from './swipetab';
import Login from './login'
import ExpenseCard from './expensecards'
import AddExpense from './addexpense'
import AddIncome from './addincome'
import SignUp from './signup'
import EditExpense from './editexpenseform'
import EditIncome from './editincomeform'
import MonthlySummary from './monthlysummary'
const Routing = (
    <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        {/*<Route path="/home" component={Home}/>*/}
        <Route path="/tabs" component={Mytab}/>
        <Route path="/expensecards" component={ExpenseCard}/>
        <Route path="/addexpense" component={AddExpense}/>
        <Route path="/editexpense" component={EditExpense}/>
        <Route path="/editincome" component={EditIncome}/>
        <Route path="/addincome" component={AddIncome}/>
        <Route path="/monthlysummary" component={MonthlySummary}/>

    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
