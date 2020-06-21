import React from 'react';
import { Link } from 'react-router-dom';
const ERRORS = [
    "Email can't be blank", // 0 Blank email
    "Email is invalid", // 1 Email !valid 
    "Email has already been taken", // 2 Email taken
    "First name can't be blank", // 3 First name blank
    "Last name can't be blank", // 4 Last name blank
    "Password is too short (minimum is 6 characters)", // 5 PW too short
    "Passwords do not match", // 6 PW !match
]

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            passwordMatch: '',
            passwordMatchError: '',
            stateErrors: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

    isBlank(word) {
        return word.trim().length === 0
    }

    handleSubmit(e) {
        e.preventDefault()

        const { stateErrors, email, password, firstName, lastName, passwordMatch } = this.state
        this.props.clearErrors()

        const isPasswordMatch = () => password === passwordMatch

        if (this.isBlank(email) || this.isBlank(firstName) ||
            this.isBlank(lastName) || this.isBlank(password) || !isPasswordMatch()) {
            let errorsArr = []

            if (this.isBlank(email)) errorsArr.push(ERRORS[0]) // 0 Blank email
            if (this.isBlank(firstName)) errorsArr.push(ERRORS[3]) // 3 First name blank
            if (this.isBlank(lastName)) errorsArr.push(ERRORS[4]) // 4 Last name blank
            if (password.length < 6) errorsArr.push(ERRORS[5]) // 5 PW too short
            if (!isPasswordMatch() && !errorsArr.includes(ERRORS[5])) errorsArr.push(ERRORS[6]) // 6 PW !match
            if (errorsArr.length > 0) return this.setState({ stateErrors: errorsArr })
        }

        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase()
            + string.toLocaleLowerCase().slice(1)

        let user = { 
            email: email.toLowerCase(),
            password, 
            first_name: capitalizeFirstLetter(firstName),
            last_name: capitalizeFirstLetter(lastName)
        }

        if (stateErrors.length < 2) {
            return this.props.processForm(user)
        }
    }

    handleChange(f) {
        return e => this.setState({ [f]: e.target.value })
    };

    renderErrors() {
        const { errors } = this.props
        const { stateErrors, email, password, firstName, lastName, passwordMatch } = this.state;

        const errorsHash = {
            emailBlank: '',
            emailInvalid: '',
            emailTaken: '',
            firstName: '',
            lastName: '',
            pwShort: '',
            pwNoMatch: '',
        }

        if (errors.length < 1 && stateErrors.length < 1) return errorsHash
        
        stateErrors.forEach(err => {
            if (ERRORS.indexOf(err) === 0) errorsHash.emailBlank = err
            if (ERRORS.indexOf(err) === 3) errorsHash.firstName = err
            if (ERRORS.indexOf(err) === 4) errorsHash.lastName = err
            if (ERRORS.indexOf(err) === 5) errorsHash.pwShort = err
            if (ERRORS.indexOf(err) === 6) errorsHash.pwNoMatch = err
        })

        errors.forEach(err => {
            if (ERRORS.indexOf(err) === 1) errorsHash.emailInvalid = err
            if (ERRORS.indexOf(err) === 2) errorsHash.emailTaken = err
            if (ERRORS.indexOf(err) === 5) errorsHash.pwShort = err
        })

        if (!this.isBlank(email)) errorsHash.emailBlank = ''
        if (!this.isBlank(firstName)) errorsHash.firstName = ''
        if (!this.isBlank(lastName)) errorsHash.lastName = ''
        if (password.length > 5) errorsHash.pwShort = ''
        if (password === passwordMatch) errorsHash.pwNoMatch = ''

        return errorsHash
    }

    render() {

        return (
            <div className='form-container-signup'>
                <div className='form-title-signup'>
                    <span id='signup-title'>Sign up with email or </span>
                    <Link to='/'>
                        <span id='signup-to-login'> Login</span>
                    </Link>
                </div>
                    <form onSubmit={this.handleSubmit} className='form'>
                    
                    <div className='signup-form'>
                        <input type='email'
                            className='signup-form-input'
                            value={this.state.email}
                            placeholder={'Email address'}
                            onChange={this.handleChange('email')}
                            name='email' 
                        // noValidate
                        // required
                        />
                        <div className='form-errors-signup-email'>
                            {this.renderErrors().emailBlank}
                            {this.renderErrors().emailInvalid}
                            {this.renderErrors().emailTaken}
                            <i id='email' className='fas fa-envelope fa-lg'></i>
                        </div>
                        
                        <input type='text'
                            className='signup-form-input'
                            value={this.state.firstName}
                            placeholder={'First name'}
                            onChange={this.handleChange('firstName')}
                            name='firstName'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-signup-first'>
                            {this.renderErrors().firstName}
                            <i id='first' className='fas fa-user fa-lg'></i>
                        </div>
                        
                        <input type='text'
                            className='signup-form-input'
                            value={this.state.lastName}
                            placeholder={'Last name'}
                            onChange={this.handleChange('lastName')}
                            name='lastName'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-signup-last'>
                            {this.renderErrors().lastName}
                            <i id='last' className='fas fa-user fa-lg'></i>
                        </div>
                        
                        <input type='password'
                            className='signup-form-input'
                            value={this.state.password}
                            placeholder={'Create a password'}
                            onChange={this.handleChange('password')}
                            name='password'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-signup-password'>
                            {this.renderErrors().pwShort}
                            <i id='password' className='fas fa-lock fa-lg'></i>
                        </div>

                        <input type='password'
                            className='signup-form-input'
                            value={this.state.passwordMatch}
                            placeholder={'Confirm Password'}
                            onChange={this.handleChange('passwordMatch')}
                            name='passwordMatch'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-signup-password'>
                            {this.renderErrors().pwNoMatch}
                        </div>
                            <button className='signup-form-button' type='submit' value={this.props.formType}>Sign Up</button>
                        </div>
                    </form>

                </div>

        );
    }
}

export default SignUp;

