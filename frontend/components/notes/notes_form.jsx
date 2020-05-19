import React from 'react';

class NotesForm extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            id: '',
            title: '',
            category: '',
            tags: '',
            body: '',
            update: false,
            success: false,
            updateErrors: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    };

    componentDidMount() {
       this.props.fetchNotes();
    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

    componentDidUpdate(prevProps) {
        if (this.props.noteId !== prevProps.noteId) {
            const { id, title, category, tags, body } = this.props.noteId;
            this.setState({
                id: id,
                title: title,
                category: category,
                tags: tags,
                body: body,
            })
        }
    }

    handleChange(f) {
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

    handleUpdate(e) {
        e.preventDefault();

        const { id, title, category, tags, body } = this.state;

        let noteUpdate = {
            id: id,
            title: title,
            category: category,
            tags: tags,
            body: body,
        };

        const trimmerLength = (word) => {
            return word.trim().length;
        }

        if (trimmerLength(title) === 0 || trimmerLength(body) === 0) {
            if (trimmerLength(title) === 0 && trimmerLength(body) !== 0) {
                this.setState({ 
                    updateErrors: ["Title can't be blank"]
                })
            } else if (trimmerLength(body) === 0 && trimmerLength(title) !== 0) {
                this.setState({ 
                    updateErrors: ["Body can't be blank"]
                })
            } else {
                this.setState({ 
                    updateErrors: ["Title can't be blank", "Body can't be blank"]
                })
            }
        } else {
            this.props.updateNote(noteUpdate)
                .then(() => {
                    this.setState({
                        updateErrors: '',
                        update: true,
                        title: '',
                        category: '',
                        tags: '',
                        body: '',
                    })
                }).then(() => this.renderUpdateMsg())
                .then(() => this.props.fetchNotes())
        }
    };

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false })
        }, 4000)
    };

    renderUpdateMsg() {
        window.setTimeout(() => {
            this.setState({ update: false })
        }, 4000)
    };

    renderErrors() {
        return (
            <ul className='form-errors-notes'>
                {this.props.noteErrors.map((error, i) => (
                    <li key={`error-${i}`}>{error}</li>
                ))}
            </ul>
        )
    };

    renderUpdateErrors() {
        if (this.state.updateErrors.length > 0) {
            return (
                <ul className='form-errors-notes'>
                    {this.state.updateErrors.map((error, i) => (
                        <li key={`error-${i}`}>{error}</li>
                    ))}
                </ul>
            )
        }
    }

    render() {
        
        if (this.state.success) {
            return (
                <div className='success-message-div'>
                    <span>Note Created!</span>
                </div>
            )
        } else if (this.state.update) {
            return (
                <div className='success-message-div'>
                    <span>Note Updated!</span>
                </div>
            )

        //----------- Update Form -----------//

        } else if (Object.values(this.props.noteId).length > 0) {

            return (
                <>
                    <div className='notes-form-container'>
                        {
                            this.renderUpdateErrors()
                        }
                        <form onSubmit={this.handleUpdate} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    className='notes-form-input-title'
                                    onChange={this.handleChange('title')}
                                    value={this.state.title}
                                // required
                                />

                                {/* body */}
                                <label>Body</label>
                                <textarea
                                    className='notes-form-textarea'
                                    placeholder={'Enter note here..'}
                                    onChange={this.handleChange('body')}
                                    value={this.state.body}
                                // required
                                />

                                {/* categories and tags */}

                                <div className='notes-form-bottom'>
                                    <label>Category</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('category')}
                                        value={this.state.category}
                                    // required   
                                    />
                                    <label>#Tags</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('tags')}
                                        value={this.state.tags}
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

        //----------- Create Form -----------//

        } else {
            return (
                <>
                    <div className='notes-form-container'>
                        {
                            this.renderErrors()
                        }
                        <form onSubmit={this.handleSubmit} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    className='notes-form-input-title'
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                // required
                                />

                                {/* body */}
                                <label>Body</label>
                                <textarea 
                                    className='notes-form-textarea'
                                    value={this.state.body}
                                    placeholder={'Enter note here..'}
                                    onChange={this.handleChange('body')}
                                // required
                                />

                                {/* categories and tags */}

                                <div className='notes-form-bottom'> 
                                    <label>Category</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.category}
                                        onChange={this.handleChange('category')}
                                    // required   
                                    />
                                    <label>#Tags</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.tags}
                                        onChange={this.handleChange('tags')}
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
}

export default NotesForm;