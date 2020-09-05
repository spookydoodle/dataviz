import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './utils/ScrollToTop';
import salesService from './services/salesService';
import dummyData from './constants/dummyData';
import { State, Mode } from './logic/types';
import { PATHS } from './constants/data';

const { root, home, main, login, logout, register } = PATHS;

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      whoamiRequestDone: false,
      mode: "light",
      data: undefined,
    };
  }

  setMode = (mode: Mode) => {
    this.setState({ mode: mode });
  };
  componentDidMount() {
    salesService.get()
      .then(data => this.setState({ data: data }))
      .catch(err => this.setState({ data: dummyData }));
  }



  render() {
    const { whoamiRequestDone, user, notifications, data } = this.state;

    return (
      <Router>
        <ScrollToTop>
          <div className="App">
            <Switch>
              {/*
                A Switch will iterate through all routes and return
                on the first match.
                The order matters - the most generic paths should
                be at the very end.
              */}
              <Route path={home}>
                <Dashboard
                  user={this.state.user}
                  data={data}
                  mode={this.state.mode}
                  setMode={this.setMode}
                // notificationsProps={notificationsProps} 
                />
              </Route>

              <Route exact path={root}>
                <Dashboard
                  user={this.state.user}
                  data={data}
                  mode={this.state.mode}
                  setMode={this.setMode}
                // notificationsProps={notificationsProps} 
                />
              </Route>
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App;