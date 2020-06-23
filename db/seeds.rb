# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Devo.where(gender: "SHE").destroy_all

# he_data_1 = JSON.parse(File.read("#{Rails.root}/app/assets/seed/hereadstruth_v1.json"))
# he_data_2 = JSON.parse(File.read("#{Rails.root}/app/assets/seed/hereadstruth_v2.json"))

# heDataArray = [he_data_1, he_data_2]

# heDataArray.each do |he_data|
#     he_data.each do |each|

#         if each["img_url"] == ""
#             @img = "null"
#         else 
#             @img = each["img_url"]
#         end

#         if each["devo_passages"] == ""
#             @passages = "null"
#         else 
#             @passages = each["devo_passages"]
#         end

#         if each["devo_summary"] == ""
#             @summary = "null"
#         else 
#             @summary = each["devo_summary"]
#         end

#         if each["devo_title"] == ""
#             @title = "null"
#         else 
#             @title = each["devo_title"]
#         end

#         if each["book_title"].split(' ').join('') == ""
#             @book = "null"
#         else 
#             @book = each["book_title"].split(' ').join('')
#         end

#         # puts ""
#         # puts @summary
#         # puts ""
#         # byebug
#             Devo.create!(
#                 gender: "HE",
#                 book: @book,
#                 title: @title,
#                 passages: @passages,
#                 summary: @summary,
#                 img: @img,
#                 )
#     end
#     # byebug
# end

she_data_1 = JSON.parse(File.read("#{Rails.root}/app/assets/seed/shereadstruth_v1.json"))
she_data_2 = JSON.parse(File.read("#{Rails.root}/app/assets/seed/shereadstruth_v2.json"))
she_data_3 = JSON.parse(File.read("#{Rails.root}/app/assets/seed/shereadstruth_v3.json"))

sheDataArray = [she_data_1, she_data_2, she_data_3]

sheDataArray.each do |she_data|
    she_data.each do |each|

        if each["img_url"] == ""
            @img = "null"
        else 
            @img = each["img_url"]
        end

        if each["devo_passages"] == ""
            @passages = "null"
        else 
            @passages = each["devo_passages"]
        end

        if each["devo_summary"] == ""
            @summary = "null"
        else 
            @summary = each["devo_summary"]
        end

        if each["devo_title"] == ""
            @title = "null"
        else 
            @title = each["devo_title"]
        end

        if each["book_title"].split(' ').join('') == ""
            @book = "null"
        else 
            @book = each["book_title"].split(' ').join('')
        end

        # puts ""
        # puts @summary
        # puts ""
        # byebug
            Devo.create!(
                gender: "SHE",
                book: @book,
                title: @title,
                passages: @passages,
                summary: @summary,
                img: @img,
                
            )
    # byebug
    end
end


Devo.where(title: "Weekly Truth").destroy_all
Devo.where(title: "Grace Day").destroy_all