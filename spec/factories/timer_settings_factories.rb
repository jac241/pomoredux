FactoryGirl.define do
  factory :timer_settings do
    factory :non_default_timer_settings do
      volume 5
      pomodoro_length_in_min '50'
      short_break_length_in_min '3'
      long_break_length_in_min '15'
    end

    factory :invalid_timer_settings do
      volume 10
      pomodoro_length_ms ''
      short_break_length_ms ''
      long_break_length_ms ''
    end

    factory :fast_timer_settings do
      volume 0
      pomodoro_length_ms 500
      short_break_length_ms 500
      long_break_length_ms 500
    end
  end
end
