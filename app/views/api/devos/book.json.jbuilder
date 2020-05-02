json.devos do
    @devos.each do |devo|
        json.set! devo.id do
            json.extract! devo, :id, :gender, :book, :title, :passages, :summary, :img
        end
    end
end
