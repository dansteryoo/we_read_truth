# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_15_195429) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmarks", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "devo_id", null: false
    t.integer "render_day", null: false
    t.string "gender", null: false
    t.string "book", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["devo_id"], name: "index_bookmarks_on_devo_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "devos", force: :cascade do |t|
    t.string "gender", null: false
    t.string "book", null: false
    t.string "title", null: false
    t.string "passages", null: false
    t.text "summary", null: false
    t.string "img", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book"], name: "index_devos_on_book"
    t.index ["gender"], name: "index_devos_on_gender"
  end

  create_table "notes", force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.string "category", null: false
    t.string "day", null: false
    t.integer "notary_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notary_id"], name: "index_notes_on_notary_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
