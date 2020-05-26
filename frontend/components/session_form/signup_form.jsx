import React from 'react';

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
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

    componentDidUpdate(prevProps) {

        if (this.props.errors !== prevProps.errors) {
            // this.props.clearErrors();
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1)
        };

        const { email, password, firstName, lastName, passwordMatch } = this.state;

        let user = {
            email: email.toLowerCase(),
            password: password,
        };

        let shortPassword = {
            email: email.toLowerCase(),
            password: 12345,
        };

        user.first_name = capitalizeFirstLetter(firstName);
        user.last_name = capitalizeFirstLetter(lastName);
        shortPassword.first_name = capitalizeFirstLetter(firstName);
        shortPassword.last_name = capitalizeFirstLetter(lastName);

        if (password !== passwordMatch) {
            this.setState({
                passwordMatchError: ["Passwords do not match"]
            })

            if (password.length < 6 || passwordMatch.length < 6) {

                this.props.processForm(shortPassword)
            } else if (password.length < 6 && passwordMatch.length < 6) {

                this.props.processForm(shortPassword)
            } else if (password.length > 5 && passwordMatch.length > 5) {
                if (email.length > 0 && firstName.length > 0 && lastName.length > 0) {
                    console.log('(email.length > 0 && firstName.length > 0 && lastName.length > 0)')

                    this.clearErrors()
                } else {
                    console.log('(password.length > 5 && passwordMatch.length > 5)')

                    let longPassword = Object.assign(user, { password: password })
                    this.props.processForm(longPassword)
                }
            }
        } else if (password === passwordMatch) {
            this.setState({
                passwordMatchError: "",
                password: password
            })

            let goodPassword = Object.assign(user, { password: password })
            this.props.processForm(goodPassword)
        }
    };


    handleChange(f) {
        return e => this.setState({
            [f]: e.target.value
        })
    };

    passwordMatchError() {
        if (this.state.passwordMatchError.length > 0) {
            return (
                <ul className='form-errors-signup'>
                    {this.state.passwordMatchError.map((error, i) => (
                        <li key={`error-${i}`}>{error}</li>
                    ))}
                </ul>
            )
        }
    }

    renderErrors() {
        return (
            <ul className='form-errors-signup'>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>{error}</li>
                ))}
            </ul>
        );
    }

    render() {


        return (
            <div className='form-container-signup'>
                {this.renderErrors()}
                {this.passwordMatchError()}
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
                        <i id='form-icon-login' className='fas fa-envelope fa-lg'></i>
                        
                        <input type='text'
                            className='signup-form-input'
                            value={this.state.firstName}
                            placeholder={'First name'}
                            onChange={this.handleChange('firstName')}
                            name='firstName'
                        // noValidate
                        // required
                        />
                        <i id='form-icon-login' className='fas fa-user fa-lg'></i>
                        
                        <input type='text'
                            className='signup-form-input'
                            value={this.state.lastName}
                            placeholder={'Last name'}
                            onChange={this.handleChange('lastName')}
                            name='lastName'
                        // noValidate
                        // required
                        />
                        <i id='form-icon-login' className='fas fa-user fa-lg'></i>
                        
                        <input type='password'
                            className='signup-form-input'
                            value={this.state.password}
                            placeholder={'Create a password'}
                            onChange={this.handleChange('password')}
                            name='password'
                        // noValidate
                        // required
                        />
                        <i id='form-icon-login' className='fas fa-lock fa-lg'></i>

                        <input type='password'
                            className='signup-form-input'
                            value={this.state.passwordMatch}
                            placeholder={'Confirm Password'}
                            onChange={this.handleChange('passwordMatch')}
                            name='passwordMatch'
                        // noValidate
                        // required
                        />
   
                            <button className='signup-form-button' type='submit' value={this.props.formType}>Sign Up</button>
                        </div>
                    </form>

                </div>

        );
    }
}

export default SignUp;

