require 'rails_helper'

describe 'Creating excuses for daily goals:' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }
  let(:goal) { create(:goal, user: user) }

  before(:each) do
    sign_in(user)
  end

  scenario 'Creating excuses for not accomplishing goals' do
    goals = create_list(:goal, 2, user: user)
    excuses = [
      build(:excuse, goal: goals.first),
      build(:excuse, goal: goals.second)
    ]

    home_page.visit_page
    home_page.create_excuse_for(excuses.first, excusable: goals.first)

    expect(home_page).to have_no_excuse_modal
    expect(home_page).to have_excuse_for(Excuse.last, goals.first)
    expect(Excuse.last.goal).to eq goals.first

    home_page.create_excuse_for(excuses.second, excusable: goals.second)

    expect(home_page).to have_no_excuse_modal
    sleep 0.25 # sorry
    expect(home_page).to have_excuse_for(Excuse.last, goals.second)
    expect(Excuse.count).to eq 2
    expect(Excuse.where(goal: goals.second)).to_not be nil
  end

  scenario 'Trying to create a blank excuse' do
    excuse = build(:excuse, description: '', goal: goal)
    home_page.visit_page

    home_page.create_excuse_for(excuse, excusable: goal)

    expect(home_page).to have_open_excuse_modal
    expect(home_page).to have_excuse_error("can't be blank")
  end

  scenario 'Trying to create an excuse for a goal that already has one'
  scenario 'Trying to create an excuse while not logged in'
  scenario 'Trying to create an excuse when goal has already been accomplished'
end
