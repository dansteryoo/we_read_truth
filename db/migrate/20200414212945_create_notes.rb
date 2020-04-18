class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.text :body, null: false
      t.integer :notary_id, null: false
      t.integer :devo_id, null: false
      
      t.timestamps
    end

    add_index :notes, :notary_id
    add_index :notes, :devo_id
  end
end
