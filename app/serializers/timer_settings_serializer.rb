class TimerSettingsSerializer < ActiveModel::Serializer
  attributes :id, :volume, :can_notify, :pomodoro, :short_break, :long_break

  def pomodoro
    object.pomodoro_length_ms
  end

  def short_break
    object.short_break_length_ms
  end

  def long_break
    object.long_break_length_ms
  end
end
