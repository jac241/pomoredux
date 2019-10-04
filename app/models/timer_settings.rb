class TimerSettings < ApplicationRecord
  validates :pomodoro_length_ms, :short_break_length_ms, :long_break_length_ms,
    numericality: { only_integer: true, greater_than: 0 }, presence: true

  MAX_VOLUME = 10

  DEFAULTS = {
    pomodoro_length_ms: 1500 * 1000,
    short_break_length_ms: 300 * 1000,
    long_break_length_ms: 600 * 1000,
    volume: MAX_VOLUME
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
