FactoryGirl.define do
  factory :excuse do
    sequence(:description) { |n| "ex#{n}" }

    association :goal
  end
end
