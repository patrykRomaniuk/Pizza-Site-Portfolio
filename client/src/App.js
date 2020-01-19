import React,{ useEffect } from 'react'
import './components/css/App.css'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Landing from './Landing';
import Login from './components/Login';
import { Provider } from 'react-redux';
import Register from './components/Register';
import {ModalProvider} from './components/ModalContext';
import ModalWrapper from './ModalWrapper'
import store from './store';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

export default function App() {
    useEffect(() => {
      store.dispatch(loadUser());
    },[])
  return (
    <Router>
      <ModalProvider>
        <Provider store={store}>
          <Switch>
            <React.Fragment>
              <ModalWrapper />
              <Route exact path="/" component={ Landing }/>
              <Route exact path="/login" component={ Login }/>
              <Route exact path="/register" component={ Register }/>
            </React.Fragment>
          </Switch>
        </Provider>
      </ModalProvider>
    </Router>
  )
}

