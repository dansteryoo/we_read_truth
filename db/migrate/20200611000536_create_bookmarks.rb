class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :devo_id
      
      t.timestamps
    end

    add_index :bookmarks, :user_id
  end
end
