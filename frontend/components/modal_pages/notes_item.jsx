import React from 'react';

const NotesItem = ({ eachNote, handleUpdate, deleteNote, toggleClass, flipToDelete, noteId }) => {

    return (
        <li className={flipToDelete && noteId === eachNote.id ? 'note-flip' : 'note-li'}>

            {/* ---------- NOTE FRONT ---------- */}
            
            <div className='note-front'>
                <div className='note-title'>
                    <span>Title: </span>{eachNote.title}
                </div>
                <div className='note-body'>
                    <span>Body: </span>{eachNote.body}
                </div>
                <div className='note-bottom'>
                    <span>Passages: </span>{eachNote.category}
                    <br/>
                    <span>#Day: </span>{eachNote.tags}
                </div>

                <div className='note-time'>
                    <span>Created: </span>{new Date(eachNote.created_at).toString().slice(0, 15)}
                    <br/>
                    <span>Updated: </span>{new Date(eachNote.updated_at).toString().slice(0, 15)}
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
