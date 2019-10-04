class AddVolumeToTimerSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :timer_settings, :volume, :integer, default: 10, null: false
  end
end
