class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
<<<<<<< HEAD:db/migrate/20200414212945_create_notes.rb
      t.string :body, null: false
      t.text :category, null: false
=======
      t.text :body, null: false
      t.string :category, null: false
>>>>>>> dev:db/migrate/20200414212950_create_notes.rb
      t.integer :day, null: false
      t.integer :notary_id, null: false
      
      t.timestamps
    end

    add_index :notes, :notary_id
  end
end
