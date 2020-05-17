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
            update: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.input = React.createRef();
    };

    componentDidMount() {
       this.props.fetchNotes();
    };

    componentWillUnmount() {
        this.props.clearErrors();
    };

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
        const { title, category, tags, body } = this.state;
        let noteUpdate = {
            id: this.props.noteId.id,
            title: title,
            category: category,
            tags: tags,
            body: body,
        };
        this.props.updateNote(noteUpdate)
            .then(() => {
                this.setState({
                    update: true,
                    title: '',
                    category: '',
                    tags: '',
                    body: '',
                })
            })
            .then(() => this.renderUpdateMsg())
            .then(() => this.props.fetchNotes())
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
            console.log(this.props.noteId)
            return (
                <>
                    <div className='notes-form-container'>
                        {this.renderErrors()}
                        <form onSubmit={this.handleUpdate} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    // ref={this.input}
                                    className='notes-form-input-title'
                                    // placeholder={'Title'}
                                    onChange={this.handleChange('title')}
                                    defaultValue={this.props.noteId.title}
                                    // value={this.props.noteId.title}
                                // required
                                />

                                {/* body */}
                                <label>Body</label>
                                <textarea
                                    // ref={this.input}
                                    className='notes-form-textarea'
                                    placeholder={'Enter note here..'}
                                    onChange={this.handleChange('body')}
                                    defaultValue={this.props.noteId.body}
                                    // value={this.props.noteId.body}
                                // required
                                />

                                {/* categories and tags */}

                                <div className='notes-form-bottom'>
                                    <label>Category</label>
                                    <input type='text'
                                        // ref={this.input}
                                        className='notes-form-input'
                                        // placeholder={'category'}
                                        onChange={this.handleChange('category')}
                                        defaultValue={this.props.noteId.category}
                                        // value={this.props.noteId.category}
                                    // required   
                                    />
                                    <label>#Tags</label>
                                    <input type='text'
                                        // ref={this.input}
                                        className='notes-form-input'
                                        // placeholder={'#tags'}
                                        onChange={this.handleChange('tags')}
                                        defaultValue={this.props.noteId.tags}
                                        // value={this.props.noteId.tags}
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
                        {this.renderErrors()}
                        <form onSubmit={this.handleSubmit} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    className='notes-form-input-title'
                                    value={this.state.title}
                                    // placeholder={'Title'}
                                    onChange={this.handleChange('title')}
                                    defaultValue={this.props.noteId.title}
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
                                        // placeholder={'category'}
                                        onChange={this.handleChange('category')}
                                    // required   
                                    />
                                    <label>#Tags</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        value={this.state.tags}
                                        // placeholder={'#tags'}
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