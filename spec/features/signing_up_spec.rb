require 'rails_helper'

feature 'Signing Up' do
  before(:each) { visit '/' }

  scenario 'Signing up for a new account' do
    click_sign_up
    fill_out_and_submit_sign_in_form
    a_new_user_should_have_been_created
  end

  def click_sign_up
    find('a', text: 'Sign Up').click
  end

  def fill_out_and_submit_sign_in_form
    within('#new_user') do
      fill_in('Email', with: 'test@example.com')
      fill_in('Password', with: 'mypassword')
      fill_in('Confirm Password', with: 'mypassword')

      click_on('Sign Up')
    end
  end

  def a_new_user_should_have_been_created
    expect(User.count).to eq 1
  end
end
