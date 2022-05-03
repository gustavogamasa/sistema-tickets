import { Redirect, Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';




export default props =>
    
        <Switch>
           <Route  exact path ="/" component={SignIn} />
           <Route  exact path ="/register" component={SignUp} />

           <Route  exact path = "/dashboard" component={Dashboard} isPrivate/>

           <Redirect from ='*' to='/' />
           
        </Switch>
        