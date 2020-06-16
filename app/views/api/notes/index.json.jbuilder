@notes.each do |note|
    json.set! note.id do
        json.extract! note, :id, :title, :body, :category, :day, :notary_id, :created_at, :updated_at
        json.author_email note.user.email
        json.author_first_name note.user.first_name
        json.author_last_name note.user.last_name
    end
end
