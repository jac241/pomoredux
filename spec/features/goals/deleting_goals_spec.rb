require 'rails_helper'

describe 'Deleting goals' do
  let(:user) { create(:user) }
  let(:goal) { build(:goal, user: user) }
  let(:goals_page) { Pages::Goals.new }

  before(:each) do
    sign_in(user)
    goal.save!
  end

  scenario 'Deleting an existing goal' do
    goals_page.visit_page

    goals_page.delete_goal(goal)

    expect(goals_page).to have_no_goal(goal)
  end

  context 'Existing accomplishments' do
    before(:each) do
      create(:accomplishment, goal: goal)      
    end

    scenario 'Deleting a goal with previous accomplishments' do
      goals_page.visit_page

      goals_page.delete_goal(goal)


      review_page = Pages::Review.new(goal.accomplishments.first.created_at) 
      review_page.visit_page

      expect(review_page).to have_goal(goal)
    end
  end
end
