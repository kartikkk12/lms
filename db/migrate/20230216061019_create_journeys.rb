class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.string :journey_name
      t.string :display_name
      t.string :overview_message
      t.string :completion_message
      t.string :journey_status
      t.datetime :j_last_updated

      t.timestamps
    end
  end
end
