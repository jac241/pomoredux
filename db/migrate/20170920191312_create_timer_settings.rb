class CreateTimerSettings < ActiveRecord::Migration[5.1]
  def change
    defaults = TimerSettings::DEFAULTS

    create_table :timer_settings do |t|
      t.integer :pomodoro_length_ms, default: defaults[:pomodoro_length_ms]
      t.integer :short_break_length_ms, default: defaults[:short_break_length_ms]
      t.integer :long_break_length_ms, default: defaults[:long_break_length_ms]
    end

    add_reference :timer_settings, :user, foreign_key: true, index: { unique: true }

    User.find_each do |user|
      user.build_timer_settings
      user.save!
    end
  end
end
