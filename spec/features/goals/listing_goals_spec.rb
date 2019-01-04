require 'rails_helper'

feature 'Listing goals' do
  let(:user) { create(:user) }
  let(:goals_page) { Pages::Goals.new }
  let(:home_page) { Pages::Home.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'seeing a link to create a goal if I have no goals' do
    home_page.visit_page

    expect(home_page).to have_helpful_add_goals_link
  end

  scenario 'only seeing my goals on the goals page' do
    my_goal = create(:goal, user: user)
    another_user = create(:user)
    their_goal = create(:goal, user: another_user)

    goals_page.visit_page

    expect(goals_page).to have_goal(my_goal)
    expect(goals_page).to have_no_goal(their_goal)
  end

  scenario 'only Seeing my goals on the home page' do
    my_goal = create(:goal, user: user)
    another_user = create(:user)
    their_goal = create(:goal, user: another_user)

    home_page.visit_page

    expect(home_page).to have_daily_goal(my_goal)
    expect(home_page).to have_no_daily_goal(their_goal)
  end

  scenario 'I should see if my goals have been excused' do
    my_goal = create(:goal, user: user)
    excuse = create(:excuse, goal: my_goal)

    home_page.visit_page

    expect(home_page).to have_excuse_for(excuse, my_goal)
  end
end
