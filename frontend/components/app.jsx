import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './splash/modal';
import SplashContainer from './splash/splash_container';
import HomePageContainer from './home/home_container';

const App = () => (
    <div className='app-class'>
        <Modal />

            <Switch>
                <ProtectedRoute exact path='/home' component={HomePageContainer} />
            </Switch>

        <Switch>
            <AuthRoute exact path='/' component={SplashContainer} />
        </Switch>

    </div>
);

export default App;