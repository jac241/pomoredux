class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'pgcrypto'

    create_table :tasks, id: :uuid do |t|
      t.string :title, null: false
      t.integer :estimated_num_pomodoros, null: false
      t.datetime :completed_at

      t.timestamps
    end

    add_reference :tasks, :user, foreign_key: true, index: true
  end
end
