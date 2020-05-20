import React from 'react';
import NotesItem from './notes_item'

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    };

    componentDidMount() {
        this.props.fetchNotes()
    };

    componentWillUnmount(){
        this.props.clearNoteState()
    }

    handleUpdate(noteId) {
        this.props.fetchNote(noteId)
        .then(() => this.props.closeModal())
    };

    render() {
        
        const { currentUser, notes, fetchNote, closeModal, deleteNote } = this.props

        let currentUser_firstName; 
        if (currentUser === undefined) {
            currentUser_firstName = 0;
        } else {
            currentUser_firstName = currentUser.first_name;
        };

        debugger
        
        if (notes.length === 0) {
            return (
                <>
                    <div className='notes-page-container'>
                        <div className='notes-page-content'>
                            <div className='form-closing-x' onClick={() => closeModal()}>
                                &#10005;
                        </div>
                            <div className='notes-page-username'>
                                <span>{currentUser_firstName}'s Notes</span>
                            </div>
                            <div className='form-or-separator-notes'>
                                <hr />
                            </div>
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
                        <div className='notes-page-content'>
                            <div className='form-closing-x' onClick={() => closeModal()}>
                                &#10005;
                            </div>
                            <div className='notes-page-username'> 
                                <span>{currentUser_firstName}'s Notes</span> 
                            </div>
                            <div className='form-or-separator-notes'>
                                <hr />
                            </div>
                            <section className='notes-page-section'>
                                <ul className="notes-page-ul">
                                    {notes.map((eachNote) => (
                                        <NotesItem 
                                            handleUpdate={this.handleUpdate}
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