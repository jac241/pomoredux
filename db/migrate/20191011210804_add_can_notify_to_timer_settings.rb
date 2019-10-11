class AddCanNotifyToTimerSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :timer_settings, :can_notify, :boolean, default: false, null: false
  end
end
