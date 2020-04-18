json.notes do 
    @listing.notes.each do |note|
        json.set! note.id do 
        json.partial! "api/notes/note", note: note
        json.partial! "api/users/user", user: note.notary
    end
  end
end