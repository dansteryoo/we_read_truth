import React from 'react';

class NotesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category: '',
            tags: '',
            body: ''
        }


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(f) {
        return e => this.setState({
            [f]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let note = Object.assign({}, this.state);
        this.props.createNote(note);
    }

    renderErrors() {
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
            <>
                <div className='notes-form-container'>
                    <form onSubmit={this.handleSubmit} >
                        <div className='notes-form'>

                            {/* title */}

                            <input type='text'
                                className='notes-form-input-title'
                                value={this.state.title}
                                placeholder={'Title'}
                                onChange={this.update('title')}
                            // required
                            />

                            {/* body */}

                            <textarea 
                                className='notes-form-textarea'
                                value={this.state.body}
                                placeholder={'Enter note here..'}
                                onChange={this.update('body')}
                            // required
                            />

                            {/* categories and tags */}

                            <div className='notes-form-bottom'> 
                                <input type='text'
                                    className='notes-form-input'
                                    value={this.state.category}
                                    placeholder={'category'}
                                    onChange={this.update('category')}
                                // required   
                                />
                                <input type='text'
                                    className='notes-form-input'
                                    value={this.state.tags}
                                    placeholder={'#tags'}
                                    onChange={this.update('tags')}
                                // required   
                                />
                            </div>
                            {this.renderErrors()}
                            <div className='button-container'>
                                <button className='notes-form-submit-button' type='submit'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    <br />
                </div>
            </>
        );
    }
}

export default NotesForm;


// constructor(props) {
//     super(props);
//     this.state = {
//         fullName: null,
//         email: null,
//         password: null,
//         errors: {
//             fullName: '',
//             email: '',
//             password: '',
//         }
//     };
// }

// handleChange = (event) => {
//     event.preventDefault();
//     const { name, value } = event.target;
//     let errors = this.state.errors;

//     switch (name) {
//         case 'fullName':
//             errors.fullName =
//                 value.length < 5
//                     ? 'Full Name must be 5 characters long!'
//                     : '';
//             break;
//         case 'email':
//             errors.email =
//                 validEmailRegex.test(value)
//                     ? ''
//                     : 'Email is not valid!';
//             break;
//         case 'password':
//             errors.password =
//                 value.length < 8
//                     ? 'Password must be 8 characters long!'
//                     : '';
//             break;
//         default:
//             break;
//     }

//     this.setState({ errors, [name]: value }, () => {
//         console.log(errors)
//     })
// }

// const validEmailRegex =
//     RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);