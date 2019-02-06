import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './login';
import BooksList from './booksList';

class App extends Component {
  render() {
    return (
      <div> 
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">Books</span>
            </div>
            
          </div>
        </nav>

        <div className="container"> 
        <Switch>
          <Route exact path='/' render={({history})  => (<Login history={history}/>)}/>
          <Route exact path='/books' render={({history})  => (<BooksList history={history}/>)}/>
        </Switch>
      </div>
      </div>
    );
  }
}

export default App;
