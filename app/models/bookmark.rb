class Bookmark < ApplicationRecord

    validates :user_id, :devo_id, :render_day, :gender, :book, presence: true 

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :devo,
        primary_key: :id,
        foreign_key: :devo_id,
        class_name: :Devo

end
