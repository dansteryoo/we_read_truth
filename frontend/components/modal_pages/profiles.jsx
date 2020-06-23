import React from 'react';
const ERRORS = [
    "", // 0 Blank email
    "", // 1 Email !valid 
    "", // 2 Email taken
    "First name can't be blank", // 3 First name blank
    "Last name can't be blank", // 4 Last name blank
    "Password is too short (minimum is 6 characters)", // 5 PW too short
    "Passwords do not match", // 6 PW !match
]

class ProfilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            firstName: '',
            lastName: '',
            passwordMatch: '',
            passwordMatchError: '',
            stateErrors: [],
            deleteUser: false,
            success: false,
            demoMessage: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleDeleteConfirmation = this.toggleDeleteConfirmation.bind(this);
        this.processUpdate = this.processUpdate.bind(this);
    };

    isBlank(word) {
        return word.trim().length === 0
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.currentUser.first_name,
            lastName: this.props.currentUser.last_name
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { currentUser } = this.props
        if (currentUser.first_name === "Demo" && currentUser.last_name === "User") {
            this.setState({ demoMessage: true })
            return this.renderDemoMsg()
        }

        const { stateErrors, password, firstName, lastName, passwordMatch } = this.state
        this.props.clearErrors()

        const isPasswordMatch = () => password === passwordMatch
        let errorsArr = []

        if (this.isBlank(firstName) || this.isBlank(lastName)) {
            if (this.isBlank(firstName)) errorsArr.push(ERRORS[3]) // 3 First name blank
            if (this.isBlank(lastName)) errorsArr.push(ERRORS[4]) // 4 Last name blank
        }

        if (!this.isBlank(password) || !isPasswordMatch()) {
            if (password.length < 6) errorsArr.push(ERRORS[5]) // 5 PW too short
            if (!isPasswordMatch() && !errorsArr.includes(ERRORS[5])) errorsArr.push(ERRORS[6]) // 6 PW !match
        }

        if (errorsArr.length > 0) return this.setState({ stateErrors: errorsArr })

        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase()
            + string.toLocaleLowerCase().slice(1)

        let userUpdate = { 
            first_name: capitalizeFirstLetter(firstName),
            last_name: capitalizeFirstLetter(lastName),
            id: currentUser.id  
        }

        if (stateErrors.length < 1 && this.isBlank(password)) {
            return this.processUpdate(userUpdate)
        } else {
            if (!this.isBlank(password) && isPasswordMatch()) {
                userUpdate.password = password
                return this.processUpdate(userUpdate)
            } else {
                return this.processUpdate(userUpdate)
            }

        }
    }

    processUpdate(userUpdate) {
        return this.props.processForm(userUpdate)
            .then(() => this.setState({ success: true }))
            .then(() => this.renderSuccessMsg())
    }

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false })
            this.props.closeModal()
        }, 2500)
    }

    renderDemoMsg() {
        window.setTimeout(() => {
            this.setState({ demoMessage: false })
            this.props.closeModal()
        }, 4000)
    }

    handleChange(f) {
        return e => this.setState({ [f]: e.target.value })
    };

    renderErrors() {
        const { stateErrors, password, firstName, lastName, passwordMatch } = this.state;

        const errorsHash = {
            firstName: '',
            lastName: '',
            pwShort: '',
            pwNoMatch: '',
        }

        if (stateErrors.length < 1) return errorsHash

        stateErrors.forEach(err => {
            if (ERRORS.indexOf(err) === 3) errorsHash.firstName = err
            if (ERRORS.indexOf(err) === 4) errorsHash.lastName = err
            if (ERRORS.indexOf(err) === 5) errorsHash.pwShort = err
            if (ERRORS.indexOf(err) === 6) errorsHash.pwNoMatch = err
        })

        if (!this.isBlank(firstName)) errorsHash.firstName = ''
        if (!this.isBlank(lastName)) errorsHash.lastName = ''
        if (password.length > 5) errorsHash.pwShort = ''
        if (password === passwordMatch) errorsHash.pwNoMatch = ''

        return errorsHash
    }

    handleDelete(currentUser) {
        if (currentUser.first_name !== "Demo" 
            && currentUser.last_name !== "User") {
            return this.props.deleteUser(currentUser.id)
        } else {
            this.setState({ demoMessage: true })
            return this.renderDemoMsg()
        }
    };


    toggleDeleteConfirmation() {
        return this.setState({ deleteUser: !this.state.deleteUser })
    }

    render() {
        const { currentUser, formType } = this.props
        if (!currentUser) return <div></div>

        if (this.state.success) {
            return (
                <>
                <div className='success-message-div-update'>
                    <span>Profile Updated!</span>
                </div>
                </>
            );

        } else if (this.state.demoMessage) {
                return (
                    <>
                        <div className='success-message-div-demo'>
                            <span>Sorry, but you cannot modify the Demo.</span>
                        </div>
                    </>
                );

        } else if (!this.state.deleteUser) {

        return (
            <div className='form-container-update'>
                <div className='form-title-update'>
                    Update {currentUser.first_name}'s Profile</div>

                <div className="form-closing-x" onClick={() => this.props.closeModal()}>
                    &#10005;
                    </div>
                    
                <form onSubmit={this.handleSubmit} className='form__update'>

                    <div className='update-form'>
                        <input type='text'
                            className='update-form-input'
                            value={this.state.firstName}
                            placeholder={'First name'}
                            onChange={this.handleChange('firstName')}
                            name='firstName'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-update-first'>
                            {this.renderErrors().firstName}
                            <i id='first-update' className='fas fa-user fa-lg'></i>
                        </div>

                        <input type='text'
                            className='update-form-input'
                            value={this.state.lastName}
                            placeholder={'Last name'}
                            onChange={this.handleChange('lastName')}
                            name='lastName'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-update-last'>
                            {this.renderErrors().lastName}
                            <i id='last-update' className='fas fa-user fa-lg'></i>
                        </div>

                        <input type='password'
                            className='update-form-input'
                            value={this.state.password}
                            placeholder={'Create a password'}
                            onChange={this.handleChange('password')}
                            name='password'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-update-password'>
                            {this.renderErrors().pwShort}
                            <i id='password-update' className='fas fa-lock fa-lg'></i>
                        </div>

                        <input type='password'
                            className='update-form-input'
                            value={this.state.passwordMatch}
                            placeholder={'Confirm Password'}
                            onChange={this.handleChange('passwordMatch')}
                            name='passwordMatch'
                        // noValidate
                        // required
                        />
                        <div className='form-errors-update-password'>
                            {this.renderErrors().pwNoMatch}
                        </div>
                        <div className='update-form-button-container'>
                            <button className='update-form-button' type='submit' value={formType}>Update</button>
                            <button className='update-form-delete-btn' onClick={() => this.toggleDeleteConfirmation()}>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
            );

        } else {
            return (
                <>
                <div className='form-container-update'>
                <div className='form__update'>
                <div className='update-form'>
                    <div className='update-form-button-container'>
                        <button className='update-form-delete-btn' onClick={() => this.handleDelete(currentUser)}>Delete</button>
                        <button className='update-form-cancel-btn' onClick={() => this.toggleDeleteConfirmation()}>Cancel</button>
                    </div>

                    <div className='update-form-delete-message'>
                            <p>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT? </p>
                            <br />
                            <span>You will lose all your data permanently! </span>
                            <br />
                            <span>Please press the delete button to confirm. </span>
                    </div>
                </div>
                </div>
                </div>
                </>
            )
        }
    }
}

export default ProfilesPage;

