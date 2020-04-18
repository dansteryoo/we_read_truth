class Note < ApplicationRecord

    validates :notary_id, :devo_id, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :notary_id,
        class_name: :User

    belongs_to :devo,
        primary_key: :id,
        foreign_key: :devo_id,
        class_name: :Devo

end
