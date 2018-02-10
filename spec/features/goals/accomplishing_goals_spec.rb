require 'rails_helper'

feature 'Accomplishing goals - ' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'Accomplishing a goal' do
    goal = create(:goal, user: user)

    home_page.visit_page
    home_page.mark_goal_met(goal)

    expect(home_page).to have_accomplished_goal(goal)
    expect(Accomplishment.last.goal).to eq goal
  end
end
