class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.text :category, null: false
      t.integer :day, null: false
      t.integer :notary_id, null: false
      
      t.timestamps
    end

    add_index :notes, :notary_id
  end
end
