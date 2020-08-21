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
            day: '',
            body: '',
            update: false,
            success: false,
            updateErrors: [],
            updateForm: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dayIsNumber(day) {
        let splitStr = day.trim().split('')

        for (let i = 0; i < splitStr.length; i++) {
            if (/^[a-zA-Z]*$/.test(splitStr[i])) return false
        }
        return true
    }

    isBlank(word) {
        return word.trim().length < 1
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
                const { id, title, category, day, body } = this.props.noteId
                this.setState({ id, title, category, day, body, updateForm: true })
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
                        day: '',
                        body: '',
                        updateForm: false,
                        updateErrors: [],
                    })
                } 
            }

        }
    }

    handleChange(f) {
        return e => this.setState({ [f]: e.target.value })
    }

    handleCancelUpdate() {
        return this.setState({ 
            id: '',
            title: '',
            category: '',
            day: '',
            body: '',
            update: false,
            success: false,
            updateErrors: [],
            updateForm: false
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { id, title, category, day, body } = this.state
        let noteUpdate = { id, title, category, day, body }
        let note = { title, category, day, body }

        if (this.isBlank(title) || this.isBlank(body) || 
            this.isBlank(category) || this.isBlank(day) || 
            !this.dayIsNumber(day)) {

            let errorsArr = []

            if (this.isBlank(title)) errorsArr.push(ERRORS[0]) // Title is blank
            if (this.isBlank(body)) errorsArr.push(ERRORS[1]) // Body is blank
            if (this.isBlank(category)) errorsArr.push(ERRORS[2]) // Book is blank
            if (this.isBlank(day)) errorsArr.push(ERRORS[3]) // Day is blank
            if (!this.dayIsNumber(day) && !this.isBlank(day)) errorsArr.push(ERRORS[4])  // Day is !number
            if (errorsArr.length > 0) return this.setState({ updateErrors: errorsArr })

        } else if (id.length < 1) {
            this.props.createNote(note)
                .then(() => {
                    this.setState({
                      success: true,
                      title: "",
                      category: "",
                      day: "",
                      body: "",
                      id: "",
                      updateForm: false,
                      updateErrors: [],
                    }),
                    this.renderSuccessMsg();
                })
                .then(() => this.props.fetchNotes())
        } else {
            this.props.updateNote(noteUpdate)
                .then(() => {
                    this.setState({
                      update: true,
                      title: "",
                      category: "",
                      day: "",
                      body: "",
                      id: "",
                      updateForm: false,
                      updateErrors: [],
                    }),
                    this.renderUpdateMsg();
                })
                .then(() => this.props.fetchNotes())
        }
    }

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false })
        }, 3000)
    }

    renderUpdateMsg() {
        window.setTimeout(() => {
            this.setState({ update: false })
        }, 3000)
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

        const { title, category, day, body } = this.state

        if (!this.isBlank(title)) errorsHash.title = ''
        if (!this.isBlank(body)) errorsHash.body = ''
        if (!this.isBlank(category)) errorsHash.book = ''
        if (!this.isBlank(day)) errorsHash.day = ''
        if (this.dayIsNumber(day)) errorsHash.number = ''

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
                                {/* categories and day */}
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
                                        onChange={this.handleChange('day')}
                                        value={this.state.day}
                                    // required   
                                    />
                                    <div className='form-errors-notes'>
                                        {this.renderErrors().day}
                                        {this.renderErrors().number}
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <button className='notes-form-submit-button' 
                                    type='submit'>
                                        Update
                                    </button>
                                    <div className='notes-form-cancel-x' 
                                        onClick={() => this.handleCancelUpdate()}>
                                        &#10005;
                                    </div>
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
                                {/* categories and day */}
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
                                    value={this.state.day}
                                    onChange={this.handleChange('day')}
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