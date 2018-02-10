require 'rails_helper'

describe 'Editting goals' do
  let(:user) { create(:user) }
  let(:goal) { build(:goal, user: user) }
  let(:goals_page) { Pages::Goals.new }

  before(:each) do
    sign_in(user)
    goal.save!
  end

  scenario 'Editting an existing goal' do
    goal.title = 'New Title'
    goals_page.visit_page

    goals_page.edit_goal(goal)

    expect(goals_page).to have_goal(goal)
  end

  scenario 'Editting a goal and making the title blank' do
    goal.title = ''
    goals_page.visit_page

    goals_page.edit_goal(goal)

    expect(goals_page).to have_edit_goal_errors_for(goal)
  end
end
