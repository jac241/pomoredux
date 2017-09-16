require 'rails_helper'

feature 'Signing Up' do
  before(:each) { visit '/' }

  scenario 'Signing up for a new account' do
    find('a', text: 'Sign Up').click

    within('#new_user') do
      fill_in('Username', with: 'jac241')
      fill_in('Password', with: 'mypassword')
      fill_in('Confirm Password', with: 'mypassword')

      click_on('Sign Up')
    end
  end
end
