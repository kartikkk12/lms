class CreateStages < ActiveRecord::Migration[7.0]
  def change
    create_table :stages do |t|
      t.string :stage_name
      t.string :overview_message
      t.string :completion_message
      t.references :journey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
