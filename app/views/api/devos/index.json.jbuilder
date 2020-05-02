
 @devos.each do |devo|
    json.set! devo do
        json.gender devo.gender
        json.book devo.book
    end
end