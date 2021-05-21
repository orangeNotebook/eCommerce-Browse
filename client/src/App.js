import * as React from 'react';
import './App.css';
import './components/main'
import MainPage from './components/main';
import Details from './components/details'
import {Route, Switch} from 'react-router-dom';

function App () {
  return(
    <main>
    <Switch>
        <Route path="/"component={MainPage} exact/>
        <Route path="/details"component={Details} exact/>
    </Switch>
    </main>
  )
};


  export default App