import React, { useEffect} from 'react';
import './App.css';
import Layout from './components/layout/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './containers/home/signin/index';
import Signup from './containers/home/signup/index';
import Home from './containers/home/index';
import Products from './containers/home/products/index';
import PrivateRoutes from './HOC/privateRoutes';
import { useDispatch,useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/authaction';
import Orders from './containers/home/orders/index';
import Category from './containers/home/category/index';
import { getAllCategory } from './actions/categoryaction';
import { getInitialData } from './actions/initialdata';

function App() {
  
    const dispatch = useDispatch();
   // const auth = useSelector(state => state.auth);
    useEffect(() => {
    //if(!auth.authenticate)
      dispatch(isUserLoggedIn());
      dispatch(getInitialData());
    
  },[])
     return( <div className="App">
        <Router>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
           <PrivateRoutes path="/" exact component={Home} />
           <PrivateRoutes path='/products' component={Products} />
           <PrivateRoutes path='/orders' component={Orders}/>
           <PrivateRoutes path='/category' component={Category} />
           
          </Switch>
        </Router>
       
      </div>
    );
  }


export default App;
