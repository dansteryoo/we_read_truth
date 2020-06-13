import React from 'react';
const ERRORS = [
    "Title can't be blank", // 0 Title
    "Body can't be blank", // 1 Body
    "Book can't be blank", // 2 Book
    "Day can't be blank", // 3 Day
    "Day must only be a number" // 4 Number
]

class NotesForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            title: '',
            category: '',
            tags: '',
            body: '',
            update: false,
            success: false,
            updateErrors: [],
            updateForm: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchNotes()
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.noteId !== prevProps.noteId) {

            //---------- if this.props.noteId is a NUMBER then populate with update first and render update form ----------//
            if (Number.isInteger(this.props.noteId.id)) {
                const { id, title, category, tags, body } = this.props.noteId

                this.setState({
                    id, title, category, tags, body, 
                    updateForm: true,
                })
            }
        
            //---------- if notes array is different from current props to prevProps ----------//
            if (this.props.notes.length !== prevProps.notes.length) {

                //---------- AND if current props array is empty SKIP reset state ----------//
                if (this.props.notes.length < 1) return 

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
    }

    handleSubmit(e) {
        e.preventDefault()

        const { id, title, category, tags, body } = this.state
        let noteUpdate = { id, title, category, tags, body }
        let note = { title, category, tags, body }
        
        const trimmerLength = (word) => word.trim().length
        const blankTitle = trimmerLength(title) < 1
        const blankBody = trimmerLength(body) < 1
        const blankBook = trimmerLength(category) < 1
        const blankDay = trimmerLength(tags) < 1
        const dayIsNumber = (tags) => {
            if (Number.isInteger(parseInt(tags.trim()))) return true
            return false
        }

        if (blankTitle || blankBody || blankBook || blankDay || !dayIsNumber(tags)) {
            let errorsArr = []

            if (blankTitle) errorsArr.push(ERRORS[0]) // Title is blank
            if (blankBody) errorsArr.push(ERRORS[1]) // Body is blank
            if (blankBook) errorsArr.push(ERRORS[2]) // Book is blank
            if (blankDay) errorsArr.push(ERRORS[3]) // Day is blank
            if (!dayIsNumber(tags) && !blankDay) errorsArr.push(ERRORS[4])  // Day is !number
            if (errorsArr.length > 0) {
                return this.setState({
                    updateErrors: errorsArr
                })
            }
        } else if (id.length < 1) {
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
                })
                .then(() => this.renderUpdateMsg())
                .then(() => this.props.fetchNotes())
        }
    }

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false })
        }, 4000)
    }

    renderUpdateMsg() {
        window.setTimeout(() => {
            this.setState({ update: false })
        }, 4000)
    }

    renderErrors() {
        const { updateErrors } = this.state

        const errorsHash = {
            title: '',
            body: '',
            book: '',
            day: '',
            number: ''
        }

        if (updateErrors.length < 1) return errorsHash

        updateErrors.forEach(err => {
            if (ERRORS.indexOf(err) === 0) errorsHash.title = err
            if (ERRORS.indexOf(err) === 1) errorsHash.body = err
            if (ERRORS.indexOf(err) === 2) errorsHash.book = err
            if (ERRORS.indexOf(err) === 3) errorsHash.day = err
            if (ERRORS.indexOf(err) === 4) errorsHash.number = err
        })

        const { title, category, tags, body } = this.state

        const trimmerLength = (word) => word.trim().length
        const blankTitle = trimmerLength(title) < 1
        const blankBody = trimmerLength(body) < 1
        const blankBook = trimmerLength(category) < 1
        const blankDay = trimmerLength(tags) < 1
        const dayIsNumber = (tags) => {
            if (Number.isInteger(parseInt(tags.trim()))) return true
            return false
        }

        if (!blankTitle) errorsHash.title = ''
        if (!blankBody) errorsHash.body = ''
        if (!blankBook) errorsHash.book = ''
        if (!blankDay) errorsHash.day = ''
        if (dayIsNumber(tags)) errorsHash.number = ''

        return errorsHash
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

                        <form onSubmit={this.handleSubmit} >
                            <div className='notes-form'>

                                {/* title */}
                                <label>Title</label>
                                <input type='text'
                                    className='notes-form-input-title'
                                    onChange={this.handleChange('title')}
                                    value={this.state.title}
                                // required
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().title}
                                </div>
                                {/* body */}
                                <label>Body</label>
                                <textarea
                                    className='notes-form-textarea'
                                    placeholder={'Enter note here..'}
                                    onChange={this.handleChange('body')}
                                    value={this.state.body}
                                // required
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().body}
                                </div>
                                {/* categories and tags */}
                                <div className='notes-form-bottom'>
                                    <label>Book</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('category')}
                                        value={this.state.category}
                                    // required   
                                    />
                                    <div className='form-errors-notes'>
                                        {this.renderErrors().book}
                                    </div>
                                    <label>Day#</label>
                                    <input type='text'
                                        className='notes-form-input'
                                        onChange={this.handleChange('tags')}
                                        value={this.state.tags}
                                    // required   
                                    />
                                    <div className='form-errors-notes'>
                                        {this.renderErrors().day}
                                        {this.renderErrors().number}
                                    </div>
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
            )

            //----------- Create Form -----------//

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
                                    onChange={this.handleChange('title')}
                                // required
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().title}
                                </div>
                                {/* body */}
                                <label>Body</label>
                                <textarea
                                    className='notes-form-textarea'
                                    value={this.state.body}
                                    placeholder={'Enter note here..'}
                                    onChange={this.handleChange('body')}
                                // required
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().body}
                                </div>
                                {/* categories and tags */}
                                <div className='notes-form-bottom'>
                                <label>Book</label>
                                <input type='text'
                                    className='notes-form-input'
                                    value={this.state.category}
                                    onChange={this.handleChange('category')}
                                // required   
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().book}
                                </div>
                                <label>Day#</label>
                                <input type='text'
                                    className='notes-form-input'
                                    value={this.state.tags}
                                    onChange={this.handleChange('tags')}
                                // required   
                                />
                                <div className='form-errors-notes'>
                                    {this.renderErrors().day}
                                    {this.renderErrors().number}
                                </div>
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
            )
        }
    }
}

export default NotesForm;