require 'rails_helper'

describe 'Creating excuses for daily goals' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'Creating an excuse for not accomplishing a goal' do
    goal = create(:goal, user: user)
    excuse = build(:excuse, goal: goal)

    home_page.visit_page
    home_page.create_excuse_for(excuse, excusable: goal)

    expect(home_page).to have_no_excuse_modal
    expect(home_page).to have_excuse_for(goal)
    expect(Excuse.last.goal).to eq goal
  end

  scenario 'Editting - Clearing an excuse should delete it'
  scenario 'Trying to create an excuse for a goal that already has one'
  scenario 'Trying to create an excuse while not logged in'
  scenario 'Trying to create an excuse when goal has already been accomplished'
end
