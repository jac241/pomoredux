require 'rails_helper'

feature 'Logging out' do
  let(:user) { create(:user) }

  before(:each) do
    sign_in(user)
  end

  scenario 'Logging out of my account' do
    visit '/'
    find('a', text: 'Log Out').click

    expect(page).to have_content('You have logged out successfully!')
  end

  scenario 'Logging back in after logging out' do
    visit '/'
    find('a', text: 'Log Out').click
    find('a', text: 'Log In').click

    fill_in_new_user_session_form

    expect(page).to_not have_content('Error')

    expect(page).to have_current_path('/')
  end
end
