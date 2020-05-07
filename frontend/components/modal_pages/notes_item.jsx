import React from 'react';

const NotesItem = ({ eachNote, handleClick, deleteNote }) => {
    
    return (
        <li className='note-li' onClick={() => handleClick(eachNote.id)}>
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
                <span>Created: </span>{Date(eachNote.created_at).slice(0, 15)}
                <br/>
                <span>Updated: </span>{Date(eachNote.updated_at).slice(0, 15)}
            </div>

            <div className='note-button-container'>
                <button className='note-delete'  onClick={() => deleteNote(eachNote.id)}>
                    Delete
                </button>
            </div>
        </li>
    )
}

export default NotesItem;
