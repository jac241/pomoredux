FactoryGirl.define do
  factory :goal do
    sequence(:title) { |n| "g#{n}" }
    association :user
  end
end
