import React from 'react';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = Object.assign({}, this.state);

        this.props.processForm(user)
    }

    update(f) {
        return e => this.setState({
            [f]: e.target.value
        });
    }

    renderErrors() {
        if (this.props.errors === undefined) {
            this.props.errors = []
        }
        return (
            <ul className='form-errors'>
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
                        <br />
                        <input type='text'
                            className='form-input'
                            value={this.state.email}
                            placeholder={'Email address'}
                            onChange={this.update('email')}
                            // required
                        />
                        <i id='form-icon-login' className='fas fa-envelope fa-lg'></i>
                        <br />
                        <input type='password'
                            className='form-input'
                            value={this.state.password}
                            placeholder={'Password'}
                            onChange={this.update('password')}
                            autoComplete='on'
                            // required   
                        />
                        <i id='form-icon-login' className='fas fa-lock fa-lg'></i>
                        <button className='form-button' type='submit' value={this.props.formType}>Log In</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default LogInForm;