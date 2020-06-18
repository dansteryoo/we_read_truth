class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :devo_id, null: false
      t.integer :render_day, null: false
      t.string :gender, null: false
      t.string :book, null: false

      t.timestamps
    end

    add_index :bookmarks, :user_id
    add_index :bookmarks, :devo_id
  end
end
