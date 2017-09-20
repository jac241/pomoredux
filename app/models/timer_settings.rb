class TimerSettings < ApplicationRecord
  BUFFER_SO_THAT_59_ALWAYS_SHOWN = 100

  DEFAULTS = {
    pomodoro_length_ms: 1500 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN,
    short_break_length_ms: 300 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN,
    long_break_length_ms: 600 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN
  }

  belongs_to :user

  [:pomodoro_length, :short_break_length, :long_break_length].each do |attribute|
    define_method("#{attribute}_in_min=") do |value|
      self.public_send("#{attribute}_ms=", min_to_ms(value))
    end
  end

  private

  def min_to_ms(minutes)
    minutes.to_i * 60 * 1000
  end
end
