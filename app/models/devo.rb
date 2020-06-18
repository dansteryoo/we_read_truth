class Devo < ApplicationRecord

    validates :gender, :book, :title, :passages, :summary, :img, presence: true

    has_many :bookmarks,
        primary_key: :id,
        foreign_key: :devo_id,
        class_name: :Bookmark

    def values_at *args
        args.map { |method_name| self.public_send method_name }
    end

end