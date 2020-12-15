import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import LandingNav from './landing/landing-nav'
import LandingBody from './landing/landing-body.js'
import Footer from './footer/footer'
import LoginBody from './login/login-body';
import LoginNav from './login/login-nav';
import SignupNav from './signup/signup-nav';
import SignupBody from './signup/signup-body';
import DashboardNav from './dashboard/dashboard-nav';
import DashboardBody from './dashboard/dashboard-body';
import ApiContext from './ApiContext';
import store from './store';

class App extends Component {

  state = {
    user: store.members[0],
    members: store.members
};

signup = (user) => {
  this.setState({
    user: user,
    members: [...this.state.members, user]
  })
  
  
}

changeUser = (id) => {
  this.setState({user: this.state.members.find(member => member.id ==id)})
}






componentDidMount() {
 

  
}

renderNavRoutes() {
  return(
    <>
    <Route exact path="/" component={LandingNav} />
    <Route exact path="/login" component={LoginNav} />
    <Route exact path="/signup" component={SignupNav} />
    <Route exact path="/dashboard" component={DashboardNav} />
    </>
  )
}

  // renderGreetingRoutes() {
  //   return(
      
  //   )
  // }

  renderBodyRoutes() {
    return(
        <>
        <Route exact path="/" component={LandingBody} />
        <Route exact path="/login" component={LoginBody} />
        <Route exact path="/signup" component={SignupBody} />
        <Route exact path="/dashboard" component={DashboardBody} />
        </>
    )
  }
  
  renderFooterRoutes() {
    return(
      <>
      <Route path="/" component={Footer} />
      </>
    )
  }


  
  render() {
    const value = {
      user: this.state.user,
      members: this.state.members,
      changeUser: this.changeUser,
      signup: this.signup
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav>
            {this.renderNavRoutes()}
          </nav>
          <main className='App'>
            {/* {this.renderGreetingRoutes()} */}
            {this.renderBodyRoutes()}
          </main>
          <footer>
            {this.renderFooterRoutes()}
          </footer>
        </div>
      </ApiContext.Provider>
        
      
      
    );
  }
  
}

export default App;

