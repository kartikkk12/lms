class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :user_name
      t.string :password_digest
      t.string :user_access
      t.string :user_status
      t.references :organisation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
