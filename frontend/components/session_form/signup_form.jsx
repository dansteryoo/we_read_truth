import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

    handleSubmit(e) {
        e.preventDefault();

        let user = Object.assign({}, this.state);
        user.first_name = user.firstName
        user.last_name = user.lastName

        this.props.processForm(user)
    };

    handleChange(f) {
        return e => this.setState({
            [f]: e.target.value
        })
    };

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
   
                            <button className='signup-form-button' type='submit' value={this.props.formType}>Sign Up</button>
                        </div>
                    </form>

                </div>

        );
    }
}

export default SignUp;

