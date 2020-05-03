json.partial! "api/notes/note", notes: @notes
    json.author_email @notes.user.email
    json.author_first_name @notes.user.first_name
    json.author_last_name @notes.user.last_name