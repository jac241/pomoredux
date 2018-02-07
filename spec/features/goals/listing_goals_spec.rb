require 'rails_helper'

feature 'Listing goals' do
  let(:user) { create(:user) }
  let(:goals_page) { Pages::Goals.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'only seeing my goals on the goals page' do
    my_goal = create(:goal, user: user)
    another_user = create(:user)
    their_goal = create(:goal, user: another_user)

    goals_page.visit_page

    expect(goals_page).to have_goal(my_goal)
    expect(goals_page).to have_no_goal(their_goal)
  end
end
