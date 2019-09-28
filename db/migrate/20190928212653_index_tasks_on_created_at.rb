class IndexTasksOnCreatedAt < ActiveRecord::Migration[5.1]
  def change
    add_index :tasks, :created_at
  end
end
