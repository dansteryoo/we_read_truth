class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :devo_id, null: false
      t.integer :render_day, null: false
<<<<<<< HEAD:db/migrate/20200615195429_create_bookmarks.rb
      
=======

>>>>>>> dev:db/migrate/20200611000536_create_bookmarks.rb
      t.timestamps
    end

    add_index :bookmarks, :user_id
    add_index :bookmarks, :devo_id
  end
end
