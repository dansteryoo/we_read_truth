class RemoveNotaryIdFromUsers < ActiveRecord::Migration[5.2]
  def change
        remove_column :users, :notary_id, :string
        remove_column :users, :image_url, :string
  end
end
