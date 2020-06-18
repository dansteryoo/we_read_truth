class CreateDevos < ActiveRecord::Migration[5.2]
  def change
    create_table :devos do |t|
      t.string :gender, null: false
      t.string :book, null: false
      t.string :title, null: false
      t.string :passages, null: false                    
      t.text :summary, null: false
      t.string :img, null: false

      t.timestamps
    end

    add_index :devos, :book
    add_index :devos, :gender
  end
end
