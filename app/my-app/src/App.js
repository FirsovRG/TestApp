import React from 'react';
import Navigation from './Navigation'
import Header from './Header'
import Authorization from './Authorization'
import Registration from './Registration'
import Edit from './Edit'
import Data from './Data'
import Welcome from './WelcomePage'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Navigation />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/Authorization' component={Authorization} />
            <Route path='/Registration' component={Registration} />
            <Route path='/Edit' component={Edit} />
            <Route path='/Data' component={Data} />
          </Switch>
        </Provider>
      </BrowserRouter>

    )
  }
}

export default App;
