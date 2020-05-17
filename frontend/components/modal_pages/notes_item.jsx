import React from 'react';

const NotesItem = ({ eachNote, handleUpdate, deleteNote }) => {
    
    return (
        <li className='note-li'>
            <div className='note-title'>
                <span>Title: </span>{eachNote.title}
            </div>
            <div className='note-body'>
                <span>Preview: </span>{eachNote.body}
            </div>
            <div className='note-bottom'>
                <span>Categories: </span>{eachNote.category}
                <br/>
                <span>Tags: </span>{eachNote.tags}
            </div>

            <div className='note-time'>
                <span>Created: </span>{new Date(eachNote.created_at).toString().slice(0, 15)}
                <br/>
                <span>Updated: </span>{new Date(eachNote.updated_at).toString().slice(0, 15)}
            </div>

            <div className='note-button-container'>
                <button className='note-delete'  onClick={() => deleteNote(eachNote.id)}>
                    Delete
                </button>
                <button className='note-update' onClick={() => handleUpdate(eachNote.id)}>
                    Update
                </button>
            </div>
        </li>
    )
}

export default NotesItem;
