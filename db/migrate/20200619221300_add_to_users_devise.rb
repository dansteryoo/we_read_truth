class AddToUsersDevise < ActiveRecord::Migration[5.2]
  def change

    ## Recoverable
    add_column :users, :reset_password_token, :string
    add_index :users, :reset_password_token, unique: true
    add_column :users, :reset_password_sent_at, :datetime

    ## Confirmable
    add_column :users, :confirmation_token, :string
    add_index :users, :confirmation_token, unique: true
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime

    ## Lockable
    add_column :users, :failed_attempts, :integer, default: 0, null: false
    add_column :users, :unlock_token, :string
    add_index :users, :unlock_token, unique: true
    add_column :users, :locked_at, :datetime
  end
end
