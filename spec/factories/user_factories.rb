FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "jac241#{n}@example.com" }
    password 'mypassword'
  end
end
