import React from 'react';

const NotesItem = ({ eachNote, fetchNote, handleClick }) => {

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
                <span>Created: </span>{Date(eachNote.created_at).slice(0, 15)}
                <br/>
                <span>Updated: </span>{Date(eachNote.updated_at).slice(0, 15)}
            </div>
        </li>
    )
}

export default NotesItem;
