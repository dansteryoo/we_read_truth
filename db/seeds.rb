# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Devo.destroy_all

he_data = JSON.parse(File.read("#{Rails.root}/app/assets/seed/hereadstruth.json"))

  he_data.each do |each|

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
    gender: "HE",
    book: @book,
    title: @title,
    passages: @passages,
    summary: @summary,
    img: @img,
        )
    # byebug
  end

  she_data = JSON.parse(File.read("#{Rails.root}/app/assets/seed/shereadstruth.json"))

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