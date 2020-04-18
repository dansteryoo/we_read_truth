

export const fetchNotes = () => (
    $.ajax({
        url: `/api/notes`,
        method: 'GET'
    })
);

export const fetchNote = (noteId) => (
    $.ajax({
        url: `/api/notes/${noteId}`,
        method: 'GET'
    })
);

export const createNote = (note) => (
    $.ajax({
        url: `api/notes/`,
        method: 'POST',
        data: { note }
    })
);

export const updateNote = (note) => (
    $.ajax({
        url: `api/notes/${note.id}`,
        method: 'PATCH',
        data: { note }
    })
);

export const deleteNote = (noteId) => (
    $.ajax({
        url: `api/notes/${noteId}`,
        method: 'DELETE'
    })
);