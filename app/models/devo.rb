class Devo < ApplicationRecord

    validates :day, :book, :chapter, :verse, :title, :passage, :summary, :author, :devotional_id, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :devotional_id,
        class_name: :User

    has_many :notes,
        primary_key: :id,
        foreign_key: :devo_id,
        class_name: :Note


    has_many_attached :images

    def self.search_by_keywords(keywords)
        keyword = `%#{keywords}%`

        search_result = Listing.where("name LIKE ?", keyword)
            .or(Listing.where("description LIKE ?", keyword))
            .or(Listing.where("address LIKE ?", keyword))
            .includes(:bookings)
            
        search_result
    end

    def self.search_by_dates(search_result, start_date, end_date)
        search_start = Date.parse(start_date)
        search_end = Date.parse(end_date)
        search_dates = (search_start..search_end).to_a

        result = []
        
        search_result.each do |listing|
            booked_dates = []
            listing.bookings.each do |booking|
                booked_dates += booking.dates
            end

            inclusion_flag = true
            search_dates.each do |date|
                if booked_dates.include?(date)
                    inclusion_flag = false
                end
            end
            if inclusion_flag
                result << listing
            end
        end

        result
    end

end
