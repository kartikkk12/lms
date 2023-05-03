# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_16_073159) do
  create_table "activities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "activity_type"
    t.string "activity_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journeys", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "journey_name"
    t.string "display_name"
    t.string "overview_message"
    t.string "completion_message"
    t.string "journey_status"
    t.datetime "j_last_updated"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organisations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "org_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stage_activities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "activity_id", null: false
    t.bigint "stage_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_stage_activities_on_activity_id"
    t.index ["stage_id"], name: "index_stage_activities_on_stage_id"
  end

  create_table "stages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "stage_name"
    t.string "overview_message"
    t.string "completion_message"
    t.bigint "journey_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journey_id"], name: "index_stages_on_journey_id"
  end

  create_table "user_journeys", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "journey_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journey_id"], name: "index_user_journeys_on_journey_id"
    t.index ["user_id"], name: "index_user_journeys_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "user_name"
    t.string "password_digest"
    t.string "user_access"
    t.string "user_status"
    t.bigint "organisation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organisation_id"], name: "index_users_on_organisation_id"
  end

  add_foreign_key "stage_activities", "activities"
  add_foreign_key "stage_activities", "stages"
  add_foreign_key "stages", "journeys"
  add_foreign_key "user_journeys", "journeys"
  add_foreign_key "user_journeys", "users"
  add_foreign_key "users", "organisations"
end
