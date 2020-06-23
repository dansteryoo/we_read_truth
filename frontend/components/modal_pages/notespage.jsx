import React from 'react';
import NotesItem from './notes_item'
import { searchRegexMatch } from '../home/function_helpers/helper_funcs'

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noteId: '',
            search: '',
            notes: [],
            defaultSorted: [],
            checked: false
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.renderModalTop = this.renderModalTop.bind(this);
        this.sortByBook = this.sortByBook.bind(this);
        this.sortByCreated = this.sortByCreated.bind(this);
        this.sortByUpdated = this.sortByUpdated.bind(this);
    }

    componentDidMount() {
        this.props.fetchNotes()
        .then(() => this.setState({ 
            notes: this.props.notes,
            defaultSorted: this.sortByCreated(this.props.notes)
        }))
    }

    componentWillUnmount() {
        this.props.clearNoteState()
    }

    componentDidUpdate() {
        const { notes, search, defaultSorted, checked } = this.state

        //---------- defaultSorted on blank search input ----------//
        if (JSON.stringify(notes) !== JSON.stringify(defaultSorted)
        && search.length < 1 && checked === false) {

            return this.setState({ notes: defaultSorted })
        } 
    }

    sortByBook(notes) {
        let sortedNotes = notes
            .sort((a, b) => a.category.toLowerCase() < b.category.toLowerCase() ? -1 : 1)
            .map(ele => ele)
        return sortedNotes
    }

    sortByCreated(notes) {
        let sortedNotes = notes
            .sort((a, b) => a.created_at.toLowerCase() < b.created_at.toLowerCase() ? -1 : 1)
            .map(ele => ele)
        return sortedNotes
    }

    sortByUpdated(notes) {
        let sortedNotes = notes
            .sort((a, b) => a.updated_at.toLowerCase() < b.updated_at.toLowerCase() ? -1 : 1)
            .map(ele => ele)
        return sortedNotes
    }

    handleUpdate(noteId) {
        this.props.fetchNote(noteId)
        .then(() => this.props.closeModal())
    }

    toggleClass(noteId) {
        this.setState({ noteId })
    }

    handleChange(f) {
        return (e) => this.setState({ [f]: e.target.value })
    }

    handleCheck(e) {
        const checkbox = e.target.value

        let myCheckbox = document.getElementsByName("checkbox");
        let checkboxBool = []

        myCheckbox.forEach(ele => {
            if (checkbox !== ele.value) ele.checked = false
            checkboxBool.push(ele.checked === true)
        }) 

        const { notes } = this.state
        //---------- default byCreated sort on blank checkboxes ----------//
        if (!checkboxBool.includes(true)) {
            return this.setState({
                notes: this.sortByCreated(notes),
                checked: false
            })
        } else {
            this.setState({ checked: true })

            switch (checkbox) {
                case 'byBook':
                    return this.setState({ notes: this.sortByBook(notes) })

                case 'byUpdated':
                    return this.setState({ notes: this.sortByUpdated(notes) })
            }
        } 
    }

    handleSearch(e) {
        e.preventDefault();

        //---------- helper_func ----------//
        const searchData = searchRegexMatch(this.state.search.toLowerCase());

        const sortNotes = this.props.notes.filter(each => {
            let sortTitles = each.title.toLowerCase().match(searchData)
            let sortBody = each.body.toLowerCase().match(searchData)
            let sortBook = each.category.toLowerCase().match(searchData)
            
            return sortTitles || sortBody || sortBook
         });

        const { checked } = this.state 
        let myCheckbox = document.getElementsByName("checkbox");
        let checkboxName = []

        myCheckbox.forEach(ele => {
            if (ele.checked === true) checkboxName.push(ele.value)
        }) 

        if (checked) {
            if (checkboxName.includes('byBook')) {
                return this.setState({ notes: this.sortByBook(sortNotes) })
            } else {
                return this.setState({ notes: this.sortByUpdated(sortNotes) })
            }
        } else {
            return this.setState({ notes: this.sortByCreated(sortNotes) })
        }
    }

    renderModalTop() {
        const { currentUser, closeModal } = this.props
        let currentUser_firstName = currentUser.first_name || 'Demo'

        console.log(this.state.notes);
        
        return (
            <div className='notes-modal-top'>
                <div className='notes-page-username'>
                    <span>{currentUser_firstName}'s Notes</span>
                </div>
                <div className='notes-search'>
                    <form onSubmit={this.handleSearch} className='notes-bar-search-form'>
                        <input
                            className='notes-search-input'
                            type='text'
                            placeholder='Search..'
                            value={this.state.search}
                            onChange={this.handleChange('search')}
                        />
                    </form>
                </div>
                <div className='checkbox-container'>
                    <label className="container">By Book
                        <input type="checkbox" name='checkbox' value='byBook'
                            onChange={this.handleCheck}
                            />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">By Updated
                        <input type="checkbox" name='checkbox' value='byUpdated'
                            onChange={this.handleCheck}
                            />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className='form-closing-x' onClick={() => closeModal()}>
                    &#10005;
                </div>
                <div className='form-or-separator-notes'>
                    <hr />
                </div>
            </div>
        )
    }

    render() {
        const { fetchNote, deleteNote } = this.props
        const { notes, search } = this.state
        let renderNotes = notes 


        if (notes.length < 1 && search.length > 0) {
            return (
                <>
                    <div className='notes-page-container'>
                        {
                            this.renderModalTop()
                        }
                        <div className='notes-page-content'>
                            <section className='notes-page-section'>
                                <div className='notes-page-section-empty'>
                                    <span>No notes matching your search.</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            )
        } if (this.props.notes.length < 1) {
            return (
                <>
                    <div className='notes-page-container'>
                        {
                            this.renderModalTop()
                        }
                        <div className='notes-page-content'>
                            <section className='notes-page-section'>
                                <div className='notes-page-section-empty'>
                                    <span>You don't have any notes.</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='notes-page-container'>
                        {
                            this.renderModalTop()
                        }
                        <div className='notes-page-content'>
                            <section className='notes-page-section'>
                                <ul className='notes-page-ul'>
                                    {renderNotes.map((eachNote) => (
                                        <NotesItem 
                                            handleUpdate={this.handleUpdate}
                                            toggleClass={this.toggleClass}
                                            flipToDelete={this.state.flipToDelete}
                                            noteId={this.state.noteId}
                                            deleteNote={deleteNote}
                                            fetchNote={fetchNote}
                                            eachNote={eachNote} 
                                            key={eachNote.id} />
                                        ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default NotesPage;