import React from 'react';
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

    componentDidUpdate(prevProps) {

        if (this.props.errors !== prevProps.errors) {
            console.log('update')

            debugger
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const { stateErrors, email, password, firstName, lastName, passwordMatch } = this.state;
        this.props.clearErrors()

        const trimmerLength = (word) => word.trim().length
        const blankEmail = trimmerLength(email) < 1
        const blankFirst = trimmerLength(firstName) < 1
        const blankLast = trimmerLength(lastName) < 1
        const blankPassword = trimmerLength(password) < 1
        const isPasswordMatch = () => {
            return password === passwordMatch
        }

        if (blankEmail || blankFirst || blankLast || blankPassword || !isPasswordMatch()) {
            let errorsArr = []

            if (blankEmail) errorsArr.push(ERRORS[0]) // 0 Blank email
            if (blankFirst) errorsArr.push(ERRORS[3]) // 3 First name blank
            if (blankLast) errorsArr.push(ERRORS[4]) // 4 Last name blank
            if (password.length < 5) errorsArr.push(ERRORS[5]) // 5 PW too short
            if (!isPasswordMatch() && !errorsArr.includes(ERRORS[5])) errorsArr.push(ERRORS[6]) // 6 PW !match
            if (errorsArr.length > 0) {
                return this.setState({
                    stateErrors: errorsArr
                })
            }
        }

        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() 
                                                    + string.toLocaleLowerCase().slice(1)

        let user = { email, password, firstName, lastName }
        user.first_name = capitalizeFirstLetter(firstName)
        user.last_name = capitalizeFirstLetter(lastName)
        user.password = password.toLocaleLowerCase()
        console.log('processFORM')
        if (stateErrors.length < 2) {
            this.setState({ stateErrors: [] })
            return this.props.processForm(user) 
        }
}


    handleChange(f) {
        return e => this.setState({
            [f]: e.target.value
        })
    };

    renderErrors() {
        const { errors } = this.props 
        const { stateErrors, email, password, firstName, lastName, passwordMatch } = this.state;

        const trimmerLength = (word) => word.trim().length
        const blankEmail = trimmerLength(email) < 1
        const blankFirst = trimmerLength(firstName) < 1
        const blankLast = trimmerLength(lastName) < 1

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

        if (!blankEmail) delete errorsHash.emailBlank
        if (!blankFirst) delete errorsHash.firstName
        if (!blankLast) delete errorsHash.lastName
        if (password.length > 5) delete errorsHash.pwShort
        if (password === passwordMatch) delete errorsHash.pwNoMatch

        return errorsHash
    }

    render() {

        return (
            <div className='form-container-signup'>
                <div className='form-title-signup'>Sign up with email</div>
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

