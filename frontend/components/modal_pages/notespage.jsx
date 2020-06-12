import React from 'react';
import NotesItem from './notes_item'

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flipToDelete: false,
            noteId: '',
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.renderModalTop = this.renderModalTop.bind(this);
    };

    componentDidMount() {
        this.props.fetchNotes()
    };

    componentWillUnmount(){
        this.props.clearNoteState()
    }

    handleUpdate(noteId) {
        console.log(noteId)
        this.props.fetchNote(noteId)
        .then(() => this.props.closeModal())
    };

    toggleClass(noteId) {
        const { flipToDelete } = this.state;
        
        this.setState({
            flipToDelete: !flipToDelete,
            noteId: noteId
        })
    };

    renderModalTop() {
        const { currentUser, closeModal } = this.props
        let currentUser_firstName = currentUser.first_name || "Demo"

        return (
            <div className='notes-modal-top'>
                <div className='form-closing-x' onClick={() => closeModal()}>
                    &#10005;
                            </div>
                <div className='notes-page-username'>
                    <span>{currentUser_firstName}'s Notes</span>
                </div>
                <div className='form-or-separator-notes'>
                    <hr />
                </div>
            </div>
        )
    }

    render() {

        const { notes, fetchNote, deleteNote } = this.props

        if (notes.length === 0) {
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
                                <ul className="notes-page-ul">
                                    {notes.map((eachNote) => (
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