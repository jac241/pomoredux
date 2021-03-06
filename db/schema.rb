# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20191011210804) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table "accomplishments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "goal_id"
    t.index ["created_at"], name: "index_accomplishments_on_created_at"
    t.index ["goal_id"], name: "index_accomplishments_on_goal_id"
  end

  create_table "excuses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "goal_id"
    t.index ["created_at"], name: "index_excuses_on_created_at"
    t.index ["goal_id"], name: "index_excuses_on_goal_id"
  end

  create_table "goals", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_goals_on_deleted_at"
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "pomodoros", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_pomodoros_on_task_id"
  end

  create_table "tasks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.integer "estimated_num_pomodoros", null: false
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["completed_at"], name: "index_tasks_on_completed_at"
    t.index ["created_at"], name: "index_tasks_on_created_at"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "timer_settings", force: :cascade do |t|
    t.integer "pomodoro_length_ms", default: 1500000
    t.integer "short_break_length_ms", default: 300000
    t.integer "long_break_length_ms", default: 600000
    t.bigint "user_id"
    t.integer "volume", default: 10, null: false
    t.boolean "can_notify", default: false, null: false
    t.index ["user_id"], name: "index_timer_settings_on_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "accomplishments", "goals"
  add_foreign_key "excuses", "goals", on_delete: :cascade
  add_foreign_key "goals", "users"
  add_foreign_key "pomodoros", "tasks", on_delete: :cascade
  add_foreign_key "tasks", "users", on_delete: :cascade
  add_foreign_key "timer_settings", "users"
end
