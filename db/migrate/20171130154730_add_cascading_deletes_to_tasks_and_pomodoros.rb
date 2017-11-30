class AddCascadingDeletesToTasksAndPomodoros < ActiveRecord::Migration[5.1]
  def change
    remove_foreign_key :tasks, :users
    add_foreign_key :tasks, :users, on_delete: :cascade

    remove_foreign_key :pomodoros, :tasks
    add_foreign_key :pomodoros, :tasks, on_delete: :cascade
  end
end
