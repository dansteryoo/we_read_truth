# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# @devo = "Revelation"
# Devo.where(book: @devo).destroy_all


    # // {
    # //     "book_title": "Psalm",
    # //     "devo_passages": "Leviticus 4:1, Leviticus 1:1, Leviticus 1:1",
    # //     "devo_title": "Chapters 150",
    # //     "devo_summary": "",
    # //     "img_url": ""
    # // },

Devo.destroy_all
# Devo.where(gender: "SHE").destroy_all
# Devo.where(book: "Esther").destroy_all
# Devo.where("book like ?", "%Hymns%").destroy_all

update_1 = JSON.parse(File.read("#{Rails.root}/dist/update/he_update.json"))
update_2 = JSON.parse(File.read("#{Rails.root}/dist/update/she_update.json"))

data_1 = JSON.parse(File.read("#{Rails.root}/dist/he_v1.json"))
data_2 = JSON.parse(File.read("#{Rails.root}/dist/he_v2.json"))
data_3 = JSON.parse(File.read("#{Rails.root}/dist/he_v3.json"))
data_4 = JSON.parse(File.read("#{Rails.root}/dist/she_v1.json"))
data_5 = JSON.parse(File.read("#{Rails.root}/dist/she_v2.json"))
data_6 = JSON.parse(File.read("#{Rails.root}/dist/she_v3.json"))

hash = {
    "HE": [update_1, data_1, data_2, data_3],
    "SHE": [update_2, data_4, data_5, data_6]
}

# hash = {
#     "HE": [update_1],
#     "SHE": [update_2]
# }

hash.each do |gender, data_array|
    data_array.each do |each_data|
        each_data.each do |each|
            title = each["devo_title"].strip

            # if title == @devo
                book = each["book_title"].strip
                title = each["devo_title"].strip
                passages = each["devo_passages"].strip.blank? ? "blank" : each["devo_passages"].strip
                summary = each["devo_summary"].strip.blank? ? "blank" : each["devo_summary"].strip
                img = each["img_url"].strip.blank? ? "blank" : each["img_url"].strip

                Devo.create!(
                    gender: gender.to_s,
                    book: book,
                    title: title,
                    passages: passages,
                    summary: summary,
                    img: img)
            # end
        end
    end
end

Devo.where(title: "Weekly Truth").destroy_all
Devo.where(title: "Grace Day").destroy_all