class CreateStageActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :stage_activities do |t|
      t.references :activity, null: false, foreign_key: true
      t.references :stage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
