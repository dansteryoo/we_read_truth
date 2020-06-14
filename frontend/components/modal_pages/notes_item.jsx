import React from 'react';

const NotesItem = ({ eachNote, handleUpdate, deleteNote, toggleClass, noteId }) => {

    const formateDate = (date) => {
        const fullDate = new Date(date).toString()
        const day = fullDate.slice(0, 3)
        const month = fullDate.slice(4, 7)
        const num = fullDate.slice(8, 10)
        const year = fullDate.slice(11, 15)
        return `${day} - ${month} ${num}, ${year}`
    }

    const renderFlipCard = () => {
        if (noteId !== eachNote.id) return 'note-li'
        return 'note-flip'
    }

    return (
        <li className={renderFlipCard()}>

            {/* ---------- NOTE FRONT ---------- */}
            
            <div className='note-front'>
                <div className='note-bottom'>
                    <span> Book: </span>{eachNote.category}
                </div>
                <div className='note-title'>
                    <span>Day {eachNote.tags}: </span> 
                    {eachNote.title}
                </div>
                <div className='note-body'>
                    <span>Preview: </span>{eachNote.body}
                </div>
                <div className='note-time'>
                    <span>Created: </span>{formateDate(eachNote.created_at)}
                    <br/>
                    <span>Updated: </span>{formateDate(eachNote.updated_at)}
                </div>

                <div className='note-button-container'>
                    <button className='note-delete' onClick={() => toggleClass(eachNote.id)}>
                        Delete
                    </button>
                    <button className='note-update' onClick={() => handleUpdate(eachNote.id)}>
                        Update
                    </button>
                </div>
            </div>

            {/* ---------- NOTE BACK ---------- */}
            
            <div className='note-back'>
                <div className='note-button-container'>
                    <button className='note-delete' onClick={() => deleteNote(eachNote.id)}>
                        Delete
                    </button>
                    <button className='note-cancel' onClick={toggleClass}>
                        Cancel
                    </button>
                </div>
                <br />
                <br />
                <div className='note-delete-body'>
                    <p>Delete Note?</p>
                </div>
            </div>
        </li>
    )
}

export default NotesItem;
