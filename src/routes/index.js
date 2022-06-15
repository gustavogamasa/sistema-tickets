import { Switch } from 'react-router-dom';

import Route from './Route'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New'




export default props =>
  
        <Switch>

           <Route  exact path ="/" component={SignIn} />
           <Route  exact path ="/register" component={SignUp} />

           <Route  exact path = "/profilesettings" component={Profile} isPrivate/>
           <Route  exact path = "/dashboard" component={Dashboard} isPrivate/>
           <Route exact path = "/customers" component={Customers} isPrivate/>
           <Route exact path = "/new" component={New} isPrivate/>

           {/* <Redirect from ='*' to='/' /> */}
           
        </Switch>
       
        
