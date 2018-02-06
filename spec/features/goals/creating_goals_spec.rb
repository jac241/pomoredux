require 'rails_helper'

feature 'Creating goals' do
  let(:user) { create(:user) }
  let(:goals_page) { Pages::Goals.new }
  let(:goal) { build(:goal) }

  before(:each) do
    sign_in(user)
    goals_page.visit_page
  end

  scenario 'Creating a goal' do
    goals_page.create_goal(goal)

    expect(goals_page).to have_cleared_form
    expect(goals_page).to have_goal(Goal.last)
  end

  scenario 'Creating an invalid goal' do
    goal.title = ''
    goals_page.create_goal(goal)

    expect(goals_page).to have_new_goal_errors
    expect(Goal.count).to eq 0
  end
end
