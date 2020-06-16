class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :category, null: false
      t.string :day, null: false
      t.integer :notary_id, null: false
      
      t.timestamps
    end

    add_index :notes, :notary_id
  end
end
