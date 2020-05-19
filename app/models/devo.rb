class Devo < ApplicationRecord

    validates :gender, :book, :title, :passages, :summary, :img, presence: true

    # belongs_to :note,
    #     primary_key: :id,
    #     foreign_key: :devo_id,
    #     class_name: :Note

end

