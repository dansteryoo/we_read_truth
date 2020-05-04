import React from 'react';
import NotesItem from './notes_item'

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        this.props.fetchNotes()
    };

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };


    render() {
        const { currentUser, notes, fetchNote, closeModal } = this.props
        return (
            <>
            <div className='notes-page-container'>
                <div className='notes-page-content'>
                    <div className='form-closing-x' onClick={() => closeModal()}>
                        &#10005;
                    </div>
                    <div className='notes-page-username'> 
                        <span>{currentUser.first_name}'s Notes</span> 
                    </div>
                    <div className='form-or-separator-notes'>
                        <hr />
                    </div>
                    <section className='notes-page-section'>
                        <ul className="notes-page-ul">
                            {notes.map((eachNote) => (
                                <NotesItem 
                                    handleClick={this.handleClick}
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

export default NotesPage;