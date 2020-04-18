@devos.each do |devo|
  json.set! devo.id do
    json.partial! '/api/devos/devo', devo: devo
    json.notes devo.notes do |note| 
      json.note note 
      json.notary note.notary
    end
      json.images devo.images.map { |image| url_for(image) }
  end
end