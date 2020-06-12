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
            updateErrors: '',
            updateForm: false
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

            //---------- if this.props.noteId is a NUMBER then populate with update first and render update form ----------//
            if (Number.isInteger(this.props.noteId.id)) {
                const { id, title, category, tags, body } = this.props.noteId;

                this.setState({
                    id, title, category, tags, body, 
                    updateForm: true,
                })
            }
        
            //---------- if notes array is different from current props to prevProps ----------//
            if (this.props.notes.length !== prevProps.notes.length) {

                //---------- AND if current props array is empty SKIP reset state ----------//
                if (this.props.notes.length === 0) return 

                //---------- AND if current props array is NOT EMPTY then reset state ----------//
                if (!this.props.notes.some(ele => ele.id === this.state.id)) {
                    this.setState({
                        id: '',
                        title: '',
                        category: '',
                        tags: '',
                        body: '',
                        updateForm: false,
                    })
                } 
            }

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
                    id: '',
                    updateForm: false,
                })
            })
            .then(() => this.renderSuccessMsg())
            .then(() => this.props.clearNoteState())
    };

    handleUpdate(e) {
        e.preventDefault();

        const { id, title, category, tags, body } = this.state;
        let noteUpdate = { id, title, category, tags, body };

        const trimmerLength = (word) => word.trim().length;
        const blankTitle = trimmerLength(title) === 0; 
        const blankBody = trimmerLength(body) === 0;

        if (blankTitle || blankBody) {
            if (blankTitle && !blankBody) {
                this.setState({
                    updateErrors: ["Title can't be blank"]
                })
            } else if (blankBody && !blankTitle) {
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
                        id: '',
                        updateForm: false,
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

        } else if (this.state.updateForm) {
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
                                    <label>Book</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('category')}
                                        value={this.state.category}
                                    // required   
                                    />
                                    <label>#Day</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('tags')}
                                        value={this.state.tags}
                                    // required   
                                    />
                                </div>
                                <div className='button-container'>
                                    <button className='notes-form-submit-button' type='submit'>
                                        Update
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
                                    <label>Book</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.category}
                                        onChange={this.handleChange('category')}
                                    // required   
                                    />
                                    <label>#Day</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.tags}
                                        onChange={this.handleChange('tags')}
                                    // required   
                                    />
                                </div>
                                <div className='button-container'>
                                    <button className='notes-form-submit-button' type='submit'>
                                        Create
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