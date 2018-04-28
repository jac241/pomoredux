FactoryGirl.define do
  factory :excuse do
    description 'ex'

    association :goal
  end
end
