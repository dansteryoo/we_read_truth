import React from 'react';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoUser = this.handleDemoUser.bind(this);
    };

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = Object.assign({}, this.state);
        user.email = user.email.toLocaleLowerCase()
        user.password = user.password.toLocaleLowerCase()
        this.props.processForm(user)
    }

    handleDemoUser() {
        this.props.logindemo();
    }
    
    handleChange(f) {
        return e => this.setState({
            [f]: e.target.value
        });
    }

    renderErrors() {
        return (
            <ul className='form-errors-login'>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>{error}</li>
                ))}
            </ul>
        );
    }

    render() {

        
        return (
            <div className='form-container'>

                <div className='form-title'>Login to continue</div>
                <br />
                <form onSubmit={this.handleSubmit} className='form'>
                    {this.renderErrors()}
                    <div className='form'>

                        <input type='text'
                            className='form-input'
                            value={this.state.email}
                            placeholder={'Email address'}
                            onChange={this.handleChange('email')}
                            // required
                        />
                        <i id='form-icon-login' className='fas fa-envelope fa-lg'></i>

                        <input type='password'
                            className='form-input'
                            value={this.state.password}
                            placeholder={'Password'}
                            onChange={this.handleChange('password')}
                            autoComplete='on'
                            // required   
                        />
                        <i id='form-icon-login' className='fas fa-lock fa-lg'></i>
                        <button className='form-button' type='submit' value={this.props.formType}>Log In</button>
                    </div>
                </form>
                <button className='form-demo-button' type='submit' onClick={this.handleDemoUser}>Demo User</button>
            </div>
        );
    }
}

export default LogInForm;