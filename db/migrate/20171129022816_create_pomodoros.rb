class CreatePomodoros < ActiveRecord::Migration[5.1]
  def change
    create_table :pomodoros, id: :uuid do |t|
      t.uuid :task_id, null: false
      t.timestamps
    end

    add_foreign_key :pomodoros, :tasks
    add_index :pomodoros, :task_id
  end
end
