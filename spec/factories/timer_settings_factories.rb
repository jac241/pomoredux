FactoryGirl.define do
  factory :timer_settings do
    factory :non_default_timer_settings do
      pomodoro_length_in_min '50'
      short_break_length_in_min '3'
      long_break_length_in_min '15'
    end
  end
end
