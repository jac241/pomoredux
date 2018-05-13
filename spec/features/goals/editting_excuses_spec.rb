require 'rails_helper'

describe 'Editting excuses for daily goals:' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }
  let(:goal) { create(:goal, user: user) }

  before(:each) do
    sign_in(user)
  end

  scenario 'Editting the excuse for an existing goal' do
    excuse = create(:excuse, goal: goal)

    home_page.visit_page

    expect(home_page).to have_excuse_for(excuse, goal)

    excuse.description = 'new desc'

    home_page.update_excuse_for(excuse, goal)

    expect(home_page).to have_excuse_for(excuse, goal)
    expect(Excuse.last.description).to eq excuse.description
  end

  scenario 'user tries to make description blank' do
    excuse = create(:excuse, goal: goal)

    home_page.visit_page

    excuse.description = ''
    home_page.update_excuse_for(excuse, goal)

    expect(home_page).to have_excuse_error("can't be blank")
  end

  scenario 'user should be able to delete an excuse' do
    excuse = create(:excuse, goal: goal)
    home_page.visit_page

    home_page.delete_excuse_for(goal)

    expect(home_page).to have_no_excuse_for(goal)
  end
end
