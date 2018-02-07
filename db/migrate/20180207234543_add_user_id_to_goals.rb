class AddUserIdToGoals < ActiveRecord::Migration[5.1]
  def change
    add_reference :goals, :user, foreign_key: true
  end
end
