class AddIndexToTasksOnCompletedAt < ActiveRecord::Migration[5.1]
  def change
    add_index :tasks, :completed_at
  end
end
