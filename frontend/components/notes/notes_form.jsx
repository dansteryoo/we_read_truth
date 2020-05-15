import React from 'react';

class NotesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category: '',
            tags: '',
            body: '',
            success: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {

    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

    update(f) {
        return e => this.setState({
            [f]: e.target.value
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        let note = Object.assign({}, this.state);
        this.props.createNote(note)
            .then(() => {
                this.setState({ 
                    success: true,
                    title: '',
                    category: '',
                    tags: '',
                    body: '',
                })
            })
            .then(() => this.renderSuccessMsg())
    };

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false })
        }, 4000)
    };

    renderErrors() {
        return (
            <ul className='form-errors'>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>{error}</li>
                ))}
            </ul>
        )
    };

    render() {
        if (this.state.success) {
            return (
                <div className='success-message-div'>
                    <span>Note Created!</span>
                </div>
            )
        } else {
            return (
                <>
                    <div className='notes-form-container'>
                        <form onSubmit={this.handleSubmit} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    className='notes-form-input-title'
                                    value={this.state.title}
                                    // placeholder={'Title'}
                                    onChange={this.update('title')}
                                // required
                                />

                                {/* body */}
                                <label>Body</label>
                                <textarea 
                                    className='notes-form-textarea'
                                    value={this.state.body}
                                    placeholder={'Enter note here..'}
                                    onChange={this.update('body')}
                                // required
                                />

                                {/* categories and tags */}

                                <div className='notes-form-bottom'> 
                                    <label>Category</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.category}
                                        // placeholder={'category'}
                                        onChange={this.update('category')}
                                    // required   
                                    />
                                    <label>#Tags</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.tags}
                                        // placeholder={'#tags'}
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
}

export default NotesForm;