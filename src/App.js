import React from 'react';
import {connect} from 'react-redux';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';






class App extends React.Component {
    unSubscribeFromAuth = null;
  

    componentDidMount() {
      const { setCurrentUser } = this.props;
        this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
          if(userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            userRef.onSnapshot(snapShot => {
              setCurrentUser({
                  id: snapShot.id,
                  ...snapShot.data()
              })
            })
            
          }
          setCurrentUser(userAuth);
        })
    }

    componentWillUnmount() {
      this.unSubscribeFromAuth();
    }
    render() {
      return (
        <div >
          <Header />
        <Switch>
          <Route exact path='/' component={ HomePage}/>
          <Route  path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ?
            (<Redirect to='/' />) :
            (<SignInAndSignUpPage/>)}/>

          <Route  exact path='/checkout' component={CheckoutPage}/>
        </Switch>
        </div>
        
      );
    }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
  })
export default connect(mapStateToProps, mapDispatchToProps)(App);