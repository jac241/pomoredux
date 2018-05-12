require 'rails_helper'

describe 'Editting excuses for daily goals' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'Editting the excuse for an existing goal' do
    goal = create(:goal, user: user)
    excuse = create(:excuse, goal: goal)

    home_page.visit_page

    expect(home_page).to have_excuse_for(excuse, goal)

    excuse.description = 'new desc'

    home_page.update_excuse_for(excuse, goal)

    expect(home_page).to have_excuse_for(excuse, goal)
    expect(Excuse.last.description).to eq excuse.description
  end
end
