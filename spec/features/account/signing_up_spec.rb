require 'rails_helper'

class TestUser
  attr_accessor :email, :password

  def initialize(
      email: 'test@example.com',
      password: 'mypassword')
    @email = email
    @password = password
  end
end

feature 'Signing Up' do
  let(:user) { TestUser.new }
  before(:each) { visit '/' }

  scenario 'Signing up for a new account' do
    click_sign_up
    fill_out_and_submit_sign_in_form
    i_should_be_on_the_home_page
    a_new_user_should_have_been_created
    i_should_be_logged_in
  end

  scenario 'Signing up for a new account with an in-use email address' do
    given_a_user_exists
    click_sign_up
    fill_out_and_submit_sign_in_form
    there_should_be_an_error_message
    no_new_account_should_have_been_created
  end

  def click_sign_up
    find('a', text: 'Sign Up').click
  end

  def fill_out_and_submit_sign_in_form
    within('#new_user') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      fill_in('Confirm Password', with: user.password)

      click_on('Sign Up')
    end
  end

  def i_should_be_on_the_home_page
    expect(page).to have_current_path('/')
  end

  def a_new_user_should_have_been_created
    expect(User.count).to eq 1
  end

  def i_should_be_logged_in
    expect(page).to have_content('Log Out')
    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Log In')
  end

  def given_a_user_exists
    User.create!(email: user.email, password: user.password)
  end

  def there_should_be_an_error_message
    expect(page).to have_content('There were errors creating your account.')
  end

  def no_new_account_should_have_been_created
    expect(User.count).to eq 1
  end
end
