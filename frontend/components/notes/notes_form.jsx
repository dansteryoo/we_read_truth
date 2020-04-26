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
        let user = Object.assign({}, this.state);

        this.props.processForm(user)
            .then(() => this.props.closeModal());
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
        // debugger
        return (
            <>
                <div className='notes-form-container'>
                    <form onSubmit={this.handleSubmit} >
                        {/*this.renderErrors()*/}
                        <div className='notes-form'>

                            {/* title */}

                            <input type='text'
                                className='notes-form-input'
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