# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Devo.destroy_all
# Devo.where(book: "Job", gender: "HE").destroy_all
Devo.where(book: "Matthew").destroy_all

update_1 = JSON.parse(File.read("#{Rails.root}/dist/update/he_update.json"))
update_2 = JSON.parse(File.read("#{Rails.root}/dist/update/she_update.json"))

# data_1 = JSON.parse(File.read("#{Rails.root}/dist/he_v1.json"))
# data_2 = JSON.parse(File.read("#{Rails.root}/dist/he_v2.json"))
# data_3 = JSON.parse(File.read("#{Rails.root}/dist/he_v3.json"))
# data_4 = JSON.parse(File.read("#{Rails.root}/dist/she_v1.json"))
# data_5 = JSON.parse(File.read("#{Rails.root}/dist/she_v2.json"))
# data_6 = JSON.parse(File.read("#{Rails.root}/dist/she_v3.json"))
# data_7 = JSON.parse(File.read("#{Rails.root}/dist/she_v4.json"))

# hash = {
#     "HE": [data_1, data_2, data_3],
#     "SHE": [data_4, data_5, data_6, data_7]
# }

hash = {
    "HE": [update_1],
    "SHE": [update_2]
}

hash.each do |gender, data_array|
    data_array.each do |each_data|
        each_data.each do |each|

    each["img_url"] == "" ? @img = "null" 
        : @img = each["img_url"]

    each["devo_passages"] == "" ? @passages = "null" 
        : @passages = each["devo_passages"]
        
    each["devo_summary"] == "" ? @summary = "null" 
        : @summary = each["devo_summary"]

    each["devo_title"] == "" ? @title = "null" 
        : @title = each["devo_title"]

    each["book_title"].split(' ').join('') == "" ? @book = "null"
        : @book = each["book_title"].split(' ').join('')
    
        Devo.create!(
            gender: gender,
            book: @book,
            title: @title,
            passages: @passages,
            summary: @summary,
            img: @img,
        )
    end
    end
end


Devo.where(title: "Weekly Truth").destroy_all
Devo.where(title: "Grace Day").destroy_all