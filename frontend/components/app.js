import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Modal from "./splash/modal";
import Splash from "./splash/splash";
import SignupForm from "./sessionForms/signupForm";
import Homepage from "./home/homepage";
import WelcomeMessage from "./home/welcome";

const App = (props) => {
    return (
        <div className="app-class">
            <Modal />

            <Switch>
                <AuthRoute exact path="/" component={Splash} />
                <AuthRoute exact path="/wrt/sign_up" component={SignupForm} />
            </Switch>

            <Switch>
                <ProtectedRoute
                    exact
                    path="/welcome"
                    component={WelcomeMessage}
                />
                <ProtectedRoute exact path="/home" component={Homepage} />
            </Switch>
        </div>
    );
};

export default App;
