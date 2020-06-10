class Devo < ApplicationRecord

    validates :gender, :book, :title, :passages, :summary, :img, presence: true

end