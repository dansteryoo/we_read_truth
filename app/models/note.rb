class Note < ApplicationRecord

    validates :notary_id, :body, presence: true
    validates :notary_id, uniqueness: true 

    belongs_to :user,
        primary_key: :id,
        foreign_key: :notary_id,
        class_name: :User

    # has_one :devo, 
    #     primary_key: :id,
    #     foreign_key: :devo_id,
    #     class_name: :User

end
