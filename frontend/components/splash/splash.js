import React from "react";
import LoginForm from "../sessionForms/loginForm";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";

/******************************
 *      Splash Component      *
 ******************************/

const Splash = () => (
    <div className="splash-main">
        <LoginForm />
    </div>
);

/******************************
 *       mapStateToProps      *
 ******************************/

const mapStateToProps = ({ session, users }) => ({
    currentUser: users[session.id],
});

/******************************
 *     mapDispatchToProps     *
 ******************************/

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);


