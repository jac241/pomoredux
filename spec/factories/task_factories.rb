FactoryGirl.define do
  factory :task do
    title 't'
    estimated_num_pomodoros 2
    association :user

    factory :completed_task do
      completed_at { Time.now }
    end
  end
end
