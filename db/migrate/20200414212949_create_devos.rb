class CreateDevos < ActiveRecord::Migration[5.2]
  def change
    create_table :devos do |t|
      t.integer :day, null: false
      t.string :book, null: false
      t.string :chapter, null: false
      t.string :verse, null: false
      t.string :title, null: false
      t.string :passage, null: false                    
      t.string :summary, null: false
      t.string :author, null: false
      t.integer :devotional_id, null: false

      t.timestamps
    end

    add_index :devos, :book
    add_index :devos, :devotional_id
  end
end
